import React from 'react'
import { useParams } from 'react-router-dom'
import { MdOutlineAlternateEmail } from 'react-icons/md'


export default function TopPrivateBar({friend}) {


  return (
    <div className='bg-[#36393e] w-full h-[70px] text-base shadow-sm shadow-[#1e2124] flex items-center text-gray-400 justify-between'>
        <div className='flex items-center'>
        <MdOutlineAlternateEmail className='ml-3 text-2xl' />
        <p className='ml-3 text-lg text-white'>{friend}</p>
        </div>
    </div>
  )
}
