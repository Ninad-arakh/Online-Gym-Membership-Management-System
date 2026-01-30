"use client";
import React, { useState } from "react";
import { Sidebar, SidebarBody, SidebarLink } from "@/components/ui/sidebar";
import {
  IconArrowLeft,
  IconBarbellFilled,
  IconBrandTabler,
  IconCalendarEventFilled,
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
    {
      label: "Dashboard",
      href: "/admindashboard",
      icon: <IconBrandTabler className="h-5 w-5 shrink-0 text-neutral-200" />,
    },
    {
      label: "Membership Plans",
      href: "/membership/plan",
      icon: (
        <IconCalendarEventFilled className="h-5 w-5 shrink-0 text-neutral-200" />
      ),
    },
    // {
    //   label: "Members",
    //   href: "#",
    //   icon: <IconUserBolt className="h-5 w-5 shrink-0 text-neutral-200" />,
    // },
    // {
    //   label: "Classes",
    //   href: "#",
    //   icon: <IconSchool className="h-5 w-5 shrink-0 text-neutral-200" />,
    // },
    {
      label: "Trainers",
      href: "/getPersonalTrainer",
      icon: <IconStretching className="h-5 w-5 shrink-0 text-neutral-200" />,
    },
    // {
    //   label: "Settings",
    //   href: "#",
    //   icon: <IconSettings className="h-5 w-5 shrink-0 text-neutral-200" />,
    // },
    {
      label: "Logout",
      href: "#",
      icon: <IconArrowLeft className="h-5 w-5 shrink-0 text-neutral-200" />,
      onClick: logoutHandler,
    },
  ];

  // const filteredLinks = user?.role === "admin" ? links : links.slice(1);
  const [open, setOpen] = useState(false);

  return (
    <div
      className={cn(
        "mx-auto flex w-full  flex-1 flex-col overflow-hidden bg-red-500/10 md:flex-row dark:border-neutral-700 dark:bg-neutral-800",
        // for your use case, use `h-screen` instead of `h-[60vh]`
        "h-screen relative",
      )}
    >
      <Sidebar open={open} setOpen={setOpen} animate={true}>
        <SidebarBody className="justify-between gap-10 bg-linear-to-br from-slate-900 via-red-600 to-slate-900 ">
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
                    src="https://assets.aceternity.com/manu.png"
                    className="h-7 w-7 shrink-0 rounded-full text-white"
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
      className="relative z-20 flex items-center space-x-2 py-1 text-sm font-normal text-black"
    >
      <motion.span
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        className="font-medium whitespace-pre text-white flex items-center"
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
      className="relative z-20 flex items-center space-x-2 py-1 text-sm font-normal text-black"
    >
      <div className="h-5 w-6 shrink-0 rounded-tl-lg rounded-tr-sm rounded-br-lg rounded-bl-sm bg-black dark:bg-white" />
    </a>
  );
};
