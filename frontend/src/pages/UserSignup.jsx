import React, { useEffect, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { toast } from 'react-toastify';

import axios from 'axios';
import { UserDataContext } from '../../context/UserContext';
const UserSignup = () => {



  const [firstname, setFirstname] = useState('')
  const [lastname, setLastname] = useState('')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const navigate = useNavigate();

  const { isAuthenticated,setIsAuthenticated } = React.useContext(UserDataContext)

  const submitHandler = async (e) => {

    e.preventDefault();
    const newUser = ({
      fullname: {
        firstname,
        lastname
      },
      email,
      password


    })
    toast.promise(
      axios.post(`${import.meta.env.VITE_BASE_URL}/users/register`, newUser),
      {
        pending: 'Creating account...',
        success: {
          render({ data }) {
            const res = data.data;
            setIsAuthenticated(true);
            navigate('/home');
            return 'Signup successful!';
          },
        },
        error: {
          render({ data }) {
            return data?.response?.data?.message || 'Signup failed';
          },
        },
      }
    );
    setEmail('')
    setPassword('')
    setFirstname('')
    setLastname('')



  }
  useEffect(() => {
    const token = localStorage.getItem("token");
    
    const capToken = localStorage.getItem("cap-token");

    if (token) {
      navigate("/home"); // Redirect authenticated users to home
    }else if (capToken) {
      navigate('/captain-home')
    }
  }, [navigate]);
  return (
    <div className='p-7 h-screen flex flex-col justify-between '>
      <div>
        <img className='w-26 mb-5   ' src="/Uber.png" alt="" />
        <form
          onSubmit={(e) => { submitHandler(e) }}
        >
          <h3 className='text-lg font-medium mb-2'>What's your name?</h3>
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
          <h3 className='text-lg font-medium mb-2'>What's your email?</h3>
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
          <button className='font-semibold w-full bg-black text-white py-3 rounded '>Create Account</button>
          <p className='my-2 text-center'>Already have an account? <Link to='/login' className='text-blue-600'>Login in here</Link></p>
        </form></div>

      <div>
        <p className='text-[8px]'>By proceeding, you consent to girt calls, WhatsApp or SMS messages, including by automated means, from Uber and its affiliates to the number provided.</p>
      </div>
    </div>
   
  )
}

export default UserSignup
