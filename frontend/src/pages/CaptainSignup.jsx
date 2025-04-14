import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { CaptainDataContext } from '../../context/CaptainContext'
import { toast } from 'react-toastify';

const CaptainSignup = () => {



  const [firstname, setFirstname] = useState('')
  const [lastname, setLastname] = useState('')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [vehicleColor, setvehicleColor] = useState('')
  const [vehiclePlate, setVehiclePlate] = useState('')
  const [vehicleCapacity, setVehicleCapacity] = useState('')
  const [vehicleType, setVehicleType] = useState('')
const { setIsCaptainAuthenticated} = React.useContext(CaptainDataContext)
const navigate = useNavigate();
  const submitHandler = async (e) => {

    e.preventDefault();
    const captainData = ({
      fullname: {
        firstname,
        lastname
      },
      email,
      password,
      vehicle: {
        color: vehicleColor,
        plate: vehiclePlate,
        vehicleType: vehicleType,
        capacity: vehicleCapacity
      }

    })
    toast.promise(
      axios.post(`${import.meta.env.VITE_BASE_URL}/captains/register`, captainData),
      {
        pending: 'Creating captain account...',
        success: {
          render({ data }) {
            const res = data.data;
            setIsCaptainAuthenticated(true);
            localStorage.setItem('cap-token', res.token);
            navigate('/captain-home');
            return 'Captain account created successfully!';
          },
        },
        error: {
          render({ data }) {
            return data?.response?.data?.message || 'Captain signup failed';
          },
        },
      }
    );
    setEmail('')
    setPassword('')
    setFirstname('')
    setLastname('')
    setVehicleCapacity('')
    setVehiclePlate('')
    setVehicleType('')
    setvehicleColor('')



  }
   useEffect(() => {
      const token = localStorage.getItem("cap-token");
      const userToken= localStorage.getItem('token')
      if (token) {
        navigate("/captain-home"); // Redirect authenticated users to home
      }else if(userToken){

        navigate('/home')
      }
    }, [navigate]);
  return (
    <div className='p-6 h-screen flex flex-col justify-between '>
      <div>
        <img className='w-29 mb-5   ' src="/drivers.png" alt="" />
        <form
          onSubmit={(e) => { submitHandler(e) }}
        >
          <h3 className='text-lg font-medium mb-2'>What's our Captain's name?</h3>
          <div className='flex justify-between w-full items-center gap-3 mb-5'>
            <input
              value={firstname}
              onChange={(e) => setFirstname(e.target.value)}
              className='bg-[#eeeeee] rounded px-4 py-2  w-1/2 text-lg placeholder:text-base '
              placeholder='First name'
              type="text"
              required />
            <input
              value={lastname}
              onChange={(e) => setLastname(e.target.value)}
              className='bg-[#eeeeee] rounded px-4 py-2  w-1/2 text-lg placeholder:text-base '
              placeholder='Last name'
              type="text"
              required />
          </div>
          <h3 className='text-lg font-medium mb-2'>What's our Captain's email?</h3>
          <input
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className='bg-[#eeeeee] rounded px-4 py-2  w-full text-lg placeholder:text-base mb-5'
            placeholder='email@example.com'
            type="email"
            required />
          <h3 className='text-base font-medium mb-2'>Enter Password</h3>
          <input
            value={password}
            onChange={(e) => {
              setPassword(e.target.value)
            }}
            className='bg-[#eeeeee] rounded px-4 py-2  w-full text-lg placeholder:text-base mb-5 ' type="password" placeholder='password' />
          <h3 className='text-lg font-medium mb-2'>Vehicle Information?</h3>
          <div className='flex justify-between w-full items-center gap-3 mb-5'>
            <input
              value={vehicleColor}
              onChange={(e) => setvehicleColor(e.target.value)}
              className='bg-[#eeeeee] rounded px-4 py-2  w-1/2 text-lg placeholder:text-base '
              placeholder='Vehicle Color'
              type="text"
              required />
            <input
              value={vehiclePlate}
              onChange={(e) => setVehiclePlate(e.target.value)}
              className='bg-[#eeeeee] rounded px-4 py-2  w-1/2 text-lg placeholder:text-base '
              placeholder='Vehicle Plate'
              type="text"
              required />
          </div>
          <div className='flex justify-between w-full items-center gap-3 mb-5'>
            <input
              value={vehicleCapacity}
              onChange={(e) => setVehicleCapacity(e.target.value)}
              className='bg-[#eeeeee] rounded px-4 py-2  w-1/2 text-lg placeholder:text-base '
              placeholder='Vehicle Capacity'
              type="number"
              required />
            <select
              onChange={(e) => setVehicleType(e.target.value)}
              required
              className='bg-[#eeeeee] rounded px-4 py-2  w-1/2 text-sm placeholder:text-base '
              value={vehicleType}>

              <option value="" disabled>Vehicle Type</option>
              <option value="car">Car</option>
              <option value="auto">Auto</option>
              <option value="moto">Moto</option>
            </select>
          </div>
          <button className='font-semibold w-full bg-black text-white py-3 rounded '>Sign up</button>
          <p className='my-2 text-center'>Already have an account? <Link to='/signup' className='text-blue-600'>Login in here</Link></p>
        </form></div>

      <div>
        <p className='text-[6px]'>By proceeding, you consent to girt calls, WhatsApp or SMS messages, including by automated means, from Uber and its affiliates to the number provided.</p>
      </div>
    </div>
  )
}

export default CaptainSignup;
