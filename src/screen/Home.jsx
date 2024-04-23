import React from 'react'
import { useNavigate } from 'react-router-dom'
const Home = () => {
  const navigate = useNavigate()
  return (
    <div className='flex flex-col w-full   items-center h-screen p-10 bg-cover bg-center home' >
      <div className='flex justify-end w-full mb-8 md:m-0 '>
        <img src='/logo.png' className=''/>
      </div>
      <div className='flex md:flex-row-reverse flex-col flex-wrap justify-center items-center gap-x-3 flex-1 gap-y-10 py-5 '>
      <div >
        <div className='md:w-72 md:h-72 w-80   flex md:flex-col flex-row-reverse  justify-center md:items-center rounded-xl card' onClick={()=> navigate('/main')}>
          <div className='md:flex-1  bg-gray-200 flex items-center justify-center w-full md:rounded-t-xl  rounded-r-xl  hover:bg-green-200 '>
          <div className="front"><img src='individual 1.png' className='h-32 p-3 md:p-0'/></div>
          <div className="back"><img src='individual.png' className='h-40 p-3 md:p-0'/></div>
          </div>
          <div className='flex flex-col bg-green-600 w-full  md:rounded-b-xl  rounded-l-xl '>
            <div className='flex flex-col justify-center items-center  my-1 py-1 flex-1'>
            <span className='text-xl  text-white'>افراد</span>
            <span className='text-xl  text-white'>Individuals</span>
            </div>
          </div>
        </div>
        <div className='hidden md:flex flex-col gap-y-1 items-center justify-center mt-3'>
          <span className='text-xl  text-black'>خدمات الكترونيه متكامله</span>
          <span className='text-xl  text-black'>Integrated eServices</span>
        </div> 
        </div>
      <div>
        <div className='md:w-72 md:h-72 w-80   flex md:flex-col flex-row-reverse justify-center md:items-center  rounded-xl card ' onClick={()=> navigate('/main')}>
          <div className='md:flex-1 bg-gray-200 flex items-center justify-center w-full md:rounded-t-xl  rounded-r-xl hover:bg-blue-200 '>
            <div className="front"><img src='individual 2.png' className='h-32 p-3 md:p-0'/></div>
            <div className="back"><img src='individual.png' className='h-40 p-3 md:p-0'/></div>
          </div>
          <div className='flex flex-col bg-blue-600 w-full  md:rounded-b-xl  rounded-l-xl'>
            <div className='flex flex-col justify-center items-center  my-1 py-1 flex-1'>
            <span className='text-xl  text-white'>أعمال</span>
            <span className='text-xl text-white'>Business</span>
            </div>
          </div>
        </div>
        <div className='hidden md:flex flex-col gap-y-1 items-center justify-center mt-3'>
          <span className='text-xl  text-black'>خدمات اعمالك بين يديك </span>
          <span className='text-xl  text-black'>Establishments eServices</span>
        </div> 
        </div>
      <div>
        <div className='md:w-72 md:h-72 w-80   flex md:flex-col flex-row-reverse justify-center md:items-center  rounded-xl card' onClick={()=> navigate('/main')}>
          <div className='md:flex-1 bg-gray-200 flex items-center justify-center w-full md:rounded-t-xl  rounded-r-xl hover:bg-blue-200'>
          <div className="front"><img src='individual 3.png' className='h-32 md:p-0 p-3'/></div>
          <div className="back"><img src='individual.png' className='h-40 md:p-0 p-3'/></div>
          </div>
          <div className='flex flex-col bg-amber-950 w-full md:rounded-b-xl  rounded-l-xl'>
            <div className='flex flex-col justify-center items-center  my-1 py-1 flex-1'>
            <span className='text-xl  text-white'>حكومة</span>
            <span className='text-xl  text-white'>Government</span>
            </div>
          </div>
        </div>
        <div className='hidden md:flex flex-col gap-y-1 items-center justify-center mt-3'>
          <span className='text-xl  text-black'> خدمات على مدار الساعة  </span>
          <span className='text-xl  text-black'>Available 24/7</span>
        </div> 
        </div>
      </div>
    </div>
  )
}

export default Home