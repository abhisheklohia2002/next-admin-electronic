"use client";
import CustomTable from "@/shared/custom-table/CustomTable";
import axios from "axios";
import React, { useEffect, useState } from "react";

export default function SalesContent() {
  const [sales, setSales] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  const getSales = async () => {
    try {
      const response: any = await axios.get(
        "http://localhost:8000/api/admin/sale"
      );
      console.log(response?.data?.cart, "response carts");
      setSales(response?.data?.cart || []);
    } catch (error: any) {
      console.error("Error fetching sales:", error.message);
    } finally {
      setLoading(false);
    }
  };
  let col = [
  { label: "Product Name", key: "title" },
  { label: "Price", key: "price" },
  { label: "Contact Details", key: "user.email" }, 
];


  useEffect(() => {
    getSales();
  }, []);

  if (loading) {
    return <span>Loading sales...</span>;
  }

  return (
    <div>
      <CustomTable
        data={sales}
        col={col}
        editActive={false}
      />
    </div>
  );
}
