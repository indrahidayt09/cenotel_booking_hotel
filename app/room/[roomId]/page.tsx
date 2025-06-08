import { Metadata } from "next";
import RoomDetail from "@/components/room/RoomDetail";
import { Suspense } from "react";

export const metadata: Metadata = {
  title: "Room Detail",
};

const RoomDetailPage = ({ params }: { params: { roomId: string } }) => {
  const roomId = params.roomId;

  return (
    <div>
      <Suspense fallback={<p>Loading...</p>}>
        <RoomDetail roomId={roomId} />
      </Suspense>
    </div>
  );
};

export default RoomDetailPage;
