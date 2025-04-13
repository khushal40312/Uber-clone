import axios from 'axios'
import React from 'react'
import { FaChevronDown, FaLocationDot } from 'react-icons/fa6'
import { MdSquare } from 'react-icons/md'
import { RiBillLine } from 'react-icons/ri'
import { useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'


const FinishRide = ({ openFinishRide, setFinishRide,finishRideModal }) => {
    const navigate = useNavigate();
    const ride = useSelector((store) => store.ride)
    async function endRide() {
        const response = await axios.post(`${import.meta.env.VITE_BASE_URL}/rides/end-ride`, {

            rideId: ride._id


        }, {
            headers: {
                Authorization: `Bearer ${localStorage.getItem('cap-token')}`
            }
        })

        if (response.status === 200) {
            navigate('/captain-home')
        }

    }








    return (
        <div ref={finishRideModal} className='transition-all duration-600 ease-in-out   fixed z-10 bottom-0 bg-white p-3 w-full translate-y-full'>
            <h2 onClick={() => { if (openFinishRide) setFinishRide(false) }} className="text-center w-full flex items-center justify-center py-2"><FaChevronDown size={20} /></h2>


            <h3 className='text-2xl my-2 font-semibold text-start '>Finish this Ride!</h3>
            <div className='flex items-center w-88 justify-between py-4  px-4 rounded-lg bg-[#ffa500] ' >
                <div className=' flex items-center justify-between  '>
                    <img className='w-10 rounded-full' src="https://avatar.iran.liara.run/public/boy" alt="" />
                    <h2 className=' font-semibold m-2 capitalize'>{ride.user?.fullname.firstname} {ride.user?.fullname.lastname}</h2>
                </div>
                <div>
                    <h2 className='text-xl font-semibold text-right'>{ride?.distance}</h2>

                </div>
            </div>
            <div className="flex items-center justify-center flex-col my-3">

                <div className="border-b-2 border-[#dadada] p-1 flex m-2 items-center flex-start w-full">
                    <h2 className='p-2 rounded-full bg-[#eeeeee] mr-3'><FaLocationDot /></h2>
                    <div className='  w-full'>
                        <h2 className='flex gap-1 items-center font-semibold text-xl'>{ride.pickup?.split(',')[0] || ride.pickup?.split(' ')[0]}</h2>
                        <h5 className='font-semibold text-sm text-[#6f6969] '>{ride?.pickup}</h5>

                    </div>

                </div>
                <div className="border-b-2 border-[#dadada] p-1 flex m-2 items-center flex-start w-full">
                    <h2 className='p-2 rounded-full bg-[#eeeeee] mr-3'><MdSquare /></h2>
                    <div className='  w-full'>
                        <h2 className='flex gap-1 items-center font-semibold text-xl'>{ride.destination?.split(',')[0] || ride.destination?.split(' ')[0]}</h2>
                        <h5 className='font-semibold text-sm text-[#6f6969] '>{ride?.destination}</h5>

                    </div>

                </div>
                <div className="border-b-2 border-[#dadada] p-1 flex m-2 items-center flex-start w-full">
                    <h2 className='p-2 rounded-full bg-[#eeeeee] mr-3'><RiBillLine /></h2>
                    <div className='  w-full'>
                        <h2 className='flex gap-1 items-center font-semibold text-xl'>₹{ride?.fare}</h2>
                        <h5 className='font-semibold text-sm text-[#6f6969] '>Cash Cash</h5>

                    </div>

                </div>


            </div>
            <div className='flex items-center justify-centerw-full p-2'>
                <button onClick={() => {
                    endRide()
                }} className='flex items-center justify-center w-80 bg-green-500 text-white font-semibold py-3 m-2  rounded-lg  '>Finish Ride </button>

            </div>
            <p className='text-xs text-[#e13b3b] my-3 text-center '>Click on Finish Ride button if you have completed with payment.</p>
        </div>



    )
}
export default FinishRide;