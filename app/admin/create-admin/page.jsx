"use client";

import CreateNewAdminComponent from "@/components/CreateNewAdminComponent";
import { SidebarDemo } from "@/components/Sidebar-Demo";
import axios from "axios";
import { useRouter } from "next/navigation";
import React, { useLayoutEffect, useState } from "react";

const CreateNewAdmin = () => {
  const [user, setUser] = useState(null);
  const router = useRouter();

  const getUser = async () => {
    try {
      const response = await axios.get("/api/auth/me", {
        withCredentials: true,
      });

      if (response.status === 200) {
        if (response.data.user.role !== "admin") {
          router.replace("/unauthorized");
          return;
        }
        setUser(response.data.user);
      }
    } catch (err) {
      router.push("/login");
    }
  };

  useLayoutEffect(() => {
    if (!user) getUser();
  }, []);

  if (!user) return null;

  return (
    <SidebarDemo user={user}>
      <CreateNewAdminComponent />
    </SidebarDemo>
  );
};

export default CreateNewAdmin;
