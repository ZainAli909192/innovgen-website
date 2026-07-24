import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { ThreeSystemDemo } from "@/components/three/three-system-demo";

export const metadata: Metadata = {
  title: "3D System",
  description: "Development-only validation route for the InnovGen 3D system.",
  robots: {
    index: false,
    follow: false,
  },
};

export default function ThreeSystemPage() {
  if (process.env.NODE_ENV === "production") {
    notFound();
  }

  return <ThreeSystemDemo />;
}
