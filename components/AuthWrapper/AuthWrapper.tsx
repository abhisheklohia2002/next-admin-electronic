"use client";

import { useEffect, useState } from "react";
import SideBarStructure from "@/shared/sidebar/Sidebar";
import Login from "@/app/login/page";
import PrivateRoute from "../privateRoutes/PrivateRoutes";

export default function AuthWrapper() {
  const [token, setToken] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);

  const handleLogin = () => {
    const storedToken = localStorage.getItem("token");
    setToken(storedToken);
  };

  useEffect(() => {
    const storedToken = localStorage.getItem("token");
    setToken(storedToken);
    setLoading(false); 
    window.addEventListener("login", handleLogin);

    return () => {
      window.removeEventListener("login", handleLogin);
    };
  }, []);

  if (loading) {
    return <p>Loading...</p>; 
  }

  return token ? (
    <PrivateRoute>
      <SideBarStructure title="Dashboard">Dashboard Body</SideBarStructure>
    </PrivateRoute>
  ) : (
    <Login />
  );
}
