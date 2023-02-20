import React from 'react'
import { useNavigate } from 'react-router-dom'

export default function SubChannel({name, changeChannel, server}) {

  const navigate = useNavigate()

  const handleChannel = () => {
    changeChannel(name)
    navigate(`/channels/${server}/${name}`)
  }


  return (
    <div onClick={handleChannel} className='flex ml-2 w-[90%] items-center rounded hover:bg-gray-700 py-1 text-gray-400 hover:text-gray-300 cursor-pointer'>
        <p className='text-xl ml-2'>#</p>
        <p className='ml-3'>{name}</p>
    </div>
  )
}
