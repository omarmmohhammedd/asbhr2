import React from 'react'
import { BsBookHalf } from 'react-icons/bs'
import { FiSearch } from 'react-icons/fi'

const NavBar = ({setMode,mode,checkMode}) => {

  return (
    <div className='w-full flex flex-col md:flex-row justify-around bg-white drop-shadow-lg p-2' dir={`${checkMode() === 'ar'?'rtl' : 'ltr' }`}>
        <div className='flex'>
        <div className="flex  items-center md:w-fit w-full gap-x-5 px-4">
                <img src='/main_images/nav3.jpg' className='lg:block hidden'/>
                <div className='md:flex flex-col hidden items-center gap-y-2 md:w-20 md:h-20 w-12 h-12 rounded-xl justify-center shadow-sm cursor-pointer select-none' style={{border:'1px solid #eee'}}>
                    <FiSearch className='text-green-600 md:w-8 md:h-8 w-4 h-4' />
                    <span className='text-sm '>{checkMode('Search','ابحث').word}</span>
                </div>
                <span className='text-green-600 cursor-pointer select-none hover:text-blue-900   pb-1 text-xs md:text-base w-fit ' onClick={()=>{
                    localStorage.setItem('lang',mode === 'ar' ? 'en' : 'ar')
                    setMode(mode === 'ar' ? 'en' : 'ar')
                }}>{mode === 'ar' ? 'English' : 'العربيه'}</span>            </div>
                 <div className='md:hidden justify-center items-center  flex   gap-x-2   mx-4 cursor-pointer ' onClick={()=>window.location.href='/main'}>
                    <img src='/main_images/nav1.png' className='w-10 h-10 md:w-20 md:h-20 lg:w-24 lg:h-24 lg:ml-8' style={mode==='ar'?{borderLeft:'1px solid #eee'}: {borderRight:'1px solid #eee'}}/>
                    <img src='/main_images/nav2.png' className='w-10 h-10 md:w-14 md:h-14 lg:w-20 lg:h-20' />
                </div>
        </div>
      
            <div className='flex md:w-fit justify-between items-start py-2 w-full'>
                <div className='flex gap-x-2 flex-1  items-stretch md:items-start justify-center'>
                <div className=' md:w-20 md:h-20 w-1/5 rounded-xl  shadow-sm  navCard' style={{border:'1px solid #eee'}}>
                    <BsBookHalf className='md:text-2xl text-xl  text-green-600 flex-1'/>
                    <span className='navDesc'>{checkMode('Services guide','دليل الخدمات').word}</span>   
                </div>
                    <div className=' md:w-20 md:h-20 w-1/5 rounded-xl  shadow-sm  navCard' style={{border:'1px solid #eee'}}>
                        <img src='/main_images/nav4.png' className='md:w-12 md:h-12 w-8 h-8 flex-1'/>
                        <span className='navDesc'>{checkMode('E-services','لخدمات الالكترونيه').word}</span>
                    </div>
                    <div className='md:w-20 md:h-20 w-1/5 rounded-xl  shadow-sm  navCard' style={{border:'1px solid #eee'}}>
                        <img src='/main_images/nav5.png' className='md:w-12 md:h-12 w-8 h-8 flex-1'/>
                        <span className='navDesc'>{checkMode('About Abshr','عن ابشر').word}</span>   
                    </div>
                    <div className=' md:w-20 md:h-20 w-1/5 rounded-xl  shadow-sm  navCard' style={{border:'1px solid #eee'}}>
                    <FiSearch className='text-green-600 md:text-2xl text-xl flex-1' />
                    <span className='navDesc '>{checkMode('Search','ابحث').word}</span>
                </div>
                </div>
                <div className='hidden justify-center items-center md:flex-1 md:flex   gap-x-2 md:gap-x-5  mx-4 cursor-pointer ' onClick={()=>window.location.href='/main'}>
                    <img src='/main_images/nav1.png' className='w-10 h-10 md:w-20 md:h-20 lg:w-24 lg:h-24 lg:ml-8' style={mode==='ar'?{borderLeft:'1px solid #eee'}: {borderRight:'1px solid #eee'}}/>
                    <img src='/main_images/nav2.png' className='w-10 h-10 md:w-14 md:h-14 lg:w-20 lg:h-20' />
                </div>
            </div>
        </div>
  )
}

export default NavBar