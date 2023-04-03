import React from 'react'
import { BsFillTrashFill } from 'react-icons/bs'
import axios from 'axios'
import { AiOutlineLoading3Quarters } from 'react-icons/ai'
import { useState } from 'react'

export default function Friends({name, url, username, setUserFriends, userFriends}) {

    const [loading, setLoading] = useState(false)

    const deleteFriend = () => {
        setLoading(true);
      
        axios.post('https://fierce-savannah-71823.herokuapp.com/deletefriend', {
          user: username,
          friend: name
        })
        .then((res) => { 
          // manually remove friend from state of userFriends  
          setLoading(false);
        })
        .catch(error => {
          console.error(error);
          setLoading(false);
        });
      };

  return (
    <div className='flex px-8 py-4 items-center border-t border-gray-400/20 w-[95%] mx-auto justify-between hover:bg-gray-400/20 rounded'>
    <div className='flex items-center'>
        <img src={url} alt='logo' className='w-[40px] h-[40px] rounded-full object-fit'  />
        <div className='flex flex-col text-xs ml-4'>
            <p className='text-white font-bold text-sm'>{name}</p>
            <p className='text-gray-400 text-xs'>#3423</p>
        </div>
    </div>
    <div className='flex text-lg gap-3'>
        <div onClick={deleteFriend} title='Delete' className='bg-[#1e2124]/60 p-2 rounded-full hover:text-gray-200 cursor-pointer hover:bg-[#1e2124]'>
            {loading ? <AiOutlineLoading3Quarters className='animate-spin' /> : <BsFillTrashFill className='text-sm'  />}
        </div>
    </div>
</div>
  )
}
