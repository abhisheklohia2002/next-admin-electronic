import { StickyNavbar } from "@/components/navbar/navbar";
import { CustomSidebar } from "@/components/sidebar/Sidebar";
import React from "react";

export default function HomePage() {
  return (
    <div className="flex h-screen">
      <div className="w-60">
        <CustomSidebar />
      </div>
      <div className="flex-1 flex flex-col">
        <StickyNavbar />
        <main className="flex-1 p-6 bg-gray-50 overflow-y-auto">
          <h1 className="text-2xl font-semibold">Welcome to Dashboard</h1>
          <p className="mt-4 text-gray-600">
            Your main content goes here...
          </p>
        </main>
      </div>
    </div>
  );
}
