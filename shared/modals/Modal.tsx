"use client";
import axios from "axios";
import React, { useEffect, useState } from "react";

interface ModulesModalProps {
  children: React.ReactNode;
  onSuccess?: () => void;
  parentId?: string;
  childId?: string;
  moduleId?: string;
  defaultValue?: string;
  editMode?: boolean;
}

export default function ModulesModal({
  children,
  onSuccess,
  parentId,
  childId,
  moduleId,
  defaultValue = "",
  editMode = false,
}: ModulesModalProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [name, setName] = useState(defaultValue);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    document.body.style.overflow = isOpen ? "hidden" : "auto";
  }, [isOpen]);

  const handleSave = async () => {
    if (!name.trim()) return alert("Please enter a name!");

    setLoading(true);
    try {
      if (editMode) {
        // 🟣 UPDATE mode
        const payload: any = { name };
        if (parentId && childId) {
          payload.parentId = parentId;
          payload.childId = childId;
        }

        await axios.put(
          `http://localhost:8000/api/admin/module/${moduleId || parentId}`,
          payload
        );
        alert(parentId ? "Submodule updated!" : "Module updated!");
      } else {
        // 🟢 CREATE mode
        const payload = parentId ? { name, parentId } : { name };
        await axios.post("http://localhost:8000/api/admin/module", payload);
        alert(parentId ? "Submodule added!" : "Module added!");
      }

      if (onSuccess) onSuccess();
      setIsOpen(false);
      setName("");
    } catch (error) {
      console.error("❌ Error:", error);
      alert("Error saving changes");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div>
      {/* Trigger */}
      <div onClick={() => setIsOpen(true)}>{children}</div>

      {isOpen && (
        <div className="fixed inset-0 z-50 flex justify-center items-center bg-black/50 backdrop-blur-sm">
          <div className="relative p-4 w-full max-w-md">
            <div className="bg-white rounded-lg shadow dark:bg-gray-800">
              <button
                onClick={() => setIsOpen(false)}
                className="absolute top-3 right-3 text-gray-400 hover:text-gray-800 dark:hover:text-white rounded-full p-1"
              >
                ✕
              </button>

              <div className="p-6 text-center">
                <h3 className="mb-4 text-lg font-semibold text-gray-800 dark:text-gray-200">
                  {editMode
                    ? parentId
                      ? "Edit Submodule"
                      : "Edit Module"
                    : parentId
                    ? "Add Submodule"
                    : "Add Module"}
                </h3>

                <input
                  type="text"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  placeholder="Enter name"
                  className="w-full mb-4 px-3 py-2 border border-gray-300 rounded-lg 
                             focus:outline-none focus:ring-2 focus:ring-blue-500 dark:bg-gray-700 dark:text-white"
                />

                <div className="flex justify-center gap-3">
                  <button
                    onClick={handleSave}
                    disabled={loading}
                    className="text-white bg-blue-600 hover:bg-blue-700 
                               focus:ring-4 focus:outline-none focus:ring-blue-300 
                               font-medium rounded-lg text-sm px-5 py-2.5 disabled:opacity-50"
                  >
                    {loading ? "Saving..." : editMode ? "Update" : "Save"}
                  </button>
                  <button
                    onClick={() => setIsOpen(false)}
                    className="py-2.5 px-5 text-sm font-medium text-gray-900 
                               bg-white rounded-lg border border-gray-300 
                               hover:bg-gray-100 hover:text-blue-700 dark:bg-gray-800 
                               dark:text-gray-300 dark:border-gray-600 dark:hover:text-white 
                               dark:hover:bg-gray-700"
                  >
                    Cancel
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
