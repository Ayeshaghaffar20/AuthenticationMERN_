import React, { useContext, useState } from 'react'
import { assets } from '../assets/assets'
import { useNavigate } from 'react-router-dom'
import { AppContext } from '../context/AppContext'
import axios from 'axios'
import { toast } from 'react-toastify'


const Login = () => {

  const navigate = useNavigate()

  const {backendUrl,setIsLoggedIn, getUserData} = useContext(AppContext)

  

    const [state,setState] = useState('sign Up')
    const [name, setName] = useState('')
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')

    const onSubmitHandler = async (e)=>{
      try {
        e.preventDefault()

        axios.defaults.withCredentials = true

        if(state=== 'sign Up'){
          const {data} = await axios.post(backendUrl + '/api/auth/register' ,{name,email,password})

          if(data.success){
            localStorage.setItem('authToken', data.token); 
             toast.success("Account created successfully. Please log in.");
             setState('login'); 
           
          }else{
           toast.error(data?.message || 'Something went wrong');

          }
        }else{
          const {data} = await axios.post(backendUrl + '/api/auth/login' ,{email,password})
          
          if(data.success){
            localStorage.setItem('authToken', data.token);  
            setIsLoggedIn(true)
            setTimeout(() => {
              getUserData();
            }, 500); 
            navigate('/')
          }else{
             toast.error(data?.message || 'Something went wrong');

          }
        }

      } catch (error) {
          const message = error.response?.data?.message || "Something went wrong";
    toast.error(message);
        
      }

    }





  return (
    <div className='flex items-center justify-center min-h-screen px-6 sm:px-0 bg-gradient-to-br from-slate-300 to-neutral-500'>
    <img onClick={()=> navigate('/')} className='absolute left-5 sm:left-20 top-5 w-28 sm-w-32 cursor-pointer' src={assets.logo} alt="" />
    <div className='bg-slate-900 p-10 rounded-lg shadow-lg w-full sm:w-96 text-sm text-indigo-300'>
      <h2 className='text-3xl text-center font-semibold text-white mb-3'>{state === 'sign Up' ? 'Create Account' : 'Login'}</h2>
      <p className='text-sm text-center mb-6'>{state === 'sign Up' ? 'Create Your Account' : 'Login to your Account'}</p>
      <form onSubmit={onSubmitHandler}>
        {state === 'sign Up' && (  <div className='mb-4 flex item-center gap-3 px-5 py-2.5 rounded-full bg-[#333A5C]'>
          <img src={assets.person_icon} alt="" />
          <input onChange={e=> setName(e.target.value)}  value={name} className='bg-transparent outline-none' type="text" placeholder='Full name' required />
        </div>)}
      
        <div className='mb-4 flex item-center gap-3 px-5 py-2.5 rounded-full bg-[#333A5C]'>
          <img src={assets.mail_icon} alt="" />
          <input onChange={e=> setEmail(e.target.value)}  value={email} className='bg-transparent outline-none' type="email" placeholder='Email Id' required />
        </div>
        <div className='mb-4 flex item-center gap-3 px-5 py-2.5 rounded-full bg-[#333A5C]'>
          <img src={assets.lock_icon} alt="" />
          <input onChange={e=> setPassword(e.target.value)}  value={password} className='bg-transparent outline-none' type="password" placeholder='Password' required />
        </div>

        <p onClick={()=> navigate('/reset-password')}  className='mb-4 text-indigo-500 cursor-pointer'>Forgot Password?</p>
         <button className='w-full py-2.5 rounded-full cursor-pointer text-white font-medium bg-gradient-to-r from-indigo-500 to-indigo-900'>{state}</button>
        
      </form>

      {state === 'sign Up' ? (   <p className='text-gray-400 text-center text-xs mt-4'> Already Have an Account?{' '}
        <span onClick={()=> setState('login')} className='text-blue-400 underline cursor-pointer'>Login Here</span>
      </p>) : (  <p className='text-gray-400 text-center text-xs mt-4'> Don't have an account?{' '}
        <span  onClick={()=> setState('sign Up')} className='text-blue-400 underline cursor-pointer'>Sign Up</span>
      </p>)}

    

     
    </div>
    </div>
  )
}

export default Login
