import { getRooms } from "@/lib/data";
import Image from "next/image";
import { formatDate, formatCurrency } from "@/lib/utils";
import { DeleteButton, EditButton } from "./button";

const RoomTable = async () => {
  const rooms = await getRooms();
  if (!rooms?.length) return <p>No Room Form</p>;
  return (
   <div className="bg-white p-6 mt-6 rounded-md shadow-md">
  <table className="w-full table-auto border-collapse">
    <thead>
      <tr className="bg-slate-100 border-b border-slate-300">
        <th className="px-4 py-3 w-32 text-xs font-semibold text-slate-600 uppercase tracking-wide text-left"></th>
        <th className="px-4 py-3 text-xs font-semibold text-slate-600 uppercase tracking-wide text-left">
          Room Name
        </th>
        <th className="px-4 py-3 text-xs font-semibold text-slate-600 uppercase tracking-wide text-left">
          Price
        </th>
        <th className="px-4 py-3 text-xs font-semibold text-slate-600 uppercase tracking-wide text-left">
          Created
        </th>
        <th className="px-4 py-3 text-xs font-semibold text-slate-600 uppercase tracking-wide text-center">
          Actions
        </th>
      </tr>
    </thead>

    <tbody className="divide-y divide-slate-200">
      {rooms.map((room) => (
        <tr
          key={room.id}
          className="hover:bg-slate-50 transition-colors duration-200"
        >
          <td className="px-4 py-3">
            <div className="h-20 w-32 relative rounded-md overflow-hidden shadow-sm">
              <Image
                src={room.image}
                fill
                sizes="2vw"
                alt="room image"
                className="object-cover"
              />
            </div>
          </td>
          <td className="px-4 py-3 text-sm text-slate-700">{room.name}</td>
          <td className="px-4 py-3 text-sm text-slate-700">
            {formatCurrency(room.price)}
          </td>
          <td className="px-4 py-3 text-sm text-slate-700">
            {formatDate(room.createdAt.toString())}
          </td>
          <td className="px-4 py-3">
            <div className="flex items-center justify-center gap-2">
              <EditButton id={room.id} />
              <DeleteButton id={room.id} image={room.image} />
            </div>
          </td>
        </tr>
      ))}
    </tbody>
  </table>
</div>

  );
};

export default RoomTable;
