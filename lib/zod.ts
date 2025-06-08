import { object, string, coerce, array, number } from "zod";

export const RoomSchema = object({
  name: string()
    .min(1, "Room name is required")
    .max(100, "Room name must be less than 100 characters"),
  description: string()
    .min(50, "Description must be at least 50 characters")
    .max(1000, "Description must be less than 1000 characters"),
  capacity: coerce
    .number()
    .int("Capacity must be a whole number")
    .min(1, "Capacity must be at least 1")
    .max(10, "Capacity cannot exceed 10"),
  price: coerce
    .number()
    .int("Price must be a whole number")
    .min(1, "Price must be greater than 0"),
  amenities: array(string())
    .min(1, "Please select at least one amenity")
    .max(10, "Cannot select more than 10 amenities"),
});

export const ReservedSchema = object({
  name: string().min(1),
  phone: string().min(10),
});

export const ContactSchema = object({
  name: string()
    .min(3, "Name must be at least 3 characters")
    .max(100, "Name must be less than 100 characters"),
  email: string()
    .min(1, "Email is required")
    .email("Please enter a valid email address"),
  subject: string()
    .min(3, "Subject must be at least 3 characters")
    .max(200, "Subject must be less than 200 characters"),
  message: string()
    .min(10, "Message must be at least 10 characters")
    .max(1000, "Message must be less than 1000 characters"),
});
