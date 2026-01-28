"use client";

import Dashboard from "@/components/Dashboard";
import MemberDashboard from "@/components/MemberDashboard";
import { SidebarDemo } from "@/components/Sidebar-Demo";
import { LoaderOne } from "@/components/ui/loader";
import axios from "axios";
import Image from "next/image";
import { useRouter } from "next/navigation";
import React, { useEffect, useState } from "react";
import bgImg from "@/public/bgImg2.jpg"

const MainPage = () => {
  const [user, setUser] = useState(null);
  const router = useRouter();


  const getUser = async () => {
    try {
      const response = await axios.get("/api/auth/me", {
        withCredentials: true,
      });
      if (response.status === 200) {
        if(response.data.user.role === "admin"){
          router.replace("/admindashboard")
        }
        setUser(response.data.user);
      } else {
      }
    } catch (err) {
      router.push("/login");
    }
  };

  useEffect(() => {
    if (!user) getUser();
  }, []);

  if (!user) {
    return <LoaderOne />;
  } else {
    return (
      <div className="m-0 p-0 w-full bg-cover">
        <Image src={bgImg} alt="background" className="absolute -z-10 inset-0 object-cover h-full w-full"/>
        <SidebarDemo user={user}>
          <MemberDashboard user={user} />
        </SidebarDemo>
      </div>
    );
  }
};

export default MainPage;
