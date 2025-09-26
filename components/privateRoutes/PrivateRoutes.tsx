"use client";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import axios from "axios";

export default function PrivateRoute({
  children,
}: {
  children: React.ReactNode;
}) {
  const router = useRouter();
  const [loading, setLoading] = useState(true);

  const checkAuth = async () => {
    const token = localStorage.getItem("token");
    const userId = localStorage.getItem("userId");
    if (!token) {
      router.push("/login");
      return;
    }

    try {
      const res: any = await axios.post(
        "http://localhost:8000/api/admin/profile",
        { userId },
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );
      if (res?.user?._id) {
        router.push("/dashboard");
      }

      setLoading(false);
    } catch (error: any) {
      if (error.response?.status === 401) {
        router.push("/login");
      } else {
        console.error("Auth check failed:", error);
        router.push("/login");
      }
    }
  };

  useEffect(() => {
    checkAuth();

    // also listen for storage changes
    const handleStorage = () => {
      checkAuth();
    };

    window.addEventListener("storage", handleStorage);

    return () => {
      window.removeEventListener("storage", handleStorage);
    };
  }, [router]);

  if (loading) return <p>Loading...</p>;
  return <>{children}</>;
}
