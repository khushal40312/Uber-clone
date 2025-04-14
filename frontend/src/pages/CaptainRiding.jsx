import React, { useEffect, useRef, useState } from 'react'
import { IoIosArrowUp, IoIosLogOut } from "react-icons/io";
import FinishRide from '../components/FinishRide';
import { Link } from 'react-router-dom';
import { useGSAP } from '@gsap/react';
import gsap from 'gsap';
import { useSelector } from 'react-redux';
import WebSocket from '../Functions/WebSocket';
import MapComponent from '../components/MapComponent';
import { toast } from 'react-toastify';
const socket = WebSocket();

const CaptainRiding = () => {
    const captain = useSelector((store) => store.user)
    const finishRideModal = useRef(null)
    const [openFinishRide, setFinishRide] = useState(false)
    const [position, setposition] = useState({});
    const ride = useSelector((store) => store.ride)

    useEffect(() => {
        if (!captain._id) return; // Prevents connecting if captain 
        const socket = WebSocket();

        socket.emit('join', {
            userId: captain._id,
            userType: 'captain'
        });
        const updateLocation = () => {
            navigator.geolocation.getCurrentPosition(
                position => {
                  setposition({ lat: position.coords.latitude, lng: position.coords.longitude });
                  socket.emit('location-update', {
                    userId: captain._id,
                    location: {
                      ltd: position.coords.latitude,
                      lng: position.coords.longitude
                    }
                  });
                },
                error => {
                  console.error("Geolocation error:", error);
                  toast.error("Unable to access location. Please enable location services.");
                }
              );
              
        }
        const updateInterval = setInterval(updateLocation, 10000)


    }, [captain._id]); // Only re-run when captain._id changes

    useGSAP(() => {
        gsap.to(finishRideModal.current, {
            y: openFinishRide ? 0 : "100%",
            duration: 0.5, // Optional: Smooth transition
            ease: "power2.out", // Optional: Easing effect
        });
    }, [openFinishRide]);

    return (
        <div className='  h-screen w-full relative '>
            <img className='w-13 absolute left-12 top-5 z-1' src="https://upload.wikimedia.org/wikipedia/commons/c/cc/Uber_logo_2018.png" alt="" />
            <MapComponent
                pickup={{ lat: position.lat, lng: position.lng }}
                destination={{ lat: ride.end?.latitude, lng: ride.end?.longitude }}
                height={'90vh'}
            />
            {/* <LiveTracking height={"100vh"} position2={position} /> */}
            <Link to='/captains/logout' className='fixed right-2 top-2 bg-white w-10 h-10 flex items-center justify-center rounded-xl'><IoIosLogOut size={22} /></Link>
            <div onClick={() => setFinishRide(true)} className={`rounded-t-xl bg-[#ffb400] absolute w-full p-2 transition-all duration-300 ease-in-out bottom-0 `} >

                <h2 className="text-center w-full flex items-center justify-center  bg-[#ffb400]"><IoIosArrowUp size={20} /></h2>
                <div className='flex items-center justify-between p-4 bg-[#ffb400]'>

                    <h2 className='text-xl font-semibold'>2km Away</h2>
                    <button className='bg-green-500 px-4 py-3 rounded-lg font-semibold text-white w-50 '>Complete Ride</button>

                </div>


            </div>
            <FinishRide finishRideModal={finishRideModal} openFinishRide={openFinishRide} setFinishRide={setFinishRide} />


        </div>


    )
}

export default CaptainRiding
