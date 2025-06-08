import { handleMidtransNotification } from "@/lib/midtrans";
import { NextResponse } from "next/server";

export async function POST(request: Request) {
  try {
    const notification = await request.json();
    await handleMidtransNotification(notification);
    return NextResponse.json({ success: true });
  } catch (error) {
    console.error("Error handling Midtrans notification:", error);
    return NextResponse.json(
      { error: "Failed to process notification" },
      { status: 500 }
    );
  }
} 