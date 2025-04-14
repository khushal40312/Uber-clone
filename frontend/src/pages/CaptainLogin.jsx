import React, { useEffect, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { CaptainDataContext } from '../../context/CaptainContext'
import axios from 'axios'
import { toast } from 'react-toastify';


const CaptainLogin = () => {

  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const {isCaptainAuthenticated, setIsCaptainAuthenticated } = React.useContext(CaptainDataContext)

  const navigate = useNavigate();
  const submitHandler = async (e) => {

    e.preventDefault();
    const captainData = {
      email,
      password
    }
    toast.promise(
      axios.post(`${import.meta.env.VITE_BASE_URL}/captains/login`, captainData),
      {
        pending: 'Logging in as captain...',
        success: {
          render({ data }) {
            const res = data.data;
            setIsCaptainAuthenticated(true);
            localStorage.setItem('cap-token', res.token);
            navigate('/captain-home');
            return 'Captain login successful!';
          },
        },
        error: {
          render({ data }) {
            return data?.response?.data?.message || 'Captain login failed';
          },
        },
      }
    );
    setEmail('')
    setPassword('')


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
    <div className='p-7 h-screen flex flex-col justify-between '>
      <div>
        <img className='w-35 mb-10   ' src="/drivers.png" alt="" />
        <form onSubmit={(e) => {

          submitHandler(e)
        }}>
          <h3 className='text-lg font-medium mb-2'>What's your email?</h3>
          <input
            value={email}
            onChange={(e) => {
              setEmail(e.target.value)

            }}
            className='bg-[#eeeeee] rounded px-4 py-2  w-full text-lg placeholder:text-base mb-7'
            placeholder='email@example.com'
            type="email"
            required />
          <h3 className='text-lg font-medium mb-2'>Enter Password</h3>
          <input value={password}
            onChange={(e) => {
              setPassword(e.target.value)


            }} className='bg-[#eeeeee] rounded px-4 py-2  w-full text-lg placeholder:text-base mb-7 ' type="password" placeholder='password' />
          <button className='font-semibold w-full bg-black text-white py-3 rounded '>Login</button>
          <p className='my-2 text-center'>Join a fleet ? <Link to='/captain-signup' className='text-blue-600'>Register as a Captain</Link></p>
        </form></div>

      <div>
        <Link to='/login' className=' font-semibold flex items-center justify-center w-full bg-[#352d71] text-white py-3 rounded  '>Sign in as User</Link>
      </div>
    </div>
  )
}

export default CaptainLogin
