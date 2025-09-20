"use client";
import React from "react";
import {
  Card,
  Typography,
  List,
  ListItem,
  ListItemPrefix,
  ListItemSuffix,
  Chip,
  Accordion,
  AccordionHeader,
  AccordionBody,
} from "@material-tailwind/react";
import {
  PresentationChartBarIcon,
  ShoppingBagIcon,
  UserCircleIcon,
  Cog6ToothIcon,
  InboxIcon,
  PowerIcon,
} from "@heroicons/react/24/solid";
import { ChevronRightIcon, ChevronDownIcon } from "@heroicons/react/24/outline";
import Image from "next/image";

export function CustomSidebar() {
  const [open, setOpen] = React.useState(0);

  const handleOpen = (value: number) => {
    setOpen(open === value ? 0 : value);
  };

  return (
    <Card className="h-screen w-full max-w-[15rem] flex flex-col justify-between p-4 shadow-xl shadow-blue-gray-900/5">
      {/* 🔹 Logo Section */}
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

      {/* 🔹 Menu */}
      <div className="flex-1 overflow-y-auto">
        <List>
          {/* Dashboard */}
          <ListItem>
            <ListItemPrefix>
              <PresentationChartBarIcon className="h-5 w-5" />
            </ListItemPrefix>
            <Typography color="blue-gray" className="font-normal">
              Dashboard
            </Typography>
          </ListItem>

          {/* E-Commerce Accordion */}
          <Accordion
            open={open === 1}
            icon={
              <ChevronDownIcon
                strokeWidth={2.5}
                className={`mx-auto h-4 w-4 transition-transform ${
                  open === 1 ? "rotate-180" : ""
                }`}
              />
            }
          >
            <AccordionHeader
              onClick={() => handleOpen(1)}
              className="border-b-0 p-3"
            >
              <ListItemPrefix>
                <ShoppingBagIcon className="h-5 w-5" />
              </ListItemPrefix>
              <Typography color="blue-gray" className="mr-auto font-normal">
                E-Commerce
              </Typography>
            </AccordionHeader>
            <AccordionBody className="py-1 overflow-hidden">
              <List className="p-0">
                <ListItem className="pl-6">
                  <ListItemPrefix>
                    <ChevronRightIcon strokeWidth={3} className="h-3 w-5" />
                  </ListItemPrefix>
                  <Typography color="blue-gray" className="font-normal">
                    Orders
                  </Typography>
                </ListItem>
                <ListItem className="pl-6">
                  <ListItemPrefix>
                    <ChevronRightIcon strokeWidth={3} className="h-3 w-5" />
                  </ListItemPrefix>
                  <Typography color="blue-gray" className="font-normal">
                    Products
                  </Typography>
                </ListItem>
              </List>
            </AccordionBody>
          </Accordion>

          {/* Inbox */}
          <ListItem>
            <ListItemPrefix>
              <InboxIcon className="h-5 w-5" />
            </ListItemPrefix>
            <Typography color="blue-gray" className="font-normal">
              Inbox
            </Typography>
            <ListItemSuffix>
              <Chip
                value="14"
                size="sm"
                variant="ghost"
                color="blue-gray"
                className="rounded-full"
              />
            </ListItemSuffix>
          </ListItem>

          {/* Profile */}
          <ListItem>
            <ListItemPrefix>
              <UserCircleIcon className="h-5 w-5" />
            </ListItemPrefix>
            <Typography color="blue-gray" className="font-normal">
              Profile
            </Typography>
          </ListItem>

          {/* Settings */}
          <ListItem>
            <ListItemPrefix>
              <Cog6ToothIcon className="h-5 w-5" />
            </ListItemPrefix>
            <Typography color="blue-gray" className="font-normal">
              Settings
            </Typography>
          </ListItem>
        </List>
      </div>

      {/* 🔹 Logout */}
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
