"use server";

import { ContactSchema, RoomSchema, ReservedSchema } from "./zod";
import { prisma } from "./prisma";
import { del } from "@vercel/blob";
import { redirect } from "next/navigation";
import { revalidatePath } from "next/cache";
import { auth } from "@/auth";
import { differenceInCalendarDays } from "date-fns";

type FormState = {
  message?: string;
  error?: {
    name?: string[];
    email?: string[];
    subject?: string[];
    message?: string[];
    general?: string;
  };
};

export const saveRoom = async (
  image: string,
  prevState: unknown,
  formData: FormData
) => {
  try {
    if (!image) {
      return { error: { general: "Image is required" } };
    }

    const rawData = {
      name: formData.get("name"),
      description: formData.get("description"),
      capacity: formData.get("capacity"),
      price: formData.get("price"),
      amenities: formData.getAll("amenities"),
    };

    const validateFields = RoomSchema.safeParse(rawData);
    if (!validateFields.success) {
      return { error: validateFields.error.flatten().fieldErrors };
    }

    const { name, description, price, amenities, capacity } =
      validateFields.data;

    await prisma.room.create({
      data: {
        name,
        description,
        image,
        price,
        capacity,
        RoomAmenities: {
          createMany: {
            data: amenities.map((item) => ({
              amenitiesId: item,
            })),
          },
        },
      },
    });

    // Redirect setelah berhasil membuat room
    redirect("/admin/room");
  } catch (error) {
    console.error("Error saving room:", error);
    return { error: { general: "Failed to save room. Please try again." } };
  }
};

export const ContactMessage = async (
  prevState: unknown,
  formData: FormData
): Promise<FormState> => {
  try {
    const validateFields = ContactSchema.safeParse(
      Object.fromEntries(formData.entries())
    );

    if (!validateFields.success) {
      return { error: validateFields.error.flatten().fieldErrors };
    }

    const { name, email, subject, message } = validateFields.data;

    await prisma.contact.create({
      data: {
        name,
        email,
        subject,
        message,
      },
    });

    return { message: "Thanks For Contacting Us" };
  } catch (error) {
    console.error("Error saving contact message:", error);
    return { error: { general: "Something went wrong. Please try again." } };
  }
};

// Deleted Rooms
export const deleteRoom = async (id: string, image: string) => {
  try {
    await del(image);
    await prisma.room.delete({
      where: { id },
    });
  } catch (error) {
    console.log(error);
  }

  revalidatePath("/admin/room");
};

// Update Rooms
export const UpdateRoom = async (
  image: string,
  roomId: string,
  prevState: unknown,
  formData: FormData
) => {
  try {
    if (!image) {
      return { error: { general: "Image is required" } };
    }

    const rawData = {
      name: formData.get("name"),
      description: formData.get("description"),
      capacity: formData.get("capacity"),
      price: formData.get("price"),
      amenities: formData.getAll("amenities"),
    };

    const validateFields = RoomSchema.safeParse(rawData);
    if (!validateFields.success) {
      return { error: validateFields.error.flatten().fieldErrors };
    }

    const { name, description, price, amenities, capacity } =
      validateFields.data;

    await prisma.$transaction([
      prisma.room.update({
        where: { id: roomId },
        data: {
          name,
          description,
          image,
          price,
          capacity,
          RoomAmenities: {
            deleteMany: {},
          },
        },
      }),
      prisma.roomAmenities.createMany({
        data: amenities.map((item) => ({
          roomId,
          amenitiesId: item,
        })),
      }),
    ]);

    // ⚠️ Penting: letakkan sebelum return/redirect
    revalidatePath("/admin/room");

    // Redirect ke halaman admin room setelah sukses
    redirect("/admin/room");
  } catch (error) {
    console.error("Error saving room:", error);
    return { error: { general: "Failed to save room. Please try again." } };
  }
};

// RESERVED
export const createReserved = async (
  roomId: string,
  price: number,
  startDate: Date,
  endDate: Date,
  prevState: unknown,
  formData: FormData
) => {
  const session = await auth();
  if (!session || !session.user || !session.user.id)
    redirect(`/signin?redirect_url=room/${roomId}`);

  const rawData = {
    name: formData.get("name"),
    phone: formData.get("phone"),
  };

  const validateFields = ReservedSchema.safeParse(rawData);
  if (!validateFields.success) {
    return {
      error: validateFields.error.flatten().fieldErrors,
    };
  }

  const { name, phone } = validateFields.data;
  const night = differenceInCalendarDays(endDate, startDate);
  if (night <= 0) return { messageDate: "Date must be at 1 night" };

  const total = night * price;

  let reservationId;
  try {
    await prisma.$transaction(async (tx) => {
      await tx.user.update({
        data: {
          name,
          phone,
        },
        where: { id: session.user.id },
      });
      const reservation = await tx.reservation.create({
        data: {
          startDate: startDate,
          endDate: endDate,
          price: price,
          roomId: roomId,
          userId: session.user.id as string,
          Payment: {
            create: {
              amount: total,
            },
          },
        },
      });
      reservationId = reservation.id;
    });
  } catch (error) {
    console.log(error);
  }
  redirect(`/checkout/${reservationId}`);
};
