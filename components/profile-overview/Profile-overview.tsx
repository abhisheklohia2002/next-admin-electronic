"use client";
import axios from "axios";
import React, { useEffect, useState } from "react";

export default function ProfileOverview({userId}:any) {
  const [moduleAccessBtn, setModuleAccessBtn] = useState(false);

  const handleAccept = async() => {
   try {
    const response = await axios.put(`http://localhost:8000/api/admin/module-approve/${userId}`,{status:'active'});
    console.log(response,'respnse accept')
    setModuleAccessBtn(false)
    window.dispatchEvent(new Event("userIdActive"));
   } catch (error) {
    console.error("Error accepting module access:", error);
   }
  };

  const getAccessModule = async () => {
    try {
      const response = await axios.get(
        `http://localhost:8000/api/admin/module-access/${userId}`,
      );

     
      const hasInactiveModule = response.data.data.some(
        (item: any) => item.status === "inactive"
      );
      setModuleAccessBtn(hasInactiveModule);
    } catch (error) {
      console.error("Error fetching module access:", error);
    }
  };

  useEffect(() => {
    getAccessModule();
  }, []);

  return (
    <>
      {moduleAccessBtn && (
        <div className="flex justify-start mt-4 gap-3">
          <button
            onClick={handleAccept}
            type="button"
            className="text-white bg-green-700 hover:bg-green-800 focus:outline-none 
                       focus:ring-4 focus:ring-green-300 font-medium rounded-full text-sm 
                       px-5 py-2.5 text-center dark:bg-green-600 dark:hover:bg-green-700 
                       dark:focus:ring-green-900"
          >
            Accept
          </button>

          <button
            type="button"
            className="text-white bg-red-700 hover:bg-red-800 focus:outline-none 
                       focus:ring-4 focus:ring-red-300 font-medium rounded-full text-sm 
                       px-5 py-2.5 text-center dark:bg-red-600 dark:hover:bg-red-700 
                       dark:focus:ring-red-900"
          >
            Reject
          </button>
        </div>
      )}
    </>
  );
}
