"use client";
import React, { useEffect, useState } from "react";
import {
  Card,
  Typography,
  List,
  ListItem,
  ListItemPrefix,
  Accordion,
  AccordionHeader,
  AccordionBody,
} from "@material-tailwind/react";
import {
  PresentationChartBarIcon,
  PowerIcon,
  ArchiveBoxIcon,
} from "@heroicons/react/24/solid";
import { ChevronRightIcon, ChevronDownIcon } from "@heroicons/react/24/outline";
import Image from "next/image";
import { RiMoneyDollarCircleFill } from "react-icons/ri";
import { useRouter } from "next/navigation";
import axios from "axios";
const menuItems = [
  {
    label: "Dashboard",
    icon: <PresentationChartBarIcon className="h-5 w-5" />,
    path: "/dashboard",
  },
  { label: "MP Profile", icon: null, path: "/profile" },
  {
    label: "MP Sales",
    icon: <RiMoneyDollarCircleFill className="h-5 w-5" />,
    path: "/sales",
  },
];

const accordionItems = [
  {
    label: "E-Commerce",
    icon: null,
    children: [
      { label: "Orders", path: "/orders" },
      { label: "Products", path: "/products" },
    ],
  },
  {
    label: "masters",
    icon: <ArchiveBoxIcon className="h-5 w-5" />,
    children: [{ label: "System Settings", path: "/master/system-settings" }],
  },
];

export function CustomSidebar() {
  const [open, setOpen] = useState<number | null>(null);
  const [accessData, setAccessData] = useState<any[]>([]);
  const router = useRouter();
  
  const handleUserActive = async () => {
    const userId = localStorage.getItem("userId");
    if (!userId) return;
    try {
      const res = await axios.get(
        `http://localhost:8000/api/admin/module-access/${userId}`,
        { headers: { "Content-Type": "application/json" } }
      );
      if (res?.data?.data) {
        console.log("✅ Module Access:", res.data.data);
        setAccessData(res.data.data);
      }
    } catch (err) {
      console.error("❌ Error fetching module access:", err);
    }
  };

  useEffect(() => {
    handleUserActive();
    window.addEventListener("userIdActive", handleUserActive);
    return () => window.removeEventListener("userIdActive", handleUserActive);
  }, []);

  const isModuleActive = (moduleName: string) => {
    const mod = accessData.find((m) => m.moduleName === moduleName);
    return mod?.status === "active";
  };

  const handleOpen = (index: number) =>
    setOpen(open === index ? null : index);

  const handleRedirect = (path: string) => router.push(path);

  return (
    <Card className="h-screen w-full max-w-[15rem] flex flex-col justify-between p-4 shadow-xl shadow-blue-gray-900/5">
      {/* Logo Section */}
      <div className="mb-4 flex items-center space-x-3 p-4">
        <Image
          src={"/images/a-icons.png"}
          width={40}
          height={40}
          alt="logo"
          className="rounded-full"
        />
        <Typography variant="h6" color="blue-gray">
          Electronics
        </Typography>
      </div>

      {/* Menu Section */}
      <div className="flex-1 overflow-y-auto">
        <List>
          {/* 🟢 Always show Dashboard */}
          <ListItem onClick={() => handleRedirect("/dashboard")}>
            <ListItemPrefix>
              <PresentationChartBarIcon className="h-5 w-5" />
            </ListItemPrefix>
            <Typography color="blue-gray" className="font-normal">
              Dashboard
            </Typography>
          </ListItem>

          {menuItems
            .filter(
              (item) =>
                item.label !== "Dashboard" && isModuleActive(item.label)
            )
            .map((item, i) => (
              <ListItem key={i} onClick={() => handleRedirect(item.path)}>
                {item.icon && <ListItemPrefix>{item.icon}</ListItemPrefix>}
                <Typography color="blue-gray" className="font-normal">
                  {item.label}
                </Typography>
              </ListItem>
            ))}

          {accordionItems
            .filter((acc) => isModuleActive(acc.label))
            .map((acc, index) => (
              <Accordion
                key={index}
                open={open === index}
                icon={
                  <ChevronDownIcon
                    strokeWidth={2.5}
                    className={`mx-auto h-4 w-4 transition-transform ${
                      open === index ? "rotate-180" : ""
                    }`}
                  />
                }
              >
                <AccordionHeader
                  onClick={() => handleOpen(index)}
                  className="border-b-0 p-3"
                >
                  {acc.icon && <ListItemPrefix>{acc.icon}</ListItemPrefix>}
                  <Typography color="blue-gray" className="mr-auto font-normal">
                    {acc.label}
                  </Typography>
                </AccordionHeader>
                <AccordionBody className="py-1 overflow-hidden">
                  <List className="p-0">
                    {acc.children.map((child, ci) => (
                      <ListItem
                        key={ci}
                        className="pl-6"
                        onClick={() => handleRedirect(child.path)}
                      >
                        <ListItemPrefix>
                          <ChevronRightIcon
                            strokeWidth={3}
                            className="h-3 w-5"
                          />
                        </ListItemPrefix>
                        <Typography color="blue-gray" className="font-normal">
                          {child.label}
                        </Typography>
                      </ListItem>
                    ))}
                  </List>
                </AccordionBody>
              </Accordion>
            ))}
        </List>
      </div>

      {/* Logout Section */}
      <div className="border-t pt-4">
        <List>
          <ListItem>
            <ListItemPrefix>
              <PowerIcon className="h-5 w-5 text-red-500" />
            </ListItemPrefix>
            <Typography color="red" className="font-normal">
              Log Out
            </Typography>
          </ListItem>
        </List>
      </div>
    </Card>
  );
}
