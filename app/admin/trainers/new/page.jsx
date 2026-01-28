"use client";

import CreateNewTrainerComponent from "@/components/CreateNewTrainer";
import { SidebarDemo } from "@/components/Sidebar-Demo";
import axios from "axios";
import { useRouter } from "next/navigation";
import React, { useLayoutEffect, useState } from "react";

const CreateNewTrainer = () => {
  const [user, setUser] = useState(null);
  const router = useRouter();

  const getUser = async () => {
    try {
      const response = await axios.get("/api/auth/me", {
        withCredentials: true,
      });
      //   console.log("response : ", response)
      if (response.status === 200) {
        if (response.data.user.role === "user") {
          router.replace("/unauthorized");
        }
        setUser(response.data.user);
      } else {
      }
    } catch (err) {
      router.push("/login");
      console.log(err);
    }
  };

  useLayoutEffect(() => {
    if (!user) {
      getUser();
    }
  }, []);
  if (!user) return null;
  return (
    <SidebarDemo user={user}>
      {" "}
      <CreateNewTrainerComponent />
    </SidebarDemo>
  );
};

export default CreateNewTrainer;
