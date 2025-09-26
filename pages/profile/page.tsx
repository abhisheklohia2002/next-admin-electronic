"use client";
import ProfileAddEdit from "@/components/profile-add-edit/Profile.add-edit";
import CustomTable from "@/shared/custom-table/CustomTable";
import axios from "axios";
import React, { useEffect, useState } from "react";

export default function ProfilePage({ id }: any) {
  const [loading, setLoading] = useState(true);
  const [profile, setProfile] = useState<any[]>([]);
  const getProfile = async () => {
    try {
      const response = await axios.get(
        `http://localhost:8000/api/admin/profile`
      );
      console.log(response?.data, "response");
      setProfile(response?.data?.users);
    } catch (error) {}
  };
  let col = [
    { label: "Employee Id", key: "_id" },
    { label: "Contact", key: "contact.phone" },
    { label: "Email", key: "email" },
    { label: "Department", key: "dept" },
    { label: "Location", key: "location.city" },
    { label: "Status", key: "status" },
  ];

  useEffect(() => {
    getProfile();
  }, []);
  return (
    <div>
      {id ? (
        <ProfileAddEdit id = {id} />
      ) : (
        <CustomTable
          data={profile}
          col={col}
          editActive={true}
          module="profiles"
        />
      )}
    </div>
  );
}
