import axios from 'axios';
import React, { useEffect } from 'react'
import { useNavigate } from 'react-router-dom';
import Loading from '../components/Loading';

const CaptainLogout = () => {
    const navigate = useNavigate();

    useEffect(() => {
        const token = localStorage.getItem('cap-token');
        if (!token) {
            navigate('/captain-login'); // Redirect if there's no token
            return;
        }

        axios.get(`${import.meta.env.VITE_BASE_URL}/captains/logout`, {
            headers: {
                Authorization: `Bearer ${token}`
            }
        }).then((response) => {
            if (response.status === 200) {
                localStorage.removeItem('cap-token');
                navigate('/captain-login');
            }
        }).catch((error) => {
            console.error("Logout failed:", error);
            localStorage.removeItem('cap-token'); // Ensure token is removed on failure too
            navigate('/captain-login');
        });

    }, [navigate]); // Runs only on mount

    return <div className='w-full h-screen flex items-center justify-center '><Loading /></div>;
};

export default CaptainLogout
