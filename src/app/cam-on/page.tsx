import type { Metadata } from "next";
import { Suspense } from "react";
import { CamOn } from "@/components/CamOn";

export const metadata: Metadata = { title: "Cảm ơn | WINDUCA" };

export default function CamOnPage() {
  return (
    <Suspense fallback={<div className="min-h-[60svh] bg-than-chi" />}>
      <CamOn />
    </Suspense>
  );
}
