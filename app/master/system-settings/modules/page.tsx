import PrivateRoute from "@/components/privateRoutes/PrivateRoutes";
import ModulesPage from "@/pages/modules/modules";
import SideBarStructure from "@/shared/sidebar/Sidebar";
import React from "react";

export default function page() {
  return (
    <>
      <PrivateRoute>
        <SideBarStructure title="Manages Modules">
          <ModulesPage/>
        </SideBarStructure>
      </PrivateRoute>
    </>
  );
}
