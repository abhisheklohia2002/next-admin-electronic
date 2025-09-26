import { Checkbox } from "@material-tailwind/react";
import { useRouter } from "next/navigation";
import React from "react";

function getNestedValue(obj: any, path: string) {
  return path.split(".").reduce((acc, part) => acc && acc[part], obj);
}

export default function CustomTable({
  data,
  col,
  editActive,
  id,
  handleCheckboxChange,
  module,
}: any) {
  const router = useRouter();

  const handleRedirect = (id: any) => {
    switch (module) {
      case "roles":
        return router.push(`/roles/edit/${id}`);
      case "profiles":
        return router.push(`/profile/edit/${id}`);
    }
  };

  return (
    <div>
      <div className="relative overflow-x-auto shadow-md sm:rounded-lg">
        <table className="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
          <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
            <tr>
              {col?.map((elem: any, index: number) => (
                <th key={index} scope="col" className="px-6 py-3">
                  {elem.label}
                </th>
              ))}
              {editActive && !id && (
                <th scope="col" className="px-6 py-3">
                  <span className="sr-only">Edit</span>
                </th>
              )}
            </tr>
          </thead>
          <tbody>
            {data?.map((row: any, index: number) => (
              <tr
                key={index}
                className="bg-[#f3f7f7] border-b dark:border-gray-700 border-gray-200"
              >
                {col?.map((header: any, colIndex: number) => (
                  <td key={colIndex} className="px-6 py-4">
                    {header?.checkbox ? (
                      <Checkbox
                        checked={!!getNestedValue(row, header.key)}
                        onChange={(e) =>
                          id &&
                          handleCheckboxChange?.(
                            row._id,
                            header.key,
                            e.target.checked
                          )
                        }
                        readOnly={!id}
                      />
                    ) : (
                      getNestedValue(row, header.key) ?? "-"
                    )}
                  </td>
                ))}
                {editActive && !id && (
                  <td className="px-6 py-4 text-right">
                    <button
                      onClick={() => handleRedirect(row?._id)}
                      className="font-medium text-blue-600 dark:text-blue-500 hover:underline"
                    >
                      Edit
                    </button>
                  </td>
                )}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
