import { getRooms } from "@/lib/data";
import { CardItems } from "./cardItems";
import { notFound } from "next/navigation";

const CardPage = async () => {
  const rooms = await getRooms();
  if (!rooms) return notFound();

  return (
    <div className="max-w-screen-xl px-4 py-15 mx-auto">
      <div className="grid gap-7 md:grid-cols-3 bg-slate-200 p-10 rounded-xl">
        {rooms.map((room) => (
          <CardItems room={room} key={room.id} />
        ))}
      </div>
    </div>
  );
};

export default CardPage;
