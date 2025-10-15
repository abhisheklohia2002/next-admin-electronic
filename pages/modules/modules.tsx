"use client";
import React, { useEffect, useState } from "react";
import ModulesModal from "@/shared/modals/Modal";
import axios from "axios";
import { PlusIcon, PencilSquareIcon } from "@heroicons/react/24/solid";

export default function ModulesPage() {
  const [modules, setModules] = useState<any[]>([]);
  const [loading, setLoading] = useState(false);

  const getModules = async () => {
    try {
      setLoading(true);
      const res = await axios.get("http://localhost:8000/api/admin/modules");
      setModules(res?.data || []);
    } catch (err) {
      console.error("❌ Error fetching modules:", err);
    } finally {
      setLoading(false);
    }
  };

  const handleSuccess = () => getModules();

  useEffect(() => {
    getModules();
  }, []);

  return (
    <div className="p-6">
      <div className="flex items-center justify-between w-full max-w-3xl mb-6">
        <h2 className="text-2xl font-semibold text-gray-800">Modules</h2>
        <ModulesModal onSuccess={handleSuccess}>Add Module</ModulesModal>
      </div>

      {/* Listing */}
      <div className="bg-white shadow-md rounded-lg p-4 w-full max-w-3xl">
        {loading ? (
          <p className="text-gray-500 text-center">Loading modules...</p>
        ) : modules.length === 0 ? (
          <p className="text-gray-500 text-center">No modules found.</p>
        ) : (
          <ul className="divide-y divide-gray-200">
            {modules.map((mod) => (
              <li key={mod._id} className="py-3 px-2">
                <div className="flex items-center justify-between">
                  <div className="font-medium text-gray-900">{mod.name}</div>
                  <div className="flex gap-3">
                    {/* ✏️ Edit Parent */}
                    <ModulesModal
                      onSuccess={handleSuccess}
                      editMode
                      defaultValue={mod.name}
                      moduleId={mod._id}
                    >
                      <PencilSquareIcon className="h-5 w-5 text-gray-600 hover:text-blue-600 cursor-pointer" />
                    </ModulesModal>

                    {/* ➕ Add Submodule */}
                    <ModulesModal
                      onSuccess={handleSuccess}
                      parentId={mod._id}
                    >
                      <div className="flex items-center gap-1 text-blue-600 hover:text-blue-800 cursor-pointer">
                        <PlusIcon className="h-4 w-4" />
                        <span className="text-sm font-medium">Submodule</span>
                      </div>
                    </ModulesModal>
                  </div>
                </div>

                {/* Submodules */}
                {mod.submodules?.length > 0 && (
                  <ul className="ml-6 mt-2 list-disc space-y-1">
                    {mod.submodules.map((sub: any) => (
                      <li
                        key={sub._id}
                        className="flex items-center justify-between"
                      >
                        <span className="text-gray-700 text-sm">{sub.name}</span>
                        <ModulesModal
                          onSuccess={handleSuccess}
                          editMode
                          defaultValue={sub.name}
                          parentId={mod._id}
                          childId={sub._id}
                        >
                          <PencilSquareIcon className="h-4 w-4 text-gray-500 hover:text-blue-600 cursor-pointer" />
                        </ModulesModal>
                      </li>
                    ))}
                  </ul>
                )}
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
  );
}
