import React, { useContext, useRef, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { assets } from '../assets/assets'
import { AppContext } from '../context/AppContext'
import axios from 'axios'
import { toast } from 'react-toastify'

const ResetPassword = () => {

  const {backendUrl } = useContext(AppContext)
   axios.defaults.withCredentials = true


  const navigate = useNavigate()

  const [email,setEmail] = useState('')
  const [newPassword,setNewPassword] = useState('')
  const [isEmailSent,setIsEmailSent] = useState('')
  const [otp,setOtp] = useState(0)
  const [IsOtpSubmited,setIsOtpSubmited] = useState(false)


   const inputRefs = useRef([])
  
    const handleInput = (e,index)=>{
      if(e.target.value.length > 0  && index < inputRefs.current.length - 1 ){
        inputRefs.current[index + 1].focus();
      }
  
    }
  
    const handleKeyDown =(e,index)=>{
      if(e.key=== 'Backspace' && e.target.value ==='' && index >0){
        inputRefs.current[index - 1].focus();
      }
  
    }
  
    const handlePaste = (e)=>{
      const paste = e.clipboardData.getData('text')
      const pasteArray= paste.split('')
      pasteArray.forEach((char,index) => {
        if(inputRefs.current[index]){
          inputRefs.current[index].value = char
        }
        
      });
  
    }

    const onEmailSubmit = async (e)=>{
       e.preventDefault()
      try {
        const {data} = await axios.post(backendUrl + '/api/auth/send-reset-otp' ,{email})
        data.success ? toast.success(data.message) :  toast.error(data.messag);
        data.success && setIsEmailSent(true)
      } catch (error) {
        toast.error(error.message)
      }
    }

    const onSubmitOtp = async (e) =>{
       e.preventDefault()
       const otpArray = inputRefs.current.map(e=> e.value)
       setOtp(otpArray.join(''))
       setIsOtpSubmited(true)
    }

    const onSubmitNewPassword = async (e) =>{
       e.preventDefault()

       try {
        const {data} = await axios.post(backendUrl + '/api/auth/reset-password' ,{email,otp,newPassword})
        data.success ? toast.success(data.message) :  toast.error(data.messag);
        data.success && navigate('/login')
       } catch (error) {
        toast.error(error.message)
       }

    }



  return (
    <div className='flex items-center justify-center min-h-screen bg-gradient-to-br from-slate-300 to-neutral-500'>
      <img onClick={()=> navigate('/')} className='absolute left-5 sm:left-20 top-5 w-28 sm-w-32 cursor-pointer' src={assets.logo} alt="" />

{!isEmailSent &&
      <form onSubmit={onEmailSubmit} className='bg-slate-900 p-8 rounded-lg  shadow-lg w-96 text-sm '>
         <h1 className='text-white text-2xl font-semibold text-center mb-4'>Reset Password</h1>
        <p className='text-center mb-6 text-indigo-300'>Enter your Registered Email Id</p>
        <div className='mb-4 flex items-center gap-3 w-full px-5 py-2.5 rounded-full bg-[#333A5C]'>
          <img src={assets.mail_icon} alt="" className='w-3 h-3' />
          <input type="email" placeholder='Email Id' className='bg-transparent outline-none text-white' value={email} onChange={e=> setEmail(e.target.value)}/>
        </div>
        <button className='w-full py-2.5 mt-3 text-white rounded-full bg-gradient-to-r from-indigo-500 to-indigo-900 cursor-pointer '>Submit</button>
      </form>
}


      {/* Otp Send Form */}
       
       {!IsOtpSubmited && isEmailSent && 

            <form onSubmit={onSubmitOtp} className='bg-slate-900 p-8 rounded-lg  shadow-lg w-96 text-sm '>
        <h1 className='text-white text-2xl font-semibold text-center mb-4'>Reset Password OTP</h1>
        <p className='text-center mb-6 text-indigo-300'>Enter the 6-digit code send to your Email Id</p>
        <div className='flex justify-between mb-8 ' onPaste={handlePaste}>
          {Array(6).fill(0).map((_, index)=>(
            <input type="text" maxLength={1} key={index} required className='w-12 h-12 text-white text-center text-xl rounded-md bg-[#333A5C]' ref={e=> inputRefs.current[index] = e} onInput={(e)=> handleInput(e,index )}
            onKeyDown={(e)=> handleKeyDown(e,index)}/>
          )
          )}

        </div>  
        <button className='w-full py-2.5 text-white rounded-full bg-gradient-to-r from-indigo-500 to-indigo-900 cursor-pointer '>Submit</button>
      </form> }



      {/* Enter New Password  */}

      {IsOtpSubmited && isEmailSent && 

       <form onSubmit={onSubmitNewPassword} className='bg-slate-900 p-8 rounded-lg  shadow-lg w-96 text-sm '>
         <h1 className='text-white text-2xl font-semibold text-center mb-4'>New Password</h1>
        <p className='text-center mb-6 text-indigo-300'>Enter the New Password below</p>
        <div className='mb-4 flex items-center gap-3 w-full px-5 py-2.5 rounded-full bg-[#333A5C]'>
          <img src={assets.lock_icon} alt="" className='w-3 h-3' />
          <input type="password" placeholder='Password' className='bg-transparent outline-none text-white' value={newPassword} onChange={e=> setNewPassword(e.target.value)}/>
        </div>
        <button className='w-full py-2.5 mt-3 text-white rounded-full bg-gradient-to-r from-indigo-500 to-indigo-900 cursor-pointer '>Submit</button>
      </form> }

        
      
    </div>
  )
}

export default ResetPassword
