"use client";
import { useRouter, usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import axios from "axios";

export default function PrivateRoute({ children }: { children: React.ReactNode }) {
  const router = useRouter();
  const pathname:any = usePathname();
  const [loading, setLoading] = useState(true);

  const checkAuthAndAccess = async () => {
    const token = localStorage.getItem("token");
    const userId = localStorage.getItem("userId");

    // 🔒 Step 1: Check Authentication
    if (!token || !userId) {
      router.push("/login");
      return;
    }

    try {
      // ✅ Step 2: Validate Token (existing behavior)
      const profileRes: any = await axios.post(
        "http://localhost:8000/api/admin/profile",
        { userId },
        { headers: { Authorization: `Bearer ${token}` } }
      );

      if (!profileRes?.data?.user?._id) {
        router.push("/login");
        return;
      }

      // 🟢 Dispatch event so sidebar refreshes
      window.dispatchEvent(new Event("userIdActive"));

      // ✅ Step 3: Check module-level access
      const accessRes = await axios.get(
        `http://localhost:8000/api/admin/module-access/${userId}`,
        { headers: { "Content-Type": "application/json" } }
      );

      const accessData = accessRes?.data?.data || [];

      // Map route → module name from your system
      const routeMap: Record<string, string> = {
        "/profile": "MP Profile",
        "/sales": "MP Sales",
        "/orders": "E-Commerce",
        "/products": "E-Commerce",
        // "/master/system-settings": "Masters",
      };

      const moduleName:any = routeMap[pathname];

      if (
        pathname === "/dashboard" || 
        !moduleName ||
        accessData.some(
          (m: any) => m.moduleName === moduleName && m.status === "active"
        )
      ) {
        setLoading(false);
        return; // Authorized
      }

      // ❌ No access → redirect
      router.push("/no-access");
    } catch (error: any) {
      console.error("Auth or access check failed:", error);
      router.push("/login");
    }
  };

  useEffect(() => {
    checkAuthAndAccess();

    // also listen for storage changes
    const handleStorage = () => {
      checkAuthAndAccess();
    };

    window.addEventListener("storage", handleStorage);

    return () => {
      window.removeEventListener("storage", handleStorage);
    };
  }, [router, pathname]);

  if (loading) return <p>Loading...</p>;
  return <>{children}</>;
}
