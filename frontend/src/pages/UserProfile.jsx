import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { BsPersonRaisedHand } from "react-icons/bs";
import { FcGoogle, FcMenu } from "react-icons/fc";
import { FcMinus } from "react-icons/fc";
import { Link, useNavigate } from 'react-router-dom';
import { AiFillHome } from 'react-icons/ai';
import axios from 'axios';
import { UserAction } from '../store/userProfileSlice';
const UserProfile = () => {
    const user = useSelector((store) => store.user)
  const token = localStorage.getItem('token')

    const dispatch = useDispatch();
    useEffect(() => {
        if (token&&!user.user ) {
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

    const completedRides = user?.rides?.filter((elem) => elem.status === 'completed')

    return (
        <div className='w-full h-screen p-5'>
            <Link to='/home' className='fixed left-6 top-5 bg-white border-2 w-10 h-10 flex items-center justify-center rounded-xl'><AiFillHome size={15} /></Link>
            <h2 className='text-2xl font-semibold  text-center m-3'>Profile</h2>
            <div className=' m-3   '>
                <h2 className='font-semibold p-3  text-xl text-[#707070] flex justify-start gap-5 border-3 items-center rounded-xl my-2'> <span ><BsPersonRaisedHand /></span>  {user?.user?.fullname?.firstname} {user?.user?.fullname?.lastname}</h2>
                <h2 className=' p-5  text-sm text-[#707070] flex justify-start gap-5 items-center rounded-xl border-3 my-2'> <span ><FcGoogle /></span>  {user?.user?.email}</h2>
                <div className='flex items-center justify-center flex-col ' >

                    <div className='my-5 p-3 rounded-xl border-2 w-full '>

                        <h1 className='text-2xl font-bold text-center ' > {completedRides?.length}</h1>
                        <h3 className='text-center text-sm text-green-600 '> Completed Rides </h3>
                    </div>
                    <div  className='overflow-auto w-full h-80 '>
                    {completedRides?.map(ride => <div key={ride._id} className='m-2 p-1 flex items-center rounded-xl border-2  justify-center  '>

                        <span>  {ride.pickup.split(',')[0] || ride.pickup.split(' ')[0]}</span> <FcMinus size={50} /> <span>  {ride?.destination.split(',')[0] || ride?.destination.split(' ')[0]}</span>
                    </div>)}
                    </div>
                </div>
            </div>
        </div>
    )
}

export default UserProfile
