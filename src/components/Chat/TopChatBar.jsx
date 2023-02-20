import React from 'react'
import { BiHash } from 'react-icons/bi'
import { useParams } from 'react-router-dom'
import { BsPeopleFill } from 'react-icons/bs'
import { MdOutlineHelp } from 'react-icons/md'

export default function TopChatBar() {

  const data = useParams()

  const extendBar = () => {
    let bar = document.querySelector('.extend-start')
    bar.classList.toggle('extend')
  }

  return (
    <div className='bg-[#36393e] w-full h-[70px] text-lg shadow-sm shadow-[#1e2124] flex items-center justify-between'>
        <div className='flex items-center'>
        <BiHash className='text-gray-500 text-3xl ml-4' />
        <p className='text-base text-gray-300 ml-2 font-bold'>{data.name}</p>
        </div>
        <div className='text-gray-400 flex text-2xl mr-6 items-center' >
            <BsPeopleFill onClick={extendBar} className='mr-6 hover:text-gray-300 cursor-pointer' />
            <MdOutlineHelp className='hover:text-gray-300 cursor-pointer' />
        </div>
    </div>
  )
}
