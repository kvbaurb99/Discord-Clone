import React, { useEffect } from 'react'
import { BiHash } from 'react-icons/bi'
import { useNavigate, useParams } from 'react-router-dom'
import axios from 'axios'


export default function TopBar() {

  const chat = useParams()
  const navigate = useNavigate()

  useEffect(() => {
    axios.get(`https://fierce-savannah-71823.herokuapp.com/channeltocheck/${chat.name}`).then(res => {
      if (res.data.length === 0) {
        navigate('/channeldoesnotexist')
      } else {
        return;
      }
    })
  }, [])


 

  return (
    <div className='bg-[#36393e] w-full h-[64px] text-lg shadow-sm shadow-[#1e2124] flex items-center justify-between'>
        <div className='flex items-center'>
        <BiHash className='text-gray-500 text-3xl ml-4' />
        <p className='text-base text-gray-300 ml-2 font-bold'>{chat.name}</p>
        </div>
    </div>
  )
}
