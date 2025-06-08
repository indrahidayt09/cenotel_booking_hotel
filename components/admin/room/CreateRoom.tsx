import CreateForm from "@/components/admin/room/CreateForm";
import { getAmenities } from "@/lib/data";

const CreateRoom = async () => {
  const amenities = await getAmenities();
  if (!amenities) return null;

  return (
    <div>
      <h1 className="text-2xl font-semibold text-slate-700 mb-4">
        Create New Room
      </h1>
      <CreateForm amenities={amenities} />
    </div>
  );
};

export default CreateRoom;
