import React from 'react'
import { BiHash } from 'react-icons/bi'
import { useNavigate, useParams } from 'react-router-dom'
import { BsPeopleFill } from 'react-icons/bs'
import { MdOutlineHelp } from 'react-icons/md'
import axios from 'axios'
import { useEffect } from 'react'

export default function TopChatBar() {

  const data = useParams()
  const navigate = useNavigate()

  useEffect(() => {
    axios.get(`https://fierce-savannah-71823.herokuapp.com/servertocheck/${data.name}/${data.server}`).then(res => {
      if (res.data.length === 0) {
        navigate('/channeldoesnotexist')
      } else {
        return;
      }
    })
  }, [])

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
