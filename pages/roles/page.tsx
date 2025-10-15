"use client";
import CustomTable from "@/shared/custom-table/CustomTable";
import axios from "axios";
import React, { useEffect, useState } from "react";

export default function Rolespage({ id }: any) {
  const [loading, setLoading] = useState(true);
  const [roles, setRoles] = useState<any[]>([]);

  const getRoles = async () => {
    console.log(id, "id");
    try {
      let response;
      if (id) {
        response = await axios.get(
          `http://localhost:8000/api/admin/roles/${id}`
        );
      } else {
        response = await axios.get(`http://localhost:8000/api/admin/roles`);
      }

    //   console.log(response?.data, "respone roles");
      setRoles(response?.data || []);
    } catch (error) {
      console.error("Error fetching sales:", error);
    } finally {
      setLoading(false);
    }
  };

  const handleCheckboxChange = async (
    rowId: string,
    key: string,
    value: boolean
  ) => {
    console.log("Updating role:", rowId, key, value);
    const updated = await axios.put(
      `http://localhost:8000/api/admin/roles/${rowId}`,
      {
        $set: { [key]: value },
      }
    );
    console.log(updated,'updtaer')
    setRoles(updated?.data)
  };
  //   if (loading) {
  //     return <span>Loading Roles...</span>;
  //   }
  let col = [
    { label: "Name", key: "name" },
    { label: "Level", key: "level" },
    { label: "Create", key: "permissionsAccess.create", checkbox: true },
    { label: "Edit", key: "permissionsAccess.edit", checkbox: true },
    { label: "Read", key: "permissionsAccess.read", checkbox: true },
    { label: "Delete", key: "permissionsAccess.delete", checkbox: true },
    { label: "Approve", key: "permissionsAccess.approve", checkbox: true },
    { label: "Reject", key: "permissionsAccess.reject", checkbox: true },
    {
      label: "RequestApproval",
      key: "permissionsAccess.requestApproval",
      checkbox: true,
    },
    { label: "publish", key: "permissionsAccess.publish", checkbox: true },
    {
      label: "assignPermission",
      key: "permissionsAccess.assignPermission",
      checkbox: true,
    },
  ];
  useEffect(() => {
    getRoles();
  }, []);

  return (
    <div>
      {" "}
      {
        <CustomTable
          data={roles}
          col={col}
          editActive={true}
          id={id}
          handleCheckboxChange={handleCheckboxChange}
          module = "roles"
        />
      }
    </div>
  );
}
