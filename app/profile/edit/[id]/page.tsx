import PrivateRoute from "@/components/privateRoutes/PrivateRoutes";
import SideBarStructure from "@/shared/sidebar/Sidebar";
import React from "react";
import ProfilePage from "@/pages/profile/page";

export default function page({ params }: any) {
  const { id } = params;
  return (
    <>
      <PrivateRoute>
        <SideBarStructure title={`Profile by ${id}`}>
          <ProfilePage id={id} />
        </SideBarStructure>
      </PrivateRoute>
    </>
  );
}
