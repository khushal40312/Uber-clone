import React from 'react'
import { useState } from 'react';
import { FaChevronDown, FaLocationDot } from 'react-icons/fa6'
import { MdSquare } from 'react-icons/md'
import { RiBillLine } from 'react-icons/ri'
import { Link, useNavigate } from 'react-router-dom'
import Loading from './Loading';
import axios from 'axios';
import { useDispatch } from 'react-redux';
import { RideAction } from '../store/rideInfoSlice';
import { toast } from 'react-toastify';

const ConfirmRidePopup = ({ setConfirmRidePopup, acceptedRide, confirmPanel }) => {
    const dispatch = useDispatch();
    const [loading, setloading] = useState();
    const navigate = useNavigate()
    const [otp, setOtp] = useState('')
    const handleOTP = async (e) => {
        e.preventDefault();
        setloading(true);
      
        await toast.promise(
          axios.get(`${import.meta.env.VITE_BASE_URL}/rides/start-ride`, {
            params: { rideId: acceptedRide.ride._id, otp },
            headers: {
              Authorization: `Bearer ${localStorage.getItem('cap-token')}`
            }
          }),
          {
            pending: 'Verifying OTP...',
            success: 'Ride started successfully!',
            error: {
              render({ data }) {
                console.error(data);
                return data?.response?.data?.message || 'OTP verification failed.';
              }
            }
          }
        ).then(response => {
          dispatch(RideAction.addRideInfo(response.data));
          setOtp('');
          navigate('/captain-riding');
          setConfirmRidePopup(false);
        }).finally(() => {
          setloading(false);
        });
      };

    return (
        <>
            {loading ? <div className="fixed inset-0 flex items-center justify-center bg-black/30 backdrop-blur-md z-50">
                <Loading /> </div> : <div ref={confirmPanel} className=' h-screen  fixed z-10 bottom-0 bg-white p-3 w-full translate-y-full'>
                <h2 onClick={() => setConfirmRidePopup(false)} className="text-center w-full flex items-center justify-center py-2"><FaChevronDown size={20} /></h2>


                <h3 className='text-2xl my-2 font-semibold text-start '>Confirm the Ride!</h3>
                <div className='flex items-center w-88 justify-between py-4  px-4 rounded-lg bg-[#ffa500] ' >
                    <div className=' flex items-center justify-between  '>
                        <img className='w-10 rounded-full' src="https://avatar.iran.liara.run/public/boy" alt="" />
                        <h2 className=' font-semibold m-2'>{acceptedRide?.user?.fullname?.firstname} {acceptedRide?.user?.fullname?.lastname}</h2>
                    </div>
                    <div>
                        <h2 className='text-xl font-semibold text-right'>{acceptedRide?.distance}</h2>

                    </div>
                </div>
                <div className="flex items-center justify-center flex-col my-8">

                    <div className="border-b-2 border-[#dadada] p-1 flex m-2 items-center flex-start w-full">
                        <h2 className='p-2 rounded-full bg-[#eeeeee] mr-3'><FaLocationDot /></h2>
                        <div className='  w-full'>
                            <h2 className='flex gap-1 items-center font-semibold text-xl'>{acceptedRide?.ride?.pickup?.split(',')[0]}</h2>
                            <h5 className='font-semibold text-sm text-[#6f6969] '>{acceptedRide?.ride?.pickup}</h5>

                        </div>

                    </div>
                    <div className="border-b-2 border-[#dadada] p-1 flex m-2 items-center flex-start w-full">
                        <h2 className='p-2 rounded-full bg-[#eeeeee] mr-3'><MdSquare /></h2>
                        <div className='  w-full'>
                            <h2 className='flex gap-1 items-center font-semibold text-xl'>{acceptedRide?.ride?.destination?.split(',')[0]}</h2>
                            <h5 className='font-semibold text-sm text-[#6f6969] '>{acceptedRide?.ride?.destination}</h5>

                        </div>

                    </div>
                    <div className="border-b-2 border-[#dadada] p-1 flex m-2 items-center flex-start w-full">
                        <h2 className='p-2 rounded-full bg-[#eeeeee] mr-3'><RiBillLine /></h2>
                        <div className='  w-full'>
                            <h2 className='flex gap-1 items-center font-semibold text-xl'>₹{acceptedRide?.ride?.fare}</h2>
                            <h5 className='font-semibold text-sm text-[#6f6969] '>Cash Cash</h5>

                        </div>

                    </div>

                </div>
                <form onSubmit={(e) => handleOTP(e)}>
                    <div className='flex items-center justify-center flex-col'>
                        <input
                            value={otp}
                            onChange={(e) => setOtp(e.target.value)}
                            className='font-mono bg-[#eeeeee] rounded   w-90 text-lg pl-8 p-2 m-2 placeholder:text-base  ' type="number" placeholder='Enter OTP' />
                        <button className='flex items-center justify-center w-90 bg-green-500 text-white font-semibold py-3 m-2 rounded-lg  '>Confirm</button>
                        <button onClick={() => {
                            setConfirmRidePopup(false)

                        }} className='flex items-center justify-center w-90 bg-red-500 text-white font-semibold py-3 m-2  rounded-lg  '>Cancel </button>
                    </div>
                </form>
            </div>}
        </>
    )
}

export default ConfirmRidePopup
