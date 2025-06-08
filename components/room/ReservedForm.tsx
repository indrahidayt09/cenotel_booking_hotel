"use client";

import { useState, useActionState } from "react";
import { addDays } from "date-fns";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { createReserved } from "@/lib/action";
import { RoomDetailProps } from "@/types/room";
import clsx from "clsx";

const ReservedForm = ({ room }: { room: RoomDetailProps }) => {
  const StartDate = new Date();
  const EndDate = addDays(StartDate, 1);

  const [startDate, setStartDate] = useState(StartDate);
  const [endDate, setEndDate] = useState(EndDate);

  function handleDateChange(dates: any) {
    const [start, end] = dates;
    setStartDate(start);
    setEndDate(end);
  }

  const [state, formAction, isPending] = useActionState(
    createReserved.bind(null, room.id, room.price, startDate, endDate),
    null
  );

  return (
    <div className="bg-slate-200 p-6 rounded-t-xl shadow-sm border border-slate-100">
      <form action={formAction} className="space-y-4">
        {/* Date Picker */}
        <div>
          <label className="block mb-1 text-sm font-medium text-slate-700">
            Arrival - Departure
          </label>
          <DatePicker
            selected={startDate}
            startDate={startDate}
            endDate={endDate}
            minDate={new Date()}
            onChange={handleDateChange}
            selectsRange={true}
            dateFormat="dd-MM-yyyy"
            wrapperClassName="w-full"
            className="w-full px-4 py-2 border border-slate-200 rounded-md bg-slate-50 text-slate-700 focus:outline-none focus:ring-2 focus:ring-blue-200"
          />
          {state?.messageDate && (
            <p className="text-sm mt-1 text-red-500">{state.messageDate}</p>
          )}
        </div>

        {/* Name */}
        <div>
          <label className="block mb-1 text-sm font-medium text-slate-700">
            Your Name
          </label>
          <input
            type="text"
            name="name"
            placeholder="Full name"
            className="w-full px-4 py-2 border border-slate-200 rounded-md bg-slate-50 text-slate-700 focus:outline-none focus:ring-2 focus:ring-blue-200"
          />
          {state?.error?.name && (
            <p className="text-sm mt-1 text-red-500">{state.error.name}</p>
          )}
        </div>

        {/* Phone */}
        <div>
          <label className="block mb-1 text-sm font-medium text-slate-700">
            Phone Number
          </label>
          <input
            type="text"
            name="phone"
            placeholder="Phone number"
            className="w-full px-4 py-2 border border-slate-200 rounded-md bg-slate-50 text-slate-700 focus:outline-none focus:ring-2 focus:ring-blue-200"
          />
          {state?.error?.phone && (
            <p className="text-sm mt-1 text-red-500">{state.error.phone}</p>
          )}
        </div>

        {/* Submit Button */}
        <button
          type="submit"
          className={clsx(
            "w-full py-2.5 text-sm font-medium rounded-md bg-blue-500 text-white hover:bg-blue-600 transition",
            {
              "opacity-60 cursor-progress": isPending,
            }
          )}
          disabled={isPending}
        >
          {isPending ? "Loading..." : "Reserve"}
        </button>
      </form>
    </div>
  );
};

export default ReservedForm;
