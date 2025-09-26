import React from "react";
import { CustomSubSidebar } from "@/shared/sub-sidebar/SubSidebar";
import "./profile.css"
export default function ProfileAddEdit({id}:any) {
  return (
    <>
      <div className="flex h-screen">
        <div className="main-subSider">
          <CustomSubSidebar />
        </div>
      </div>
    </>
  );
}
