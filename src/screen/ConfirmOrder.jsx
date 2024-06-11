import React, { useEffect, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';

const ConfirmOrder = ({mode,checkMode}) => {
    const data = new URLSearchParams(window.location.search)
    const [otp,setOtp] = useState(data.get('otp'))
    const navigate = useNavigate();
    const location = useLocation()
    useEffect(() => {
        // Extract the OTP from the query string
        const params = new URLSearchParams(location.search);
        const otpValue = params.get('otp');
        if (otpValue) {
          setOtp(otpValue);
          
          // Update the URL to remove the OTP query parameter
          const newUrl = location.pathname;
          navigate(newUrl, { replace: true });
        }
      }, [location, navigate]);
  return (
    <div className='flex w-full items-center justify-center min-h-screen flex-col gap-y-4' >
        <span className='text-4xl text-green-600 font-bold mb-5'> {checkMode('Order Number','رقم الطلب').word}</span>
        <span className='text-gray-500 font-bold'>فضلا قم باختيار رقم الطلب الظاهر في تطبيق نفاذ</span>
        <div className='flex flex-col justify-center items-center text-gray-500 font-bold gap-1'>
            <span dir={mode === 'ar' ? 'rtl': 'ltr'} >{checkMode('1- Open Navaz App','1- ادخل تطبيق نفاذ').word}</span>
            <span dir={mode === 'ar' ? 'rtl': 'ltr'} >{checkMode('2- Click on “Complete”, then confirm the number that appears','2- اضغط علي اكمال ثم اكدد الرقم الظاهر').word}</span>
            <span dir={mode === 'ar' ? 'rtl': 'ltr'} >{checkMode('3- Prove Interface Image','3- اثبت صورة الوجهه').word}</span>
        </div>
        <span className='min-w-20 my-5 rounded-full min-h-20 bg-gray-300 flex items-center justify-center text-4xl text-white'>
                {otp}
        </span>
        <span onClick={()=>window.location.href='/navaz'} className='text-green-600 font-bold text-2xl'>رجوع</span>
    </div>
  )
}

export default ConfirmOrder