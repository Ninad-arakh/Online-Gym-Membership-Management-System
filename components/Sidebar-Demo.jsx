"use client";
import React, { useState } from "react";
import { Sidebar, SidebarBody, SidebarLink } from "@/components/ui/sidebar";
import {
  IconArrowLeft,
  IconBarbellFilled,
  IconBrandTabler,
  IconCalendarEventFilled,
  IconHome,
  IconSchool,
  IconSettings,
  IconStretching,
  IconUserBolt,
} from "@tabler/icons-react";
import { motion } from "motion/react";
import { cn } from "@/lib/utils";
import axios from "axios";
import { useRouter } from "next/navigation";

export function SidebarDemo({ user, children }) {
  const router = useRouter();

  const logoutHandler = async () => {
    try {
      const res = await axios.post(
        "/api/auth/logout",
        {},
        { withCredentials: true },
      );
      if (res.status === 200) {
        router.replace("/login");
      }
    } catch (err) {}
  };

  const links = [
    ...(user?.role !== "admin"
      ? [
          {
            label: "Home",
            href: "/",
            icon: <IconHome className="h-5 w-5 shrink-0 text-[#312D3F]" />,
          },
        ]
      : []),
    {
      label: "Dashboard",
      href: "/admindashboard",
      icon: <IconBrandTabler className="h-5 w-5 shrink-0 text-[#312D3F]" />,
    },
    {
      label: "Membership Plans",
      href: "/membership/plan",
      icon: (
        <IconCalendarEventFilled className="h-5 w-5 shrink-0 text-[#312D3F]" />
      ),
    },

    {
      label: "Trainers",
      href: "/getPersonalTrainer",
      icon: <IconStretching className="h-5 w-5 shrink-0 text-[#312D3F]" />,
    },

    {
      label: "Logout",
      href: "#",
      icon: <IconArrowLeft className="h-5 w-5 shrink-0 text-[#312D3F]" />,
      onClick: logoutHandler,
    },
  ];

  // const filteredLinks = user?.role === "admin" ? links : links.slice(1);
  const [open, setOpen] = useState(false);

  return (
    <div
      className={cn(
        "mx-auto flex w-full  flex-1 flex-col overflow-hidden md:flex-row dark:border-neutral-700 dark:bg-neutral-800",
        // for your use case, use `h-screen` instead of `h-[60vh]`
        "h-screen relative",
      )}
    >
      <Sidebar open={open} setOpen={setOpen} animate={true}>
        <SidebarBody className="justify-between gap-10 bg-linear-to-br from-[#e9f0f9] to-[#dad6fc]">
          <div className="flex flex-1 flex-col overflow-x-hidden overflow-y-auto ">
            <>
              <Logo />
            </>
            <div className="mt-8 flex flex-col gap-2">
              {links.map((link, idx) => (
                <SidebarLink key={idx} link={link} />
              ))}
            </div>
          </div>
          <div>
            <SidebarLink
              link={{
                label: user?.name,
                href: "#",
                icon: (
                  <img
                    src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSaRRNg_Yfepi2REx99RFzM9KSdK22jHvIs2zyg6DIEC_uNEujeMxotbQETIhczfdL6vwEl2pyWAFZTdWAGm9kzudY&s&ec=121528435"
                    className="h-7 w-7 shrink-0 rounded-full text-[#312D3F]"
                    width={50}
                    height={50}
                    alt="Avatar"
                  />
                ),
              }}
            />
          </div>
        </SidebarBody>
      </Sidebar>

      {children}
    </div>
  );
}
export const Logo = () => {
  return (
    <a
      href="/"
      className="relative z-20 flex items-center space-x-2 py-1 text-sm font-normal text-[#312D3F]"
    >
      <motion.span
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        className="font-semibold  whitespace-pre text-[#312D3F] flex items-center text-2xl"
      >
        <IconBarbellFilled /> Gym Management
      </motion.span>
    </a>
  );
};
export const LogoIcon = () => {
  return (
    <a
      href="#"
      className="relative z-20 flex items-center space-x-2 py-1 text-sm font-medium text-[#312D3F]"
    >
      <div className="h-5 w-6 shrink-0 rounded-tl-lg rounded-tr-sm rounded-br-lg rounded-bl-sm bg-[#312D3F] dark:bg-white" />
    </a>
  );
};
