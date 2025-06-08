import Link from "next/link";
import RoomTable from "@/components/admin/room/RoomTable";
import { Suspense } from "react";

const RoomPage = () => {
  return (
    <div className="max-w-screen-xl mx-auto px-4 py-16 mt-10">
      <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4 mb-8">
        <h1 className="text-3xl md:text-4xl font-semibold text-slate-700">
          Room List
        </h1>
        <Link
          href="/admin/room/create"
          className="bg-blue-500 hover:bg-blue-600 text-white font-semibold px-5 py-2 rounded-md shadow-sm transition"
        >
          + Create Room
        </Link>
      </div>

      <Suspense fallback={<p className="text-slate-500">Loading Data ...</p>}>
        <RoomTable />
      </Suspense>
    </div>
  );
};

export default RoomPage;
