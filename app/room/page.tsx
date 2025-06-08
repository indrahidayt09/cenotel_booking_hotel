import Header from "@/components/Header-/Header";
import { Suspense } from "react";
import { Metadata } from "next";
import CardPage from "@/components/Card/cardPage";
import RoomSkeletons from "@/components/skeletons/roomSkeletons";

export const metadata: Metadata = {
  title: "Room & Rates",
  description: "Chose Your best Room",
};

const RoomPage = () => {
  return (
    <div>
      <Header title="Rooms & Rates" subtitle="Rooms Use Fast Paymeent" />
      <div className="mt-10 px-4">
        <Suspense fallback={<RoomSkeletons />}>
          <CardPage />
        </Suspense>
      </div>
    </div>
  );
};

export default RoomPage;
