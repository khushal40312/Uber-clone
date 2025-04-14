import axios from 'axios';
import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import Loading from '../components/Loading';

const UserLogout = () => {
    const navigate = useNavigate();

    useEffect(() => {
        const token = localStorage.getItem('token');
        if (!token) {
            navigate('/login'); // Redirect if there's no token
            return;
        }

        axios.get(`${import.meta.env.VITE_BASE_URL}/users/logout`, {
            headers: {
                Authorization: `Bearer ${token}`
            }
        }).then((response) => {
            if (response.status === 200) {
                localStorage.removeItem('token');
                navigate('/login');
            }
        }).catch((error) => {
            console.error("Logout failed:", error);
            localStorage.removeItem('token'); // Ensure token is removed on failure too
            navigate('/login');
        });

    }, [navigate]); // Runs only on mount

    return <div className='w-full h-screen flex items-center justify-center '><Loading /></div>;
};

export default UserLogout;
