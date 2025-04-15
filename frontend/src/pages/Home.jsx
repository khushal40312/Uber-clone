import React, { useCallback, useEffect, useLayoutEffect, useMemo, useRef, useState } from 'react'
import gsap from 'gsap';
import { IoChevronDownSharp } from "react-icons/io5";
import LocationSearchPanel from '../components/LocationSearchPanel';
import VehicleModal from '../components/VehicleModal';
import ConfirmRide from '../components/ConfirmRide';
import LookingForDriver from '../components/LookingForDriver';
import useDebounce from '../Functions/DebounceSearch';
import axios from 'axios';
import Loading from '../components/Loading';
import { useGSAP } from '@gsap/react';
import { debounce } from "lodash";
import WebSocket from '../Functions/WebSocket';
import { useDispatch, useSelector } from 'react-redux';
import { UserAction } from '../store/userProfileSlice';
import { RideAction } from '../store/rideInfoSlice';
import { Link, useNavigate } from 'react-router-dom';
import LiveTracking from '../components/LiveTracking';
import LiveLocation from '../components/LiveLocation';
import { FaLocationDot, FaUser } from "react-icons/fa6";
import { IoIosLogOut } from 'react-icons/io';
import { toast } from 'react-toastify';
import { FcMenu } from "react-icons/fc";
const socket = WebSocket();

