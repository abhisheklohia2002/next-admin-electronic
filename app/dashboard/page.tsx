import PrivateRoute from "@/components/privateRoutes/PrivateRoutes";
import SideBarStructure from "@/shared/sidebar/Sidebar";
import React from "react";

export default function page() {
  return (
    <PrivateRoute>
      <SideBarStructure title="Dashboard">
        <h1>Dashboard Body</h1>
      </SideBarStructure>
    </PrivateRoute>
  );
}
