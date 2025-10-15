import React from "react";
import { CustomSubSidebar } from "@/shared/sub-sidebar/SubSidebar";
import "./profile.css"
export default function ProfileAddEdit({children,id}:any) {
  return (
    <>
      <div className="flex h-screen">
        <div className="main-subSider">
          <CustomSubSidebar id = {id} />
        </div>
         <main className="flex-1 ml-[12px] bg-gray-50 overflow-y-auto">
          <h1 className="text-2xl font-semibold"></h1>
          <div className="text-gray-600">
            {children}
          </div>
        </main>
      </div>
    </>
  );
}
