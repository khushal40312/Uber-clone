import React from 'react'
import { FaChevronDown, FaLocationDot } from 'react-icons/fa6'
import { IoArrowForward } from 'react-icons/io5'
import { MdSquare } from 'react-icons/md'
import { RiBillLine } from 'react-icons/ri'

const RidePopup = ({ rides, confirmRide, setRides, setAcceptedRide }) => {

    const filterRide = (id) => {

        setRides((prev) => prev.filter((elem) => elem._id != id))
    }
    console.log(rides)
    // eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2N2RiZjcwOWMzZDlmYzZjMmJiNGI4MGMiLCJpYXQiOjE3NDI0NzAwMzMsImV4cCI6MTc0MjU1NjQzM30.14y_IZplPWL5UXhd0oVkm7l7eZDDWX22klh56B5hs8s
    return (
        <>
            {rides?.map((ride, index) => <div key={ride?.ride?._id} className={`border-[#6f6969] border-2 rounded-lg transition-all duration-600 ease-in-out  fixed z-10 ${index === 0 && rides?.length > 1 ? "bottom-1" : "-bottom-3"} bg-white p-3 w-full ${rides?.length !== 0 ? "translate-y-0" : "translate-y-full"}  `} >
                <h2 onClick={() => filterRide(ride?.ride?._id)} className="text-center w-full flex items-center justify-center py-2 my-1 invert-80"><FaChevronDown size={20} /></h2>


                <h3 className='text-2xl font-semibold text-start '>New Ride Available!</h3>
                <div className='flex items-center justify-between py-4 m-2 px-4 rounded-lg bg-[#ffa500] ' >
                    <div className=' flex items-center justify-between '>
                        <img className='w-10 rounded-full' src="https://avatar.iran.liara.run/public/boy" alt="" />
                        <h2 className=' font-semibold m-2'>{ride?.user?.fullname.firstname || ''} {ride?.user?.fullname.lastname || ''}</h2>
                    </div>
                    <div>
                        <h2 className='text-xl font-semibold text-right'>{ride?.ride?.distance}</h2>

                    </div>
                </div>
                <div className="flex items-center justify-center flex-col">

                    <div className="border-b-2 border-[#dadada] p-1 flex m-2 items-center flex-start w-full">
                        <h2 className='p-2 rounded-full bg-[#eeeeee] mr-3'><FaLocationDot /></h2>
                        <div className='  w-full'>
                            <h2 className='flex gap-1 items-center font-semibold text-xl'>{ride?.ride?.pickup?.split(',')[0]}</h2>
                            <h5 className='font-semibold text-sm text-[#6f6969] '>{ride?.ride?.pickup}</h5>

                        </div>

                    </div>
                    <div className="border-b-2 border-[#dadada] p-1 flex m-2 items-center flex-start w-full">
                        <h2 className='p-2 rounded-full bg-[#eeeeee] mr-3'><MdSquare /></h2>
                        <div className='  w-full'>
                            <h2 className='flex gap-1 items-center font-semibold text-xl'>{ride?.ride?.destination?.split(',')[0]}</h2>
                            <h5 className='font-semibold text-sm text-[#6f6969] '>{ride?.ride?.destination}</h5>

                        </div>

                    </div>
                    <div className="border-b-2 border-[#dadada] p-1 flex m-2 items-center flex-start w-full">
                        <h2 className='p-2 rounded-full bg-[#eeeeee] mr-3'><RiBillLine /></h2>
                        <div className='  w-full'>
                            <h2 className='flex gap-1 items-center font-semibold text-xl'>₹{ride?.ride?.fare}</h2>
                            <h5 className='font-semibold text-sm text-[#6f6969] '>Cash Cash</h5>

                        </div>

                    </div>
                    <div className={`flex items-center justify-between w-full ${index === 0 ? "my-2" : "m-0"}`}>
                        <button onClick={() => filterRide(ride?.ride?._id)} className='flex items-center justify-center w-40 bg-[#dedede] text-black font-semibold p-3   rounded-lg  '>Ignore</button>
                        <button onClick={() => {
                            setAcceptedRide(ride)
                            confirmRide(ride?.ride?._id)

                        }} className='flex items-center justify-center w-40 bg-green-500 text-white font-semibold p-3 rounded-lg  '>Accept</button>
                    </div>
                </div>
            </div>)}
        </>)
}

export default RidePopup
