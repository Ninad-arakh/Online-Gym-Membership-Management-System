"use client"
import axios from 'axios'
import React from 'react'

const mainPage = () => {

  
  return (
    <div className=' flex justify-center items-center w-full flex-col h-[40vh] gap-5'>
      <h1 className='text-center flex text-5xl'>gold membership</h1>
      <button onClick={() => handlePayment() } className='px-7 py-3 hover:animate-pulse rounded-xl bg-blue-400 cursor-pointer'>Make Payment</button>
    </div>
  )
}

export default mainPage