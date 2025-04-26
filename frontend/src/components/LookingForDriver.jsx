import React from 'react'
import { FaChevronDown, FaLocationDot } from 'react-icons/fa6'
import { IoArrowForward } from 'react-icons/io5'
import { MdSquare } from 'react-icons/md'
import { RiBillLine } from 'react-icons/ri'
import Skeleton from 'react-loading-skeleton'


const LookingForDriver = ({ lookDriverRef, selectedVehicle, setlookDriverModal, createdRide, loading3 }) => {

  return (
    <div ref={lookDriverRef} className='  fixed z-10 bottom-0 bg-white py-5 w-full '>

      <h2 onClick={() => setlookDriverModal(false)} className="text-center w-full flex items-center justify-center"><FaChevronDown size={25} /></h2>
      <h3 className='text-xl font-semibold text-center p-4 border-b-2 border-[#6f6969]'>Looking for Driver</h3>

      {loading3 ? (
        <Skeleton count={5} height={20} containerClassName="flex-1" />
      ) : (<div className="flex items-center justify-center flex-col">
        <div className="border-b-2 border-[#dadada] w-full flex items-center justify-between px-3">
          <img className="w-40 object-contain  m-3  " src={selectedVehicle?.img} alt="" />
          {createdRide?.status === 'pending' ? (
            <Skeleton count={5} height={20} containerClassName="flex-1" width={150} />
          ) : (<div className='text-right pt-2'> <h2 className='font-medium text-lg capitalize'>{createdRide?.captain?.fullname.firstname} {createdRide?.captain?.fullname.lastname}</h2>
            <h1 className='text-xl font-semibold'>{createdRide?.captain?.vehicle.plate}</h1>
            <h1 className='text-sm text-[#7a7a82] font-semibold uppercase'>{createdRide?.captain?.vehicle.vehicleType}</h1>
            <h1 className='text-sm font-semibold uppercase  '>OTP: {createdRide?.otp}</h1>

          </div>)}
        </div>
        <div className="border-b-2 border-[#dadada] p-1 flex m-2 items-center flex-start w-full">
          <h2 className='p-2 rounded-full bg-[#eeeeee] mr-3'><FaLocationDot /></h2>
          <div className='  w-full'>
            <h2 className='flex gap-1 items-center font-semibold text-2xl'>{createdRide?.pickup?.split(',')[0]}</h2>
            <h5 className='font-semibold text-sm text-[#6f6969] '>{createdRide?.pickup}</h5>

          </div>

        </div>
        <div className="border-b-2 border-[#dadada] p-1 flex m-2 items-center flex-start w-full">
          <h2 className='p-2 rounded-full bg-[#eeeeee] mr-3'><MdSquare /></h2>
          <div className='  w-full'>
            <h2 className='flex gap-1 items-center font-semibold text-2xl'>{createdRide?.destination?.split(',')[0]}</h2>
            <h5 className='font-semibold text-sm text-[#6f6969] '>{createdRide?.destination}</h5>

          </div>

        </div>
        <div className="border-b-2 border-[#dadada] p-1 flex m-2 items-center flex-start w-full">
          <h2 className='p-2 rounded-full bg-[#eeeeee] mr-3'><RiBillLine /></h2>
          <div className='  w-full'>
            <h2 className='flex gap-1 items-center font-semibold text-2xl'>₹{createdRide?.fare}</h2>
            <h5 className='font-semibold text-sm text-[#6f6969] '>Cash Cash</h5>

          </div>

        </div>
       
      </div>)}

    </div>
  )
}

export default LookingForDriver
