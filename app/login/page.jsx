"use client"
import React, { useEffect, useLayoutEffect } from "react";
import SignupFormDemo from "@/components/Signup-form-demo";
import bgImg from "@/public/bgImg.jpg";
import Image from "next/image";
import { useRouter } from "next/navigation";
import axios from "axios";

const LoginPage = () => {
  const router = useRouter()

    const getUser = async () => {
      try{
        const response = await axios.get("/api/auth/me", {withCredentials: true})
        if(response.status === 200){
          router.push("/")
        }
      } catch(err){
        console.log(err)
      }
    }
  
    useLayoutEffect(() => {
      getUser()
    }, []);

  return (
    <div className="w-full h-screen flex items-center relative">
      <Image
        src={bgImg}
        alt="Background"
        fill
        className="object-cover -z-20 "
        priority
      />
      <div className="absolute w-full h-full bg-black/10 -z-10"></div>
      <SignupFormDemo />
    </div>
  );
};

export default LoginPage;
