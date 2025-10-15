"use client";
import React, { useEffect, useState } from "react";
import { Card, Typography } from "@material-tailwind/react";
import { ExclamationCircleIcon } from "@heroicons/react/24/outline";
import axios from "axios";
import { useRouter } from "next/navigation";

export default function ProfileModule({userId}:any) {
  const [availableRoles, setAvailableRoles] = useState<any[]>([]);
  const [modules, setModules] = useState<any[]>([]);
  const [selectedRoles, setSelectedRoles] = useState<Record<string, any>>({});
  const [accessData, setAccessData] = useState<any[]>([]); // ✅ New state for fetched access data
  const router = useRouter();

  // --- Fetch roles ---
  const getRoles = async () => {
    try {
      const response = await axios.get("http://localhost:8000/api/admin/roles", {
        headers: { "Content-Type": "application/json" },
      });
      setAvailableRoles(response.data || []);
    } catch (error) {
      console.error("❌ Error fetching roles:", error);
      setAvailableRoles([]);
    }
  };

  // --- Fetch modules ---
  const getModules = async () => {
    try {
      const response = await axios.get("http://localhost:8000/api/admin/modules", {
        headers: { "Content-Type": "application/json" },
      });

      const data = Array.isArray(response.data)
        ? response.data
        : [response.data];

      setModules(data);
    } catch (error) {
      console.error("❌ Error fetching modules:", error);
      setModules([]);
    }
  };

  // --- Fetch module access (existing user roles) ---
  const getAccessModules = async () => {
    try {
      if (!userId) return;

      const response = await axios.get(
        `http://localhost:8000/api/admin/module-access/${userId}`,
        { headers: { "Content-Type": "application/json" } }
      );

      if (response?.data?.data) {
        console.log("✅ Fetched module access:", response.data.data);
        setAccessData(response.data.data);
      }
    } catch (error) {
      console.error("❌ Error fetching module access:", error);
    }
  };

  useEffect(() => {
    getRoles();
    getModules();
    getAccessModules();
  }, []);

  // --- Handle dropdown change ---
  const handleRoleChange = (moduleId: string, roleId: string) => {
    const selectedRole = availableRoles.find((r) => r._id === roleId);
    const updated = {
      ...selectedRoles,
      [moduleId]: {
        roleName: selectedRole?.name || "",
        roleId,
        moduleId,
      },
    };
    setSelectedRoles(updated);
  };

  // --- Submit selected modules ---
  const handleSubmitModule = async () => {
    // const allSelected = modules.every((m) => selectedRoles[m._id]);
    // if (!allSelected) {
    //   alert("Please select roles for all modules before proceeding.");
    //   return;
    // }
    if (!userId) {
      alert("User not found! Please log in again.");
      return;
    }

    const moduleAccessArray = Object.keys(selectedRoles).map((key) => ({
      moduleId: selectedRoles[key].moduleId,
      roleId: selectedRoles[key].roleId,
    }));

    const payload = { userId, moduleAccess: moduleAccessArray };

    try {
      const response = await axios.put(
        "http://localhost:8000/api/admin/module-access",
        payload,
        { headers: { "Content-Type": "application/json" } }
      );

      if (response?.data) {
        alert("Module access saved successfully!");
        router.push(`/profile`);
      }
    } catch (error: any) {
      console.error("❌ Save failed:", error.response?.data || error.message);
      alert("Something went wrong while saving module access.");
    }
  };

  return (
    <Card className="h-full p-4 shadow-xl shadow-blue-gray-900/5">
      {/* Header */}
      <div className="flex justify-between items-center bg-gray-100 px-4 py-2 rounded-t-md">
        <Typography variant="h6" className="w-1/2 font-bold">
          Module Name
        </Typography>
        <Typography variant="h6" className="w-1/2 font-bold">
          Role
        </Typography>
      </div>

      {/* Module Rows */}
      {modules.length === 0 ? (
        <div className="p-4 text-center text-gray-500">Loading modules...</div>
      ) : (
        modules.map((module) => (
          <div
            key={module._id}
            className="flex items-center justify-between border-b py-3 px-4"
          >
            {/* Left: Module Name */}
            <div className="flex items-center gap-2 w-1/2">
              <Typography>{module.name}</Typography>
            </div>

            {/* Right: Role Dropdown */}
            <div className="flex items-center gap-2 w-1/2">
              <select
                value={selectedRoles[module._id]?.roleId || ""}
                onChange={(e) => handleRoleChange(module._id, e.target.value)}
                className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg 
                           focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 
                           dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 
                           dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
              >
                <option value="">Select a role</option>
                {availableRoles.map((role) => (
                  <option key={role._id} value={role._id}>
                    {role.name}
                  </option>
                ))}
              </select>

              {!selectedRoles[module._id] && (
                <ExclamationCircleIcon className="h-6 w-6 text-red-500" />
              )}
            </div>
          </div>
        ))
      )}

      {/* ✅ Right-Aligned Button */}
      <div className="flex justify-end mt-4">
        <button
          type="button"
          onClick={handleSubmitModule}
          className="text-white bg-red-700 hover:bg-red-800 focus:outline-none focus:ring-4 
                     focus:ring-red-300 font-medium rounded-full text-sm px-5 py-2.5 text-center 
                     dark:bg-red-600 dark:hover:bg-red-700 dark:focus:ring-red-900"
        >
          Next
        </button>
      </div>

      {accessData.length > 0 && (
        <div className="mt-6 border-t pt-4">
          <Typography variant="h6" className="mb-2 font-bold">
            Existing Module Access
          </Typography>
          <ul className="space-y-2">
            {accessData.map((item, index) => (
              <li
                key={index}
                className="flex justify-between bg-gray-50 border rounded-lg p-2"
              >
                <span className="font-medium">{item.moduleName}</span>
                <span className="text-gray-700">{item.roleName}</span>
              </li>
            ))}
          </ul>
        </div>
      )}
    </Card>
  );
}
