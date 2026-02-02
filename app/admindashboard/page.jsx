"use client"
import Dashboard from '@/components/Dashboard'
import { SidebarDemo } from '@/components/Sidebar-Demo'
import axios from 'axios'
import { useRouter } from 'next/navigation'
import React, { useLayoutEffect, useState } from 'react'

const AdminDashboard = () => {
  const [user, setUser] = useState(null)
  const router = useRouter()

    const getUser = async () => {
      try {
        const response = await axios.get("/api/auth/me", {
          withCredentials: true,
        });
        if (response.status === 200) {
          if(response.data.user.role === "user"){
            router.replace("/unauthorized")
          }
          setUser(response.data.user);
        } else {
        }
      } catch (err) {
        router.push("/login");
        console.log(err);
      }
    };

  useLayoutEffect(() =>{
    if(!user){
      getUser()
    }
  },[])
  return (
    <SidebarDemo>
      <Dashboard/>
    </SidebarDemo>
  )
}

export default AdminDashboard