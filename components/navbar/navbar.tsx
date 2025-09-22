"use client";
import React, { useState, useEffect } from "react";
import {
  Navbar,
  IconButton,
  Menu,
  MenuHandler,
  MenuList,
  MenuItem,
  Avatar,
  Typography,
} from "@material-tailwind/react";
import SearchBar from "@/lib/common/SearchBar";
import { useRouter } from "next/navigation";

export function StickyNavbar() {
  const [openNav, setOpenNav] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [user, setUser] = useState("");
  const router = useRouter()
  const authUser = () => {
    const token = localStorage.getItem("token");
    if (token) {
      const email = localStorage.getItem("email") || "";
      setUser(email);
    }
  };
  const handleLogout = ()=>{
    localStorage.clear();
     window.location.href = "/login";
  }
  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth >= 960) setOpenNav(false);
    };

    window.addEventListener("resize", handleResize);
    window.addEventListener("login", authUser);
    authUser();

    return () => {
      window.removeEventListener("resize", handleResize);
      window.removeEventListener("login", authUser);
    };
  }, []);

  return (
    <Navbar className="sticky top-0 z-10 h-max max-w-full rounded-none px-4 py-2 lg:px-8 lg:py-4 shadow-md">
      <div className="flex items-center justify-between w-full">
        {/* 🔎 Global Search */}
        <div className="flex-1 px-4">
          <SearchBar />
        </div>

        {/* 👤 User Menu */}
        <Menu open={isMenuOpen} handler={setIsMenuOpen}>
          <MenuHandler>
            <div className="flex items-center gap-2 cursor-pointer">
              <Avatar
                src="https://i.pravatar.cc/40"
                alt="user avatar"
                size="sm"
              />
              {user && (
                <span style={{
                  color:"red"
                }}>
                  {user}
                </span>
                // <Typography variant="h3" color="blue-gray">
                //   {user}
                // </Typography>
              )}
            </div>
          </MenuHandler>
          <MenuList>
            <MenuItem>Profile</MenuItem>
            <MenuItem>Settings</MenuItem>
            <MenuItem
            onClick={handleLogout}
            >Logout</MenuItem>
          </MenuList>
        </Menu>

        {/* 📱 Mobile toggle */}
        <IconButton
          variant="text"
          className="ml-2 h-6 w-6 text-inherit hover:bg-transparent focus:bg-transparent active:bg-transparent lg:hidden"
          ripple={false}
          onClick={() => setOpenNav(!openNav)}
        >
          {openNav ? (
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              className="h-6 w-6"
              viewBox="0 0 24 24"
              stroke="currentColor"
              strokeWidth={2}
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M6 18L18 6M6 6l12 12"
              />
            </svg>
          ) : (
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-6 w-6"
              fill="none"
              stroke="currentColor"
              strokeWidth={2}
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M4 6h16M4 12h16M4 18h16"
              />
            </svg>
          )}
        </IconButton>
      </div>
    </Navbar>
  );
}
