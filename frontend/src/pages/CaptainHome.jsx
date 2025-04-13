import React, { useEffect, useRef, useState } from 'react'
import { IoIosLogOut } from "react-icons/io";
import { Link } from 'react-router-dom';

import CaptainDetails from '../components/CaptainDetails';
import RidePopup from '../components/RidePopup';
import ConfirmRidePopup from '../components/ConfirmRidePopup';
import WebSocket from '../Functions/WebSocket';
import { useDispatch, useSelector } from 'react-redux';
import axios from 'axios';
import { UserAction } from '../store/userProfileSlice';
import { useGSAP } from '@gsap/react';
import gsap from 'gsap';
import Loading from '../components/Loading';
import LiveTracking from '../components/LiveTracking';

const socket = WebSocket();

const CaptainHome = () => {

  const [openConfirmRidePopup, setConfirmRidePopup] = useState(false)
  const dispatch = useDispatch();
  const token = localStorage.getItem('cap-token')
  const captain = useSelector((store) => store.user)
  const [rides, setRides] = useState([]);
  const [acceptedRide, setAcceptedRide] = useState({});
  const [loading, setloading] = useState(false);
  const [position2, setposition2] = useState([]);

  const confirmPanel = useRef(null)

  useEffect(() => {

    socket.on('new-ride', (data) => {

      setRides((prev) => [...prev, data])



    })
    return () => socket.off("new-ride");
  })
  useEffect(() => {
    if (token) {
      const fetchCaptainProfile = async () => {
        try {
          const response = await axios.get(`${import.meta.env.VITE_BASE_URL}/captains/profile`, {
            headers: {
              Authorization: `Bearer ${localStorage.getItem('cap-token')}`
            }
          })
          dispatch(UserAction.addUserInfo(response.data))
        } catch (error) {
          console.error(error)
        }
      }
      fetchCaptainProfile()
    }
  }, [])
  useEffect(() => {
    if (!captain._id) return; // Prevents connecting if captain 
 

    socket.emit('join', {
      userId: captain._id,
      userType: 'captain'
    });
    const updateLocation = () => {
      if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(position => {
          setposition2({ lat: position.coords.latitude, lng: position.coords.longitude })
          socket.emit('update-location-captain', {
            userId: captain._id,
            location: {
              ltd: position.coords.latitude,
              lng: position.coords.longitude
            }
          })
        })

      }
    }
    const updateInterval = setInterval(updateLocation, 10000)
    return () => {
      clearInterval(updateInterval);
      socket.off("join");
      socket.off("update-location-captain");
    };
  }, [captain._id]); // Only re-run when captain._id changes

  async function confirmRide(rideId) {
    setloading(true)

    try {
      const response = await axios.post(`${import.meta.env.VITE_BASE_URL}/rides/confirm`, {

        rideId,
        captainId: captain._id,


      }, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem('cap-token')}`
        }
      })


      setConfirmRidePopup(true)
      setRides([])
    } catch (error) {
      console.error(error)
      setloading(false)
    } finally {
      setloading(false)
    }

  }
  useGSAP(() => {
    gsap.to(confirmPanel.current, {
      y: openConfirmRidePopup ? 0 : "100%",
      duration: 0.5, // Optional: Smooth transition
      ease: "power2.out", // Optional: Easing effect
    });
  }, [openConfirmRidePopup]);
  return (
    <div className='  h-screen w-full relative'>
      <img className='w-13 absolute left-12 top-5 z-1' src="https://upload.wikimedia.org/wikipedia/commons/c/cc/Uber_logo_2018.png" alt="" />
      <LiveTracking position2={position2} height={"100vh"} />
      <Link to='/captains/logout' className='fixed right-2 top-2 bg-white w-10 h-10 flex items-center justify-center rounded-xl'><IoIosLogOut size={22} /></Link>
      <CaptainDetails />
      <RidePopup setRides={setRides} rides={rides} setConfirmRidePopup={setConfirmRidePopup} setAcceptedRide={setAcceptedRide} confirmRide={confirmRide} />
      {loading ? <div className="fixed inset-0 flex items-center justify-center bg-black/30 backdrop-blur-md z-50">
        <Loading />
      </div> :
        <ConfirmRidePopup confirmPanel={confirmPanel} openConfirmRidePopup={openConfirmRidePopup} setConfirmRidePopup={setConfirmRidePopup} acceptedRide={acceptedRide} />}

    </div>

  )
}

export default CaptainHome
