import ProfileCustom from "@/shared/profile-custom/Profile-custom";
import React from "react";

export default function page({ params }: any) {
  const { id } = params;

  return (
    <>
      <ProfileCustom id={id} />
    </>
  );
}
