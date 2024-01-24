import React from 'react'
import search from '../images/search.png'
import ola from '../images/ola.jfif'

function Header({theme}) {
  return (
    <div className={`xs:max-lg:hidden ${theme === "light" ? "bg-white" : "bg-gray-900" } h-full flex p-3 justify-between bg-red-80`}>
        <p className={` ${theme === "light" ? "bg-white text-[#26282C]" : "bg-gray-900 text-white" } font-jarkart w-[15%] font-semibold  text-2xl flex items-center justify-center`}>Dashboard</p>
        <div className='flex justify-between items-cente w-[70%] bg-[#FAFAFA] '>
            <div className='relative w-[30%] bg-white'>
              <div className='absolute h-full aspect-square bg-red-40 flex items-center justify-center'>
                <div className='size-4'>
                <img src={search} alt="search icon" />
                </div>
                
              </div>
                <input type="search" className='w-full h-full rounded-full border border-[#DADDDD] pl-10 pr-3 py-2  ' />
            </div>
            <div className='w-[30%] bg-yellow-40 flex justify-between'>
                <div className='w-[70%] border'></div>
                <div className='h-full aspect-square rounded-full border border-[#DADDDD] '></div>

            </div>

            <div className='w-[30%] bg-white rounded-full border border-[#DADDDD] p-1 flex'>
              <div className='h-full aspect-square bg-red-300 rounded-full'>
                <img src={ola} alt="user image" className='h-full w-full object-cover rounded-full' />
              </div>
              <div className='bg-red-500 h-full w-full ml-2'></div>

            </div>

        </div>
    </div>
  )
}

export default Header
