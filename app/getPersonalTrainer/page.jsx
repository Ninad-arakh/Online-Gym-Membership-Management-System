"use client";
import { SidebarDemo } from "@/components/Sidebar-Demo";
import { LoaderOne } from "@/components/ui/loader";
// import { ExpandableCard } from "@/components/ui/expandable-card";
import axios from "axios";
import { useRouter } from "next/navigation";
import React, { useEffect, useState } from "react";
import ExpandableCardDemo from "@/components/expandable-card-demo-standard";
import { toast } from "sonner";

const GetPersonalTrainer = () => {
  const [user, setUser] = useState(null);
  const [trainer, setTrainer] = useState([]);
  const router = useRouter();

  const getUser = async () => {
    try {
      const response = await axios.get("/api/auth/me", {
        withCredentials: true,
      });
      if (response.status === 200) {
        setUser(response.data.user);
      }
    } catch (err) {
      router.push("/login");
    }
  };

  const assignTrainer = async (trainerId) => {
    try {
      const response = await axios.post(
        "/api/membership/assignTrainer",
        { trainerId },
        { withCredentials: true },
      );

      if (response.status === 200) {
        toast.success("Trainer assigned successfully");
        router.push("/dashboard"); // or wherever you want
      }
    } catch (err) {
      const message = err.response?.data?.message || "Something went wrong";
      toast.error(message || "Something went wrong!");
    }
  };

  const getTrainers = async () => {
    try {
      const response = await axios.get("/api/trainers");
      if (response.status === 200) {
        setTrainer(response.data);
      }
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    if (!user) getUser();
    getTrainers();
  }, []);

  if (!user) return <LoaderOne />;

  return (
    <SidebarDemo user={user}>
      <div className="flex h-full w-full flex-col gap-6 rounded-tl-2xl bg-linear-to-br from-black via-red-600/70 to-black p-4 md:p-10  items-center">
        <h1 className="text-2xl md:text-3xl font-bold text-white ">
          Choose Your Personal Trainer
        </h1>

        <ExpandableCardDemo
          cards={trainer.map((t) => ({
            title: t.name,
            description: `${t.experienceYears} yrs experience • ${t.age ?? "—"} yrs • ${t.gender}`,
            onAction: () => assignTrainer(t._id),
            content: (
              <>
                <div className="flex flex-wrap gap-2">
                  {t.specialization.map((skill) => (
                    <span
                      key={skill}
                      className="rounded-full bg-white/10 px-3 py-1 text-sm"
                    >
                      {skill}
                    </span>
                  ))}
                </div>

                <div className="grid grid-cols-2 md:grid-cols-3 gap-4 text-sm">
                  <div className="rounded-lg bg-white/5 p-3">
                    <p className="text-neutral-400">Experience</p>
                    <p className="font-semibold">{t.experienceYears} Years</p>
                  </div>

                  <div className="rounded-lg bg-white/5 p-3">
                    <p className="text-neutral-400">Age</p>
                    <p className="font-semibold">
                      {typeof t.age === "number" ? `${t.age} Years` : "—"}
                    </p>
                  </div>

                  <div className="rounded-lg bg-white/5 p-3">
                    <p className="text-neutral-400">Gender</p>
                    <p className="font-semibold capitalize">{t.gender}</p>
                  </div>
                </div>
              </>
            ),
          }))}
        />
      </div>
    </SidebarDemo>
  );
};

export default GetPersonalTrainer;
