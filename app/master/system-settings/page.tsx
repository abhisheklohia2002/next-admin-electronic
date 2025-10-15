import PrivateRoute from "@/components/privateRoutes/PrivateRoutes";
import Rolespage from "@/pages/roles/page";
import SystemSystem from "@/pages/system-settings/System-System";
import SideBarStructure from "@/shared/sidebar/Sidebar";
import React from "react";

export default function page() {
  return (
    <PrivateRoute>
      <SideBarStructure title="System Settings">
        <SystemSystem />
      </SideBarStructure>
    </PrivateRoute>
  );
}
