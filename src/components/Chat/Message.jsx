import React, { useState } from 'react'
import { BsFillTrashFill } from 'react-icons/bs';
import { AiOutlineLoading3Quarters } from 'react-icons/ai'
import axios from 'axios';

export default function Message({text, user, img, time, item, username}) {

  const [loading, setLoading] = useState(false)

  const handleDelete = async (msg) => {
    setLoading(true)
    try {
        await axios.post('https://fierce-savannah-71823.herokuapp.com/api/messages', {
        id: msg
      })
      setLoading(false)
    } catch (err) {
      console.log(err)
      setLoading(false)
    }
};


  const newDate = new Date(time).toLocaleDateString([], {day: "numeric", month: "long"})
  const newTime = new Date(time).toLocaleTimeString([], {timeStyle: 'short'});

  const formatted = `${newDate} ${newTime}`

  return (
    <div className='md:w-[100%] w-[99%] flex items-center mb-4 hover:bg-[#282b30]/40 p-2 rounded-lg message mx-auto'>
        <div className='flex'>
            <img src={img} className='w-[30px] h-[30px] md:w-[40px] md:h-[40px] rounded-full' alt='user' />
        </div>
        <div className='flex flex-col text-sm ml-4'>
          <div className='flex items-center ml-1 md:ml-0'>
          <p className= 'font-bold'>{user}</p>
          <p className='ml-3 text-xs text-gray-400'>{formatted}</p>
          </div>
          <p className='break-words ml-1 md:ml-0'>{text}</p>
        </div>
        { username === user ?
        <div className='ml-auto'>
          {loading ? <AiOutlineLoading3Quarters className='animate-spin' /> : <BsFillTrashFill onClick={() => handleDelete(item)}  className='text-gray-400 hover:text-red-600 cursor-pointer' />}
        </div>
        :
        null
        }
    </div>
  )
}
