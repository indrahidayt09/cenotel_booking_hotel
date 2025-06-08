"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { createReserved } from "@/lib/action";
import { Room } from "@/app/generated/prisma";
import { DateRange } from "react-day-picker";
import { format } from "date-fns";


interface CheckoutFormProps {
  room: Room;
  date: DateRange;
}

export default function CheckoutForm({ room, date }: CheckoutFormProps) {
  const router = useRouter();
  const [isPending, setIsPending] = useState(false);
  const [error, setError] = useState("");

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsPending(true);
    setError("");

    try {
      const formData = new FormData(e.currentTarget);
      const result = await createReserved(
        room.id,
        room.price,
        date.from!,
        date.to!,
        null,
        formData
      );

      if (result.error) {
        setError(result.error.general || "Something went wrong");
        return;
      }

      if (result.redirectUrl) {
        window.location.href = result.redirectUrl;
      }
    } catch (error) {
      console.error("Error:", error);
      setError("Failed to process payment");
    } finally {
      setIsPending(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div>
        <label htmlFor="name" className="block text-sm font-medium text-gray-700">
          Full Name
        </label>
        <input
          type="text"
          id="name"
          name="name"
          required
          className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
        />
      </div>

      <div>
        <label htmlFor="phone" className="block text-sm font-medium text-gray-700">
          Phone Number
        </label>
        <input
          type="tel"
          id="phone"
          name="phone"
          required
          className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
        />
      </div>

      <div className="bg-gray-50 p-4 rounded-md">
        <h3 className="text-lg font-medium text-gray-900">Booking Summary</h3>
        <dl className="mt-2 space-y-2">
          <div className="flex justify-between">
            <dt className="text-sm text-gray-600">Room</dt>
            <dd className="text-sm font-medium text-gray-900">{room.name}</dd>
          </div>
          <div className="flex justify-between">
            <dt className="text-sm text-gray-600">Check-in</dt>
            <dd className="text-sm font-medium text-gray-900">
              {format(date.from!, "PPP")}
            </dd>
          </div>
          <div className="flex justify-between">
            <dt className="text-sm text-gray-600">Check-out</dt>
            <dd className="text-sm font-medium text-gray-900">
              {format(date.to!, "PPP")}
            </dd>
          </div>
          <div className="flex justify-between border-t pt-2">
            <dt className="text-base font-medium text-gray-900">Total</dt>
            <dd className="text-base font-medium text-gray-900">
              Rp {room.price.toLocaleString()}
            </dd>
          </div>
        </dl>
      </div>

      {error && (
        <div className="rounded-md bg-red-50 p-4">
          <div className="flex">
            <div className="ml-3">
              <h3 className="text-sm font-medium text-red-800">{error}</h3>
            </div>
          </div>
        </div>
      )}

      <button
        type="submit"
        disabled={isPending}
        className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 disabled:opacity-50 disabled:cursor-not-allowed"
      >
        {isPending ? "Processing..." : "Proceed to Payment"}
      </button>
    </form>
  );
} 