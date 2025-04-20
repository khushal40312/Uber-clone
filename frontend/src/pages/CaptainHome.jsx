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
import { toast } from 'react-toastify';

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
    if (token&&captain.length===0 ) {
        const fetchCaptainProfile = async () => {
            try {
                const response = await axios.get(`${import.meta.env.VITE_BASE_URL}/captains/profile`, {
                    headers: {
                        Authorization: `Bearer ${token}`
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

    socket.on('new-ride', (data) => {
console.log(data)
      setRides((prev) => [...prev, data])



    })
    return () => socket.off("new-ride");
  })
  
  useEffect(() => {
    if (!captain?.captain?._id) return; // Prevents connecting if captain 
 

    socket.emit('join', {
      userId: captain.captain._id,
      userType: 'captain'
    });
    const updateLocation = () => {
      if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(position => {
          setposition2({ lat: position.coords.latitude, lng: position.coords.longitude })
          socket.emit('update-location-captain', {
            userId: captain.captain._id,
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
  }, [captain?.captain?._id]); // Only re-run when captain._id changes

  async function confirmRide(rideId) {
    setloading(true);
  
    await toast.promise(
      axios.post(`${import.meta.env.VITE_BASE_URL}/rides/confirm`, {
        rideId,
        captainId: captain.captain._id,
      }, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem('cap-token')}`
        }
      }),
      {
        pending: 'Confirming ride...',
        success: 'Ride confirmed successfully!',
        error: {
          render({ data }) {
            console.error(data);
            return data?.response?.data?.message || 'Failed to confirm ride';
          }
        }
      }
    );
  
    setConfirmRidePopup(true);
    setRides([]);
    setloading(false);
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
      <LiveTracking position2={position2} height={"69vh"} />
      <Link to='/captains/logout' className='fixed right-2 top-2 bg-white w-10 h-10 flex items-center justify-center rounded-xl'><IoIosLogOut size={22} /></Link>
      <CaptainDetails />
      {rides&&<RidePopup setRides={setRides} rides={rides} setConfirmRidePopup={setConfirmRidePopup} setAcceptedRide={setAcceptedRide} confirmRide={confirmRide} />}
      {loading ? <div className="fixed inset-0 flex items-center justify-center bg-black/30 backdrop-blur-md z-50">
        <Loading />
      </div> :
        <ConfirmRidePopup confirmPanel={confirmPanel} openConfirmRidePopup={openConfirmRidePopup} setConfirmRidePopup={setConfirmRidePopup} acceptedRide={acceptedRide} />}

    </div>

  )
}

export default CaptainHome
