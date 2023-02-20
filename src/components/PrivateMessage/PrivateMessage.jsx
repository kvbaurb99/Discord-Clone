import React, { useState } from 'react'
import { BsFillTrashFill } from 'react-icons/bs'
import axios from 'axios';
import { AiOutlineLoading3Quarters } from 'react-icons/ai';

export default function PrivateMessage({name, message, date, id, username}) {

    const newDate = new Date(date).toLocaleDateString([], {day: "numeric", month: "long"})
    const newTime = new Date(date).toLocaleTimeString([], {timeStyle: 'short'});
    const [loading, setLoading] = useState(false)
  
    const formatted = `${newDate} ${newTime}`

    const handleDelete =  (msg) => {
        setLoading(true)
        axios.post(`https://fierce-savannah-71823.herokuapp.com/api/privatemessages`, {
         messageid: msg
        }).then(res => {
            setLoading(false)
        })
     }

  return (
    <div className='w-full flex items-center mb-4 hover:bg-[#282b30]/40 p-2 rounded-lg message'>
    <div className='flex'>
        <img src='https://icon-library.com/images/yellow-discord-icon/yellow-discord-icon-15.jpg' className='w-[40px] h-[40px] rounded-full' alt='user' />
    </div>
    <div className='flex flex-col text-sm ml-4'>
      <div className='flex items-center '>
      <p className='font-bold'>{name}</p>
      <p className='ml-3 text-xs text-gray-400'>{formatted}</p>
      </div>
      <p className='break-words w-[1400px]'>{message}</p>
    </div>
    <div>
        { username === name ?
      <div>
        {loading ? <AiOutlineLoading3Quarters className='animate-spin' /> : <BsFillTrashFill onClick={() => handleDelete(id)} className='text-gray-400 hover:text-red-600 cursor-pointer' />}
      </div>
            :
          null  
        }
    </div>
</div>
  )
}
