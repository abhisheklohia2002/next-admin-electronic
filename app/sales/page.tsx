import PrivateRoute from "@/components/privateRoutes/PrivateRoutes";
import CustomTable from "@/shared/custom-table/CustomTable";
import SideBarStructure from "@/shared/sidebar/Sidebar";
import React from "react";

export default function Sales() {
  return (
    <>
      <PrivateRoute>
        <SideBarStructure title="Leads">
          <CustomTable />
        </SideBarStructure>
      </PrivateRoute>
    </>
  );
}
