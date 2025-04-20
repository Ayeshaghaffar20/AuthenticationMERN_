import React, { useContext } from 'react'
import { assets } from '../assets/assets'
import { AppContext } from '../context/AppContext'

const Header = () => {
 
  const {userData} = useContext(AppContext)
   
  return (
    <div className='flex flex-col items-center mt-20 px-4 text-center text-gray-800'>
      <img className='mb-6 rounded-full w-36 h-36' src={assets.ai_robot} alt="" />
      <h1 className='flex items-center gap-2 text-xl sm:text-3xl font-medium mb-2'>Hey {userData ? userData.name : 'Developer'}!
        <img src={assets.hand_wave}  alt="" className='aspect-square w-8' />
        </h1>
      <h2 className='text-3xl sm:text-5xl font-semibold mb-4'>Welcome to our app</h2>
      <p className='mb-8 max-w-md'>Welcome! Your security is our priority. Log in to access your account safely and easily!</p>
      <button className='rounded-full border border-gray-500 px-8 py-2.5 hover:bg-gray-100 transition-all'>Get Started</button>
    </div>
  )
}

export default Header
