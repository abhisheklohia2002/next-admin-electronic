import ProfileOverview from "@/components/profile-overview/Profile-overview";
import ProfileCustom from "@/shared/profile-custom/Profile-custom";
import React from "react";

export default async function page({ params }: any) {
  const { id } = await params;

  return (
    <>
     <ProfileCustom id={id}>
      <ProfileOverview userId = {id}/>
      </ProfileCustom>
    </>
  );
}
