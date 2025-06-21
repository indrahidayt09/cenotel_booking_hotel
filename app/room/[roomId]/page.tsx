import { Metadata } from "next";
import RoomDetail from "@/components/room/RoomDetail";
import { Suspense } from "react";


export const metadata: Metadata = {
  title: "Room Detail",
};

type Props = {
  params: {
    roomId: string;
  };
};

export default function RoomDetailPage({ params }: Props) {
  return (
    <div>
      <Suspense fallback={<p>Loading...</p>}>
        <RoomDetail roomId={params.roomId} />
      </Suspense>
    </div>
  );
}
