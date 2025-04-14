import React, { useEffect, useState } from 'react'
import { IoArrowForward } from 'react-icons/io5'
import { MdSquare } from 'react-icons/md'
import { RiBillLine } from 'react-icons/ri'
import { AiFillHome } from "react-icons/ai";
import { Link, useNavigate } from 'react-router-dom';
import { useSelector } from 'react-redux';
import WebSocket from '../Functions/WebSocket';
import MapComponent from '../components/MapComponent';

const socket = WebSocket();

const Riding = () => {
    const navigate = useNavigate();
    const [position2, setposition] = useState([]);
    useEffect(() => {
        const updateHandler = (data) => setposition(data);
        socket.on('location-update', updateHandler);
      
        return () => socket.off('location-update', updateHandler);
      }, []);
      
    const ride = useSelector((store) => store.ride)

    useEffect(() => {
        const rideEndHandler = (data) => {
          toast.info('Your ride has ended.');
          navigate("/home");
        };
      
        socket.on('ride-ended', rideEndHandler);
        return () => socket.off('ride-ended', rideEndHandler);
      }, [navigate]);
    return (

        <div className='  h-screen w-full relative'>
            <img className='w-13 absolute left-12 top-5 z-1' src="https://upload.wikimedia.org/wikipedia/commons/c/cc/Uber_logo_2018.png" alt="" />

            <MapComponent
                pickup={{ lat: position2.lat, lng: position2.lng }}
                destination={{ lat: ride.end?.latitude, lng: ride.end?.longitude }}
                height={'52vh'}
            />
            <Link to='/home' className='fixed right-2 top-2 bg-white w-10 h-10 flex items-center justify-center rounded-xl'><AiFillHome size={22} /></Link>

            <div className={"transition-all duration-600 ease-in-out  fixed z-10 bottom-0 bg-white py-5 w-full translate-y-0 "}>
                <div>
                    <div className="flex items-center justify-center flex-col">
                        <div className="border-b-2 border-[#dadada] w-full flex items-center justify-between px-7">
                            <img className="w-30 object-contain  m-2  " src="/car.jpg" alt="" />
                            <div className='text-right pt-2'> <h2 className='font-medium text-lg capitalize'>{ride.captain?.fullname.firstname} {ride.captain?.fullname.lastname}</h2>
                                <h1 className='text-xl font-semibold'>{ride.captain?.vehicle.plate}</h1>
                                <h1 className='text-sm text-[#7a7a82] font-semibold capitalize'>{ride.captain?.vehicle.vehicleType}</h1>

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
                        <button className='flex items-center justify-center w-90 bg-green-500 text-white font-semibold py-3 rounded-lg  '>Make Payment<IoArrowForward size={30} /></button>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Riding
