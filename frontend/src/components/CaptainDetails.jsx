import React, { useEffect } from 'react'
import { IoMdSpeedometer } from "react-icons/io";
import { RiBillLine } from "react-icons/ri";
import { MdOutlineSpeed } from "react-icons/md";
import { useDispatch, useSelector } from 'react-redux';
import { UserAction } from '../store/userProfileSlice';
import axios from 'axios';
const CaptainDetails = () => {
  const captain = useSelector((store) => store.user)

  return (
    <div>
      <div className={"transition-all duration-600 ease-in-out  fixed z-10 bottom-0 bg-white py-5 rounded-lg w-full translate-y-0 "}>
        <div className='flex items-center justify-between py-2 px-4' >
          <div className=' flex items-center justify-between '>
            <img className='w-10 rounded-full' src="https://avatar.iran.liara.run/public/boy" alt="" />
            <h2 className=' font-semibold m-2'>{captain.fullname?.firstname} {captain.fullname?.lastname}</h2>
          </div>
          <div>
            <h2 className='text-xl font-semibold text-right'>$289.90</h2>
            <p className='text-xs font-semibold text-[#808080] text-center'>Earned</p>
          </div>
        </div>

        <div className='flex  px-10 justify-between items-center rounded-lg  mx-5 my-2 bg-[#e0e0e0] '>
          <div className='my-3'>
            <h3 className='flex items-center justify-center'>   <MdOutlineSpeed size={30} /></h3>
            <h3 className='font-semibold text-center'>10.2</h3>
            <p className='text-xs font-semibold text-[#808080] text-center'>Hours Online</p>
          </div>
          <div className='my-3'>
            <h3 className='flex items-center justify-center'> <IoMdSpeedometer size={30} /></h3>
            <h3 className='font-semibold text-center'>10.2</h3>
            <p className='text-xs font-semibold text-[#808080] text-center'>Hours Online</p>
          </div>
          <div className='my-3'>
            <h3 className='flex items-center justify-center'>  <RiBillLine size={30} /></h3>
            <h3 className='font-semibold text-center'>10.2</h3>
            <p className='text-xs font-semibold text-[#808080] text-center'>Hours Online</p>
          </div>
        </div>
      </div>
    </div>
  )
}

export default CaptainDetails
