"use client";

import { reservationProps } from "@/types/reservation";
import { useTransition } from "react";

declare global {
  interface Window {
    snap: {
      pay: (token: string) => void;
    };
  }
}

const PaymentButton = ({ reservation }: { reservation: reservationProps }) => {
  const handlePayment = async () => {
    const [isPending, startTransition] = useTransition();

    startTransition(async () => {
      try {
        const response = await fetch("/api/payment", {
          method: "POST",
          body: JSON.stringify(reservation),
        });

        const { token } = await response.json();
        if (token) {
          window.snap.pay(token);
        }
      } catch (error) {
        console.error("Payment Error:", error);
      }
    });
  };

  return (
    <button
      onClick={handlePayment}
      className="px-10 py-4 mt-2 text-center font-semibold text-slate-200 bg-blue-500 rounded-sm hover:bg-blue-600 cursor-pointer"
    >
      Pay Nows
    </button>
  );
};

export default PaymentButton;
