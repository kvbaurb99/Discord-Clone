import React from 'react'
import { useNavigate } from 'react-router-dom'

export default function Channel({title, color}) {

    const navigate = useNavigate()

    const formattedTitle = `${title.charAt(0).toUpperCase()}${title.charAt(1)}${title.charAt(2)}`;
    

  return (
    <div onClick={() => navigate(`/channels/${title}`)} className={`w-[65%] h-[50px] ${color} mt-4 flex justify-center items-center cursor-pointer hover:bg-blue-500 border-gray-300 rounded-full hover:rounded-2xl `}>
        <div className='w-[80px] flex justify-center items-center'>
          <p className='rounded-full hover:rounded-2xl text-white font-bold text-sm'>{formattedTitle}</p>
        </div>
    </div>
  )
}