const Home = () => {
  const [locationEnabled, setLocationEnabled] = useState(false);
  const [location, setLocation] = useState('')
  const [destination, setDestination] = useState('')
  const [openVehicleModal, setVehicleModal] = useState(false)
  const [openModal, setModal] = useState(false)
  const [selectedVehicle, setSelectedVehicle] = useState({})
  const [confirmVmodal, setconfirmVmodal] = useState(false)
  const [lookDriverModal, setlookDriverModal] = useState(false)
  const [pickupSuggestions, setPickupSuggestions] = useState([]);
  const [inputType, setinputType] = useState('location');
  const [destinationSuggestions, setDestinationSuggestions] = useState([]);
  const [loading, setLoading] = useState(false);
  const [loading2, setLoading2] = useState(false);
  const [loading3, setLoading3] = useState(false);
  const [vehicleFare, setvehicleFare] = useState({});
  const [createdRide, setcreatedRide] = useState({});
  const [position3, setposition3] = useState([]);
  const [locationButton, setlocationButton] = useState(false);
  const [isUserTyped, setIsUserTyped] = useState(false);
  const modalRef = useRef(null);
  const modalDownButtonRef = useRef(null);
  const findButtonRef = useRef(null);
  const locationPanel = useRef(null);
  const vehiclePanel = useRef(null)
  const confirmVehiclePanel = useRef(null)
  const lookDriverRef = useRef(null)
  // const socket = WebSocket()
  const token = localStorage.getItem('token')
  const user = useSelector((store) => store.user)
  const navigate = useNavigate()
  const dispatch = useDispatch()
  const Vehicles = [
    {
      vehicleName: "UberGo",
      far: "2 mins away",
      provide: "Affodable,compact rides",
      img: "/car.jpg",
      fare: vehicleFare.car,
      vehicleType: 'car'

    },
    {
      vehicleName: "UberAuto",
      far: "2 mins away",
      provide: "Affodable,Autos",
      img: "/autor.jpeg",
      fare: vehicleFare.auto,
      vehicleType: 'auto'

    },
    {
      vehicleName: "Moto",
      far: "2 mins away",
      provide: "Affodable,mototrcycle rides",
      img: "bikes.jpeg",
      fare: vehicleFare.moto,
      vehicleType: 'moto'


    }
  ]

  const debouncedLocation = useDebounce(location, 600);
  const debouncedDestination = useDebounce(destination, 600);

  const fetchSuggestions = useCallback(
    debounce(async (input, type) => {
      if (!input?.trim() || !isUserTyped) return;

      setLoading2(true);
      try {
        const response = await axios.get(`${import.meta.env.VITE_BASE_URL}/maps/get-suggestion`, {
          params: { input },
          headers: { Authorization: `Bearer ${localStorage.getItem('token')}` },
        });

        if (type === "location") {
          setPickupSuggestions(response.data);
        } else {
          setDestinationSuggestions(response.data);
        }
      } catch (error) {
        console.error(`Error fetching ${type} suggestions:`, error);
      } finally {
        setLoading2(false);
      }
    }, 600), // Debounce inside fetch function
    [isUserTyped]
  );
  const [position2, setposition] = useState([]);
  useEffect(() => {

    socket.on('location-update', (data) => {

      setposition(data)



    })

  })
  useEffect(() => {
    socket.on('ride-started', (data) => {

      dispatch(RideAction.addRideInfo(data))
      navigate('/riding')
    })
    return () => socket.off("ride-started");
  })
  useEffect(() => {

    socket.on('ride-confirmed', (data) => {

      setcreatedRide(data)
      if (!lookDriverModal) {
        setlookDriverModal(true)
      }

    })

  })
  useEffect(() => {
    if (!user._id) return; // Prevents connecting if captain 
    const socket = WebSocket();

    socket.emit('join', {
      userId: user._id,
      userType: 'user'
    })
  }, [user._id])
  /** Memoize debouncedLocation & debouncedDestination fetch logic to avoid re-renders */
  useEffect(() => {
    fetchSuggestions(debouncedLocation, 'location');
  }, [debouncedLocation, fetchSuggestions]);

  useEffect(() => {
    fetchSuggestions(debouncedDestination, 'destination');
  }, [debouncedDestination, fetchSuggestions]);
  useEffect(() => {
    if (token) {
      const fetchUserProfile = async () => {
        try {
          const response = await axios.get(`${import.meta.env.VITE_BASE_URL}/users/profile`, {
            headers: {
              Authorization: `Bearer ${token}`
            }
          })
          dispatch(UserAction.addUserInfo(response.data))
        } catch (error) {
          console.error(error)
        }
      }
      fetchUserProfile()
    }
  }, [])
  /** Memoize search suggestions to avoid recomputation */
  const searchSuggestions = useMemo(() => {
    return inputType === 'location' ? pickupSuggestions : destinationSuggestions;
  }, [inputType, pickupSuggestions, destinationSuggestions]);


  const submitHandler = async (e) => {
    e.preventDefault();


    setLocation('')
    // setLocation('')
  }
  const handletrip = async () => {

    setLoading(true)
    try {
      const response = await axios.get(`${import.meta.env.VITE_BASE_URL}/rides/get-fare`, {
        params: { pickup: location, destination: destination },
        headers: {
          Authorization: `Bearer ${localStorage.getItem('token')}`
        }
      })
      setvehicleFare(response.data.fare)
    } catch {
      setLoading(false)
    } finally {
      setLoading(false)
    }
    setVehicleModal(true)
    setModal(false)

  }
  async function createRide(location, destination, vehicleType) {
    setLoading3(true);
  
    await toast.promise(
      axios.post(
        `${import.meta.env.VITE_BASE_URL}/rides/create`,
        { pickup: location, destination, vehicleType },
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem('token')}`,
            'Content-Type': 'application/json',
          },
        }
      ),
      {
        pending: 'Requesting a ride...',
        success: 'Ride created successfully! Looking for a driver...',
        error: {
          render({ data }) {
            console.error('Error creating ride:', data);
            return data?.response?.data?.message || 'Failed to create ride';
          },
        },
      }
    ).then((res) => {
      
      setcreatedRide(res.data);
    });
    
  
    setLoading3(false);
    setconfirmVmodal(false);
  }

  // GSAP animation effect
  useGSAP(function () {

    if (openModal) {
      gsap.to(modalRef.current, {
        height: "100%",
        top: 0,
        duration: 0.5,
        ease: "power2.in"
      });
      gsap.to(modalDownButtonRef.current, {
        display: 'unset'
      })
      gsap.to(findButtonRef.current, {
        display: 'flex'
      })


      gsap.to(locationPanel.current, {
        display: 'flex'
      })
    } else if (!openModal) {
      gsap.to(modalRef.current, {
        height: "27%",
        top: "auto",
        bottom: 0,
        duration: 0.5,
        ease: "power2.in"
      });
      gsap.to(modalDownButtonRef.current, {
        display: 'none'
      })
      gsap.to(findButtonRef.current, {
        display: 'none'
      })
      gsap.to(locationPanel.current, {
        display: 'none'
      })
    }
  }, [openModal]);

  useGSAP(() => {
    gsap.to(vehiclePanel.current, {
      y: openVehicleModal ? 0 : "100%",
      duration: 0.5, // Optional: Smooth transition
      ease: "power2.out", // Optional: Easing effect
    });
  }, [openVehicleModal]);
  useGSAP(() => {
    gsap.to(confirmVehiclePanel.current, {
      y: confirmVmodal ? 0 : "100%",
      duration: 0.5, // Optional: Smooth transition
      ease: "power2.out", // Optional: Easing effect
    });
  }, [confirmVmodal]);

  useGSAP(() => {
    gsap.to(lookDriverRef.current, {
      y: lookDriverModal ? 0 : "100%",
      duration: 0.5, // Optional: Smooth transition
      ease: "power2.out", // Optional: Easing effect
    });
  }, [lookDriverModal]);
  const requestLocation = () => {
    if (!navigator.geolocation) {
      console.error("Geolocation not supported");
      return;
    }
  
    navigator.geolocation.getCurrentPosition(
      (position) => {
        setposition3({
          lat: position.coords.latitude,
          lng: position.coords.longitude
        });
        setLocationEnabled(true); // Enable periodic updates
      },
      (error) => {
        console.error("Location error:", error);
      }
    );
  };
  
  useEffect(() => {
    if (!user._id || !locationEnabled) return;
  
    const updateLocation = () => {
      if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(
          (position) => {
            setposition3({
              lat: position.coords.latitude,
              lng: position.coords.longitude
            });
          },
          (error) => {
            console.error("Location error:", error);
              toast.error("Unable to access location. Please enable GPS.");
            
            
          }
        );
      }
    };
  
    const updateInterval = setInterval(updateLocation, 5000);
    return () => clearInterval(updateInterval);
  }, [user._id, locationEnabled]);

  return (
    <>
   {!locationEnabled&& <div className="fixed inset-0 flex  flex-col items-center justify-center bg-black/30 backdrop-blur-md z-50">

    <button className='p-3 bg-blue-500 font-semibold rounded-lg w-50 flex items-center justify-center gap-2 my-2' onClick={requestLocation}>
 <span className='my-2'><FaLocationDot/></span> {locationEnabled ? "Disable" : "Allow"} Location
</button>
<span className='text-black-400 text-xs'> if allow location doen't work then reload the page </span>
    </div>}
      <div onClick={() => { if (openVehicleModal) setVehicleModal(false) }} className='    w-full  '>
        <img className='w-16 absolute right-5 top-5 z-1' src="https://upload.wikimedia.org/wikipedia/commons/c/cc/Uber_logo_2018.png" alt="" />
        {["accepted", "ongoing"].includes(createdRide?.status) ?
          <LiveLocation position2={position2} height={'30vh'} /> :
          <LiveTracking locationEnabled={locationEnabled} position2={position3} height={"100vh"} />
        }
      </div>
      <Link to='/users/logout' className='fixed right-6 top-15 bg-white w-10 h-10 flex items-center justify-center rounded-xl'><IoIosLogOut size={15} /></Link>
      <Link to='/users/profile' className='fixed right-6 top-27 bg-white  w-10 h-10 flex items-center justify-center rounded-xl'><FcMenu size={15} /></Link>
      <div ref={modalRef} className='rounded-xl bg-white absolute w-full p-3 transition-all duration-300 ease-in-out z-2 '>
        <span ref={modalDownButtonRef} className='top-3 right-3 absolute ' onClick={() => setModal(false)}><IoChevronDownSharp size={29} /></span>  <h4 className='text-lg font-semibold mb-2'>Find a trip</h4>
        <form onSubmit={(e) => submitHandler(e)} >
          <img className=' absolute h-24 w-9' src="/straight -line.png" alt="" />
          <input required value={location} onChange={(e) => {
            setLocation(e.target.value)
            setIsUserTyped(true); // Mark as user-typed
          }}
            onClick={() => {
              if (!openModal) setModal(true);
              setinputType('location')
              setDestinationSuggestions([])

            }}
            className='bg-[#eeeeee] rounded px-4 py-2  w-full text-lg placeholder:text-base mb-1 pl-12 mb-4'
            type="text"
            placeholder='Add a pick-up location' />
          <input required value={destination}
            onChange={(e) => {
              setDestination(e.target.value)
              setIsUserTyped(true); // Mark as user-typed
            }}
            onClick={() => {
              if (!openModal) setModal(true);
              setPickupSuggestions([])
              setinputType('destination')
            }}
            className='bg-[#eeeeee] rounded px-4 py-2  w-full text-lg placeholder:text-base mb-1 pl-12'
            type="text"
            placeholder='Enter your destination' />

        </form>
        <div ref={findButtonRef} className=' items-center justify-center w-full my-2'>  <button onClick={handletrip} disabled={location === '' && destination === ''} className='bg-green-500 px-2 py-3 rounded-lg font-semibold text-white w-80 '>Find Trip</button></div>



        <div ref={locationPanel} className='p-2 mt-4 w-full'>
          {loading ? (
            <div className="fixed inset-0 flex items-center justify-center bg-black/30 backdrop-blur-md z-50">
              <Loading />
            </div>
          ) : (<LocationSearchPanel setIsUserTyped={setIsUserTyped} isUserTyped={isUserTyped} setDestinationSuggestions={setDestinationSuggestions} setPickupSuggestions={setPickupSuggestions} loading2={loading2} setDestination={setDestination} setLocation={setLocation} locationSuggestion={searchSuggestions} setVehicleModal={setVehicleModal} openVehicleModal={openVehicleModal} openModal={openModal} setModal={setModal} inputType={inputType} />)}
        </div>


      </div>
      <VehicleModal loading={loading} Vehicles={Vehicles} setSelectedVehicle={setSelectedVehicle} vehiclePanel={vehiclePanel} setconfirmVmodal={setconfirmVmodal} />
      <ConfirmRide createRide={createRide} location={location} destination={destination} confirmVehiclePanel={confirmVehiclePanel} setconfirmVmodal={setconfirmVmodal} selectedVehicle={selectedVehicle} setlookDriverModal={setlookDriverModal} />
      <LookingForDriver lookDriverRef={lookDriverRef} loading3={loading3} createdRide={createdRide} location={location} destination={destination} lookDriverModal={lookDriverModal} setlookDriverModal={setlookDriverModal} selectedVehicle={selectedVehicle} />
    </>
  )
}

export default Home
