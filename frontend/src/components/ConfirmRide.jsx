import { FaLocationDot, FaUser } from "react-icons/fa6";
import React from 'react'
import { FaChevronDown } from "react-icons/fa";
import { MdSquare } from "react-icons/md";
import { RiBillLine } from "react-icons/ri";
import { Link } from "react-router-dom";
import { IoArrowForward } from "react-icons/io5";
const ConfirmRide = ({ confirmVehiclePanel, setconfirmVmodal, selectedVehicle, setlookDriverModal, location, destination, createRide }) => {

  return (
    <div ref={confirmVehiclePanel} className='  fixed z-10 bottom-0 bg-white py-3 w-full translate-y-full  '>
      <h2 onClick={() => setconfirmVmodal(false)} className="text-center w-full flex items-center justify-center"><FaChevronDown size={25} /></h2>
      <h3 className='text-xl font-semibold text-center p-4 border-b-2 border-[#6f6969]'>Confirm your Ride</h3>

      <div className="flex items-center justify-center flex-col">
        <div className="border-b-2 border-[#dadada] w-full flex items-center justify-center">
          <img className="w-50 object-contain  m-3  " src={selectedVehicle.img} alt="" />
        </div>
        <div className="border-b-2 border-[#dadada] p-1 flex m-2 items-center flex-start w-full">
          <h2 className='p-2 rounded-full bg-[#eeeeee] mr-3'><FaLocationDot /></h2>
          <div className='  w-full'>
            <h2 className='flex gap-1 items-center font-semibold text-2xl'>{location.split(' ')[0]}</h2>
            <h5 className='font-semibold text-sm text-[#6f6969] '>{location}</h5>

          </div>

        </div>
        <div className="border-b-2 border-[#dadada] p-1 flex m-2 items-center flex-start w-full">
          <h2 className='p-2 rounded-full bg-[#eeeeee] mr-3'><MdSquare /></h2>
          <div className='  w-full'>
            <h2 className='flex gap-1 items-center font-semibold text-2xl'>{destination.split(' ')[0]}</h2>
            <h5 className='font-semibold text-sm text-[#6f6969] '>{destination}</h5>

          </div>

        </div>
        <div className="border-b-2 border-[#dadada] p-1 flex m-2 items-center flex-start w-full">
          <h2 className='p-2 rounded-full bg-[#eeeeee] mr-3'><RiBillLine /></h2>
          <div className='  w-full'>
            <h2 className='flex gap-1 items-center font-semibold text-2xl'>₹{selectedVehicle.fare}</h2>
            <h5 className='font-semibold text-sm text-[#6f6969] '>Cash Cash</h5>

          </div>

        </div>
        <button onClick={() => {
          setlookDriverModal(true)


          createRide(location, destination, selectedVehicle.vehicleType)
        }} className='flex items-center justify-center w-90 bg-green-500 text-white font-semibold py-3 rounded-lg  '>Confirm<IoArrowForward size={30} /></button>
      </div>
    </div>
  )
}

export default ConfirmRide
