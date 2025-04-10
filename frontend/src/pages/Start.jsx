import React from 'react'
import { IoArrowForward } from "react-icons/io5";
import { Link } from 'react-router-dom';
const Start = () => {



  return (
    <div>
      <div className='bg-[url(/background.avif)] bg-cover bg-no-repeat bg-top  h-screen pt-8  w-full  flex justify-between flex-col'>
        <img className='w-24 ml-8 invert
-0 ' src="/Uber.png" alt="" />
        <div className='bg-white py-5 px-3 pb-7'>
          <h1 className='text-2xl font-bold  '>Get started with Uber</h1>
          <Link to='/login' className='flex items-center justify-center w-full bg-black text-white py-3 rounded-lg mt-5 '>Continue <IoArrowForward size={30} /></Link>
        </div>
      </div>
    </div>
  )
}

export default Start
