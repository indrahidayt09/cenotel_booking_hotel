"use client";

import { useState, useRef, useEffect } from "react";
import { type PutBlobResult } from "@vercel/blob";
import { IoCloudUploadOutline, IoTrashOutline } from "react-icons/io5";
import Image from "next/image";
import { BarLoader } from "react-spinners";
import { Amenities } from "@/app/generated/prisma";
import { useActionState } from "react";
import { UpdateRoom } from "@/lib/action";
import clsx from "clsx";
import { useRouter } from "next/navigation";
import { RoomProps } from "@/types/room";

const EditForm = ({
  amenities,
  room,
}: {
  amenities: Amenities[];
  room: RoomProps;
}) => {
  const router = useRouter();
  const inputFileRef = useRef<HTMLInputElement>(null);
  const [image, setImage] = useState(room.image);
  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(false);

  // Fungsi upload gambar
  const handleUpload = async () => {
    if (!inputFileRef.current?.files) return;
    const file = inputFileRef.current.files[0];
    const formData = new FormData();
    formData.set("file", file);
    setLoading(true);
    try {
      const response = await fetch("/api/upload", {
        method: "PUT",
        body: formData,
      });
      const data = await response.json();
      if (response.status !== 200) {
        setMessage(data.message || "Upload failed");
        return;
      }
      const img = data as PutBlobResult;
      setImage(img.url);
      setMessage("");
    } catch (error) {
      console.error(error);
      setMessage("Something went wrong");
    } finally {
      setLoading(false);
    }
  };

  // Fungsi delete gambar
  const deleteImage = async () => {
    if (!image) return;
    setLoading(true);
    try {
      await fetch(`/api/upload/?imageUrl=${encodeURIComponent(image)}`, {
        method: "DELETE",
      });
      setImage("");
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  const [state, formAction, isPending] = useActionState(
    UpdateRoom.bind(null, image, room.id),
    null
  );

  // Handle redirect after successful submission
  useEffect(() => {
    if (state?.message === "Room created successfully") {
      const timer = setTimeout(() => {
        router.push("/admin/room");
      }, 1500); // Redirect after 1.5 seconds to show success message
      return () => clearTimeout(timer);
    }
  }, [state, router]);

  const checkedAmenities = room.RoomAmenities.map((item) => item.amenitiesId);

  return (
    <form action={formAction} className="space-y-6">
      <div className="grid md:grid-cols-12 gap-6">
        {/* Form kiri */}
        <div className="col-span-12 md:col-span-8 space-y-5 bg-slate-100 p-6 rounded-lg shadow-sm">
          <div className="mb-4">
            <label
              htmlFor="name"
              className="block text-sm font-medium text-slate-700 mb-1"
            >
              Room Name
            </label>
            <input
              defaultValue={room.name}
              id="name"
              type="text"
              placeholder="Room Name"
              name="name"
              className="py-2 px-4 rounded-sm border border-slate-400 w-full focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              required
            />
            {state?.error?.name && (
              <p className="mt-1 text-sm text-red-600">{state.error.name}</p>
            )}
          </div>

          <div className="mb-4">
            <label
              htmlFor="description"
              className="block text-sm font-medium text-slate-700 mb-1"
            >
              Description
            </label>
            <textarea
              id="description"
              name="description"
              defaultValue={room.description}
              rows={8}
              placeholder="Description"
              className="py-2 px-4 rounded-sm border border-slate-400 w-full focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              required
            ></textarea>
            {state?.error?.description && (
              <p className="mt-1 text-sm text-red-600">
                {state.error.description}
              </p>
            )}
          </div>

          <div className="mb-4">
            <h3 className="text-md font-semibold text-slate-800 mb-2">
              Amenities
            </h3>
            <div className="flex flex-wrap gap-4">
              {amenities.map((item) => (
                <div className="flex items-center" key={item.id}>
                  <input
                    id={`amenity-${item.id}`}
                    type="checkbox"
                    defaultValue={item.id}
                    defaultChecked={checkedAmenities.includes(item.id)}
                    name="amenities"
                    className="w-4 h-4 text-blue-500 bg-slate-200 border-slate-300 rounded focus:ring-blue-500"
                  />
                  <label
                    htmlFor={`amenity-${item.id}`}
                    className="ml-2 text-sm font-sm text-slate-700 capitalize"
                  >
                    {item.name}
                  </label>
                </div>
              ))}
            </div>
            {state?.error?.amenities && (
              <p className="mt-1 text-sm text-red-600">
                {state.error.amenities}
              </p>
            )}
          </div>
        </div>

        {/* Form kanan */}
        <div className="col-span-12 md:col-span-4 space-y-5 bg-slate-100 p-6 rounded-lg shadow-sm">
          <div className="relative flex flex-col mb-4 items-center justify-center aspect-video border-2 border-slate-300 border-dashed rounded-md bg-slate-100 cursor-pointer overflow-hidden">
            {loading && (
              <div className="absolute inset-0 flex items-center justify-center bg-black bg-opacity-30 z-20">
                <BarLoader color="#ffffff" />
              </div>
            )}

            {image && (
              <button
                type="button"
                onClick={deleteImage}
                className="absolute z-20 right-1 top-1 p-1 bg-black bg-opacity-50 rounded-full hover:bg-opacity-70"
                aria-label="Delete image"
              >
                <IoTrashOutline className="size-5 text-white" />
              </button>
            )}

            <div
              className="flex flex-col items-center justify-center text-slate-400 w-full h-full z-10"
              onClick={() => inputFileRef.current?.click()}
            >
              {!image && (
                <>
                  <IoCloudUploadOutline className="size-8 mb-2" />
                  <p className="mb-1 text-sm font-bold">Select Image</p>
                  <p className="text-xs text-center">
                    SVG, PNG, JPG, GIF (Max: 4MB)
                  </p>
                  {message && <p className="text-xs text-red-600">{message}</p>}
                </>
              )}
            </div>

            {image && (
              <Image
                src={image}
                alt="Uploaded room image"
                fill
                className="object-cover"
                priority
              />
            )}

            <input
              type="file"
              ref={inputFileRef}
              onChange={handleUpload}
              className="hidden"
              accept="image/*"
              aria-label="Upload room image"
            />
          </div>

          <div className="mb-4">
            <label
              htmlFor="capacity"
              className="block text-sm font-medium text-slate-700 mb-1"
            >
              Capacity
            </label>
            <input
              id="capacity"
              defaultValue={room.capacity}
              type="number"
              placeholder="Capacity"
              name="capacity"
              min="1"
              className="py-2 px-4 rounded-sm border border-slate-400 w-full focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              required
            />
            {state?.error?.capacity && (
              <p className="mt-1 text-sm text-red-600">
                {state.error.capacity}
              </p>
            )}
          </div>

          <div className="mb-4">
            <label
              htmlFor="price"
              className="block text-sm font-medium text-slate-700 mb-1"
            >
              Price
            </label>
            <input
              id="price"
              type="number"
              placeholder="Price"
              name="price"
              defaultValue={room.price}
              min="0"
              step="0.01"
              className="py-2 px-4 rounded-sm border border-slate-400 w-full focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              required
            />
            {state?.error?.price && (
              <p className="mt-1 text-sm text-red-600">{state.error.price}</p>
            )}
          </div>
        </div>

        {/* General Message */}
        {state?.message && (
          <div
            className={clsx(
              "col-span-12 p-3 rounded border",
              state.message === "Room created successfully"
                ? "bg-green-100 border-green-400 text-green-700"
                : "bg-red-100 border-red-400 text-red-700"
            )}
          >
            <p className="text-sm">{state.message}</p>
            {state.message === "Room created successfully" && (
              <p className="text-xs mt-1">Redirecting to room list...</p>
            )}
          </div>
        )}

        <div className="col-span-12">
          <button
            type="submit"
            className={clsx(
              "text-white bg-blue-500 w-full hover:bg-blue-600 py-2.5 px-6 text-lg rounded-md transition-colors duration-200",
              {
                "opacity-50 cursor-not-allowed": isPending || loading,
              }
            )}
            disabled={isPending || loading}
            aria-disabled={isPending || loading}
          >
            {isPending ? "Updating..." : "Update"}
          </button>
        </div>
      </div>
    </form>
  );
};

export default EditForm;
