"use client";
import { SidebarDemo } from "@/components/Sidebar-Demo";
import AdminUsersTable from "@/components/UserDetails";
import axios from "axios";
import { useRouter } from "next/navigation";
import React, { useEffect, useState } from "react";

const Page = () => {
  const [user, setUser] = useState(null);
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const router = useRouter();

  const getUser = async () => {
    try {
      const res = await axios.get("/api/auth/me", { withCredentials: true });
      if (res.data.user.role === "user") {
        router.replace("/unauthorized");
        return;
      }
      setUser(res.data.user);
    } catch {
      router.push("/login");
    }
  };

  useEffect(() => {
    getUser();
    axios.get("/api/admin/users").then((res) => {
      setUsers(res.data.users);
      setLoading(false);
    });
  }, []);

  if (loading) return <p className="p-6">Loading users…</p>;

  return (
    <SidebarDemo user={user}>
      <div className="h-full w-full rounded-tl-2xl bg-linear-to-br from-[#f8fafc] via-[#f1f5f9] to-[#eef2ff] p-6 md:p-10">
        <h1 className="mb-6 text-3xl font-bold text-slate-800">
          Users
        </h1>

        <AdminUsersTable users={users} />
      </div>
    </SidebarDemo>
  );
};

export default Page;
