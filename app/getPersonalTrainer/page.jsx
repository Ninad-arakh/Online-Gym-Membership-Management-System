"use client";
import { SidebarDemo } from "@/components/Sidebar-Demo";
import { LoaderOne } from "@/components/ui/loader";
import axios from "axios";
import { useRouter } from "next/navigation";
import React, { useEffect, useState } from "react";
import ExpandableCardDemo from "@/components/expandable-card-demo-standard";
import { toast } from "sonner";
import TrainerTable from "@/components/trainer-table";
import UpdateModal from "@/components/UpdateModal";

const GetPersonalTrainer = () => {
  const [user, setUser] = useState(null);
  const [trainer, setTrainer] = useState([]);
  const router = useRouter();

  const getUser = async () => {
    try {
      const res = await axios.get("/api/auth/me", { withCredentials: true });
      if (res.status === 200) setUser(res.data.user);
    } catch {
      router.push("/login");
    }
  };

  const assignTrainer = async (trainerId) => {
    const weightInput = prompt("Enter your weight (kg)");
    const weightKg = Number(weightInput);

    if (!weightInput || isNaN(weightKg) || weightKg <= 0) {
      toast.error("Enter valid weight");
      return;
    }

    try {
      await axios.post(
        "/api/membership/assignTrainer",
        { trainerId, weightKg },
        { withCredentials: true },
      );
      toast.success("Trainer assigned");
      router.push("/dashboard");
    } catch (err) {
      toast.error(err.response?.data?.message || "Failed");
    }
  };

  useEffect(() => {
    getUser();
    axios.get("/api/trainers").then((res) => setTrainer(res.data));
  }, []);

  if (!user) return <LoaderOne />;

  return (
    <SidebarDemo user={user}>
      <UpdateModal />
      <div className="h-full w-full rounded-tl-2xl bg-linear-to-br from-[#f8fafc] via-[#f1f5f9] to-[#eef2ff] p-6 md:p-10">
        <h1 className="mb-6 text-3xl font-bold text-slate-800">
          Select Personal Trainer
        </h1>

        <TrainerTable trainers={trainer} onAssign={assignTrainer} user={user} />
      </div>
    </SidebarDemo>
  );
};

export default GetPersonalTrainer;
