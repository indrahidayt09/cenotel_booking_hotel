import { getAmenities, getRoomById } from "@/lib/data";
import EditForm from "./EditForm";
import { notFound } from "next/navigation";

const EditRoom = async ({ roomId }: { roomId: string }) => {
  const [amenities, room] = await Promise.all([
    getAmenities(),
    getRoomById(roomId),
  ]);
  if (!amenities || !room) return notFound();

  return (
    <div className="max-w-screen-xl mx-auto p-4">
      <h1 className="text-3xl font-semibold text-slate-700 mb-6">Edit Room</h1>
      <EditForm amenities={amenities} room={room} />
    </div>
  );
};

export default EditRoom;
