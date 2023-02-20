import React from 'react'
import { BiHash } from 'react-icons/bi'
import { useParams } from 'react-router-dom'
import {BsFillChatLeftFill, BsFillInboxFill} from 'react-icons/bs'
import { MdOutlineHelp } from 'react-icons/md'
import { Link } from 'react-router-dom'


export default function TopBar({channel}) {

  const chat = useParams()
 

  return (
    <div className='bg-[#36393e] w-full h-[64px] text-lg shadow-sm shadow-[#1e2124] flex items-center justify-between'>
        <div className='flex items-center'>
        <BiHash className='text-gray-500 text-3xl ml-4' />
        <p className='text-base text-gray-300 ml-2 font-bold'>{chat.name}</p>
        </div>
    </div>
  )
}
