"use client";
import React from "react";
import { useRouter } from "next/navigation";

export default function SystemSystem() {
  const systemSettings = ["Modules", "Roles"];
  const route = useRouter();
  const handleRedirect = (elem: any) => {
    if (elem === "Roles") {
      route.push("/master/system-settings/roles");
    } else if (elem === "Modules") {
      route.push("/master/system-settings/modules");
    }
  };
  return (
    <div className="h-screen bg-gray-100 p-6">
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {systemSettings.map((elem, index) => (
          <div
            onClick={() => handleRedirect(elem)}
            key={index}
            className="bg-white shadow-lg rounded-xl p-6 w-[16rem] h-[8rem] flex items-center justify-center"
          >
            <h2 className="text-xl font-semibold text-gray-800">{elem}</h2>
          </div>
        ))}
      </div>
    </div>
  );
}
