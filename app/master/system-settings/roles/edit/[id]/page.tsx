import PrivateRoute from "@/components/privateRoutes/PrivateRoutes";
import Rolespage from "@/pages/roles/page";
import SideBarStructure from "@/shared/sidebar/Sidebar";
import React from "react";

export default function page({ params }: any) {
    const { id } = params;
    
  return (
    <>
      <PrivateRoute>
        <SideBarStructure title={`Roles Manage By ${id}`}>
          <Rolespage id = {id} />
        </SideBarStructure>
      </PrivateRoute>
    </>
  );
}
