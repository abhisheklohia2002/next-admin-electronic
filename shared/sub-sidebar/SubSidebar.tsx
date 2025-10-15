"use client";
import React from "react";
import {
  Card,
  Typography,
  List,
  ListItem,
  ListItemPrefix,
} from "@material-tailwind/react";
import {
  ChartPieIcon,       
  IdentificationIcon, 
  BriefcaseIcon,      
  PuzzlePieceIcon,
} from "@heroicons/react/24/solid";
import { useRouter } from "next/navigation";

export function CustomSubSidebar({id}:any) {
  const router = useRouter();

  const menuItems = [
    {
      label: "Overview",
      icon: <ChartPieIcon className="h-5 w-5" />,
      path: `/profile/edit/${id}/overview`,
    },
    {
      label: "Basic Information",
      icon: <IdentificationIcon className="h-5 w-5" />,
      path: `/profile/edit/${id}/basic-info`,
    },
    {
      label: "Job Information",
      icon: <BriefcaseIcon className="h-5 w-5" />,
      path: `/profile/edit/${id}/job-info`,
    },
    {
      label: "Module & SubModule",
      icon: <PuzzlePieceIcon className="h-5 w-5" />,
      path: `/profile/edit/${id}/modules`,
    },
  ];

  const handleRedirect = (path: string) => {
    router.push(path);
  };

  return (
    <Card className="h-[18rem] flex flex-col justify-between p-4 shadow-xl shadow-blue-gray-900/5">
      <div className="flex-1 overflow-y-auto">
        <List>
          {menuItems.map((item, index) => (
            <ListItem className="flex items-center cursor-pointer" key={index} onClick={() => handleRedirect(item.path)}>
              <ListItemPrefix>{item.icon}</ListItemPrefix>
              <Typography color="blue-gray" className="font-normal text-sm">
                {item.label}
              </Typography>
            </ListItem>
          ))}
        </List>
      </div>
    </Card>
  );
}
