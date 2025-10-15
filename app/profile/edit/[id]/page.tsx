import PrivateRoute from "@/components/privateRoutes/PrivateRoutes";
import SideBarStructure from "@/shared/sidebar/Sidebar";
import React from "react";
import ProfilePage from "@/pages/profile/page";
import ProfileCustom from "@/shared/profile-custom/Profile-custom";

export default function page({ params }: any) {
  const { id } = params;
  return (
    <>
      <ProfileCustom id = {id}/>
    </>
  );
}
