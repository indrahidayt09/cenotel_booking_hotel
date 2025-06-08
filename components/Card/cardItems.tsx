import Link from "next/link";
import Image from "next/image";
import { MdOutlinePeople } from "react-icons/md";
import { Room } from "@/app/generated/prisma";
import { formatCurrency } from "@/lib/utils";

export const CardItems = ({ room }: { room: Room }) => {
  return (
    <div className="bg-slate-100 rounded-t-xl shadow-sm hover:shadow-md transition duration-300 border border-slate-100">
      <div className="h-[240px] relative">
        <Image
          src={room.image}
          width={384}
          height={256}
          alt="room image"
          className="w-full h-full object-cover rounded-t-xl"
        />
      </div>
      <div className="p-6">
        <h4 className="text-lg font-semibold text-slate-800 mb-1">
          <Link
            href={`/room/${room.id}`}
            className="hover:text-blue-500 transition-colors duration-200"
          >
            {room.name}
          </Link>
        </h4>

        <p className="text-sm text-slate-500 mb-4">
          {formatCurrency(room.price)}
          <span className="text-slate-400"> /night</span>
        </p>

        <div className="flex items-center justify-between">
          <div className="flex items-center text-slate-500 gap-1 text-sm">
            <MdOutlinePeople className="text-lg" />
            <span>
              {room.capacity} {room.capacity === 1 ? "Person" : "People"}
            </span>
          </div>
          <Link
            href={`/room/${room.id}`}
            className="px-4 py-1.5 text-sm rounded-sm font-medium bg-blue-500 hover:bg-blue-600 text-white transition"
          >
            Booking Now
          </Link>
        </div>
      </div>
    </div>
  );
};
