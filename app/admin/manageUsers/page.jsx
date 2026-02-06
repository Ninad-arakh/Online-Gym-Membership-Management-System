"use client";
import { SidebarDemo } from "@/components/Sidebar-Demo";
import AdminUsersCards from "@/components/UserDetails";
import axios from "axios";
import { useRouter } from "next/navigation";
import React, { useEffect, useState } from "react";

const page = () => {
  const [user, setUser] = useState(null);
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const router = useRouter();

  const getUser = async () => {
    try {
      const response = await axios.get("/api/auth/me", {
        withCredentials: true,
      });

      if (response.data.user.role === "user") {
        router.replace("/unauthorized");
        return;
      }

      setUser(response.data.user);
    } catch (err) {
      router.push("/login");
    }
  };

  useEffect(() => {
    getUser();
  }, []);

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const res = await axios.get("/api/admin/users");
        setUsers(res.data.users);
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    };
    fetchUsers();
  }, []);

  if (loading) {
    return <p className="text-white p-6">Loading users...</p>;
  }

  return (
    <SidebarDemo user={user}>
      <div className="flex h-full w-full flex-col gap-6 rounded-tl-2xl bg-linear-to-br from-black via-red-600/70 to-black p-4 md:p-10  items-center">
        <h1 className="text-2xl font-bold text-white mb-6">
          Users
        </h1>

        <AdminUsersCards users={users} />
      </div>
    </SidebarDemo>
  );
};

export default page;


/* 
  what i need to create
  a list of users
  when clicked on a user his details should be shown 
    like : his name, active plans, payment history, date purchased, trainer assigned
    with the help of aceternity expandable card


*/
