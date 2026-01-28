"use client";
import { IconExclamationCircle } from "@tabler/icons-react";
import Link from "next/link";
import React, { useState } from "react";

const Unauthorized = () => {
  return (
    <div className="w-full h-screen bg-slate-900/30 flex justify-center items-center">
      <div className="mx-2 md:mx-0 md:w-4/12 h-[40vh] rounded-xl md:mt-0 -mt-30 no-scrollbar overflow-scroll gap-5 bg-neutral-300 flex flex-col p-10 justify-center items-center">
        <IconExclamationCircle className="text-red-500 animate-bounce w-20 h-20" />
        <h2 className="text-5xl text-black font-semibold mb-3 ">Unauthorized Access!</h2>
        <Link
          href={"/"}
          className="px-6 py-3 bg-gray-600 text-white text-xl font-semibold cursor-pointer rounded-xl "
        >
          Home
        </Link>
      </div>
    </div>
    
  );
};

export default Unauthorized;
