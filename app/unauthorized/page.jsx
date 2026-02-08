"use client";
import { IconExclamationCircle } from "@tabler/icons-react";
import Link from "next/link";
import React, { useState } from "react";

const Unauthorized = () => {
  return (
    <div className="w-full h-screen bg-linear-to-br from-[#f1f0f8] via-[#eeccf7]/40 to-[#ccecfd] flex justify-center items-center">
      <div className="mx-2 md:mx-0 md:w-4/12 h-[40vh] rounded-xl md:mt-0 -mt-30 no-scrollbar overflow-scroll gap-5 bg-linear-to-br from-[#ffbea8] via-[#fff6f1] flex flex-col p-10 justify-center items-center border shadow-lg">
        <IconExclamationCircle className="text-red-500 animate-bounce w-20 h-20" />
        <h2 className="text-5xl text-black font-semibold mb-3 ">Unauthorized Access!</h2>
        <Link
          href={"/"}
          className="px-6 py-3 bg-green-500 shadow-md text-white text-xl font-semibold cursor-pointer rounded-xl hover:shadow-lg hover:scale-105 transition-all duration-200 ease-in-out "
        >
          Home
        </Link>
      </div>
    </div>
    
  );
};

export default Unauthorized;
