import React from 'react'
import search from '../images/search.png'
import ola from '../images/ola.jfif'
import date from '../images/date.png'
import alert from '../images/alert.png'
import moment from 'moment'

function Header({theme}) {
  return (
    <div className={`xs:max-lg:hidden ${theme === "light" ? "bg-white" : "bg-gray-900" } h-full flex p-3 justify-between bg-red-80`}>
        <p className={` ${theme === "light" ? "bg-white text-[#26282C]" : "bg-gray-900 text-white" } font-jarkart w-[15%] font-semibold  text-2xl flex items-center justify-center`}>Dashboard</p>
        <div className={`flex justify-betwee gap-5  ${theme === "light" ? "bg-[#FAFAFA]" : "bg-gray-900" } `}>
            <div className='relative w-72  p-1'>
              <div className='absolute top-0 left-0 h-full aspect-square bg-red-40 flex items-center justify-center'>
                <div className='size-4'>
                <img src={search} alt="search icon" />
                </div>
                
              </div>
                <input type="search" placeholder='Search...' className='bg-transparent w-full h-full rounded-full border border-[#DADDDD] pl-10 pr-3 py-2 placeholder:font-inter placeholder:font-normal placeholder:text-[#A3A3A3] ' />
            </div>
            <div className='w-64 bg-yellow-40 flex items-center'>
                <div className='w-[80%] flex items-center bg-blue-60'>
                  <div className='w-[20%] h-full bg-red-40 flex items-center justify-center'>
                    <div className='size-5 bg-red-70'>
                    <img src={date} alt="calendar icon" className={`${theme !== "light" && "bg-gray-800 rounded-full size-3 object-contain w-full h-full" }`} />
                    </div>
                    
                  </div>
                  <p className={`w-[80%] bg-red-60 font-inter font-medium ${theme === "light" ? "text-[#26282C]" : "text-gray-300" } `}>{moment().format('LL')} </p>
                </div>
                <div className='w-[20%] flex items-center justify-center bg-red-40 '>
                  <div className='size-10 rounded-full border border-[#DADDDD] flex items-center justify-center  '>
                  <div className='size-5'>
                  <img src={alert} alt="notifications icon" />
                  </div>
                  </div>
                 
                </div>

            </div>

            <div className='w-52 bg-whit rounded-full border border-[#DADDDD] p-1 flex'>
              <div className='h-full aspect-square bg-red-30 rounded-full'>
                <img src={ola} alt="user image" className='h-full w-full object-cover rounded-full' />
              </div>
              <div className='bg-red-40 h-full w-full ml-2'></div>

            </div>

        </div>
    </div>
  )
}

export default Header
