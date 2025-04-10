import React, { useEffect, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'

import { UserDataContext } from '../../context/UserContext';
import axios from 'axios';

const UserLogin = () => {

  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  // const [userData, setUserData] = useState({})
  const {  setIsAuthenticated } = React.useContext(UserDataContext)
  const navigate = useNavigate();

  const submitHandler = async(e) => {

    e.preventDefault();
      const userData= {
      email,
      password
    }

    const response = await axios.post(`${import.meta.env.VITE_BASE_URL}/users/login`, userData)

    if (response.status === 200) {
      const data = response.data
      setIsAuthenticated(true)
      localStorage.setItem('token',data.token)
      navigate('/home')
    }
    setEmail('')
    setPassword('')


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
        <img className='w-26 mb-10   ' src="/Uber.png" alt="" />
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
          <p className='my-2 text-center'>New here?<Link to='/signup' className='text-blue-600'>Create new Account</Link></p>
        </form></div>

      <div>
        <Link to='/captain-login' className=' font-semibold flex items-center justify-center w-full bg-[#2d7134] text-white py-3 rounded  '>Sign in as Captain</Link>
      </div>
    </div>
  )
}

export default UserLogin
