import React, { Suspense, lazy, useEffect, useState } from 'react'
import { Navigate, Route, Routes } from 'react-router-dom'
import Loading from './components/Loading'
import UserLogout from './pages/UserLogout'
import { UserDataContext } from '../context/UserContext'
import { CaptainDataContext } from '../context/CaptainContext'
import CaptainHome from './pages/CaptainHome'
import CaptainLogout from './pages/CaptainLogout'
import Riding from './pages/Riding'
import CaptainRiding from './pages/CaptainRiding'
import { ToastContainer } from 'react-toastify';
import UserProfile from './pages/UserProfile'
import axios from 'axios'

// Lazy-loaded components
const Start = lazy(() => import('./pages/Start'))
const UserLogin = lazy(() => import('./pages/UserLogin'))
const UserSignup = lazy(() => import('./pages/UserSignup'))
const CaptainSignup = lazy(() => import('./pages/CaptainSignup'))
const CaptainLogin = lazy(() => import('./pages/CaptainLogin'))
const Home = lazy(() => import('./pages/Home'))

const App = () => {
  const { isAuthenticated } = React.useContext(UserDataContext)
  const { isCaptainAuthenticated } = React.useContext(CaptainDataContext)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    axios.get('/')
      .then(response => {
        console.log("started")
        setLoading(false)
      })
      .catch(error => {
        console.error('Error fetching data:', error)
        setLoading(false) // still remove loading to prevent infinite spinner
      })
  }, [])

  if (loading) {
    return <div className='w-full h-screen flex items-center justify-center'><Loading /></div>
  }

  return (
    <>
      <ToastContainer position="top-center" autoClose={3000} hideProgressBar />
      <div className=''>
        <Suspense fallback={<div className='w-full h-screen flex items-center justify-center'><Loading /></div>}>
          <Routes>

            {!isCaptainAuthenticated ? (
              <Route path='/captain-home' element={<Navigate to="/captain-login" replace />} />
            ) : (
              <>
                <Route path='/captain-home' element={<CaptainHome />} />
                <Route path='/captains/logout' element={<CaptainLogout />} />
                <Route path='/captain-riding' element={<CaptainRiding />} />
              </>
            )}

            <Route path='/login' element={<UserLogin />} />
            <Route path='/signup' element={<UserSignup />} />
            <Route path='/captain-login' element={<CaptainLogin />} />
            <Route path='/captain-signup' element={<CaptainSignup />} />
            <Route path='/' element={<Start />} />

            {!isAuthenticated ? (
              <Route path="*" element={<Navigate to="/login" replace />} />
            ) : (
              <>
                <Route path='/home' element={<Home />} />
                <Route path='/riding' element={<Riding />} />
                <Route path='/users/logout' element={<UserLogout />} />
                <Route path='/users/profile' element={<UserProfile />} />
              </>
            )}
          </Routes>
        </Suspense>
      </div>
    </>
  )
}

export default App
