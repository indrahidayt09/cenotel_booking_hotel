import Image from "next/image";
import { getRoomDetailById } from "@/lib/data";
import { notFound } from "next/navigation";
import { IoCheckmark, IoPeopleOutline } from "react-icons/io5";
import { formatCurrency } from "@/lib/utils";
import ReservedForm from "./ReservedForm";

const RoomDetail = async ({ roomId }: { roomId: string }) => {
  const room = await getRoomDetailById(roomId);
  if (!room) return notFound();
  return (
    <div className="max-w-screen-xl py-20 px-4 grid lg:grid-cols-12 gap-10 mx-auto">
      {/* Left content: image, title, description */}
      <div className="md:col-span-8">
        <div className="p-2 md:p-3 bg-slate-100 rounded-t-xl  overflow-hidden mb-10 border-slate-50">
          <Image
            src={room.image}
            alt={room.name}
            width={770}
            height={430}
            priority
            className="w-full rounded-t-xl object-cover max-h-100 border "
          />
        </div>

        <h1 className="text-3xl md:text-4xl font-semibold text-slate-800 mb-6">
          {room.name}
        </h1>

        <p className="text-slate-600 leading-relaxed mb-8">
          {room.description}
        </p>

        <h5 className="text-xl font-semibold text-slate-700 mb-3">Amenities</h5>
        <div className="grid md:grid-cols-3 gap-y-2 text-slate-600 text-sm">
          {room.RoomAmenities.map((item) => (
            <div className="flex items-center gap-2" key={item.id}>
              <IoCheckmark className="text-blue-500" />
              <span>{item.Amenities.name}</span>
            </div>
          ))}
        </div>
      </div>

      {/* Right content: reservation card */}
      <div className="md:col-span-4">
        <div className="p-6 bg-slate-100 border border-slate-50 rounded-xl shadow-md">
          <div className="flex items-center justify-between mb-6">
            <div className="flex items-center space-x-2 text-slate-700">
              <IoPeopleOutline className="text-blue-500" />
              <span className="text-sm font-medium">
                {room.capacity} {room.capacity === 1 ? "Person" : "People"}
              </span>
            </div>
            <div className="text-right">
              <span className="text-2xl font-bold text-slate-800">
                {formatCurrency(room.price)}
              </span>
              <span className="block text-xs text-slate-400">/night</span>
            </div>
          </div>

          {/* Form */}
          <ReservedForm room={room} />
        </div>
      </div>
    </div>
  );
};

export default RoomDetail;
