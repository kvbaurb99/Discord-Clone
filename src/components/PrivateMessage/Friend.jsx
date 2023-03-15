import React from 'react'
import { useNavigate } from 'react-router-dom'
import axios from 'axios'

export default function Friend({name, id, url, username, userId}) {

    const navigate = useNavigate()

    const handleChatClick = async () => {
        try {
          const response = await axios.post('https://fierce-savannah-71823.herokuapp.com/privatechat', {
            user1: username,
            user2: name,
            user1id: userId,
            user2id: id,
          });
          const chatId = response.data.id;
          navigate(`/main/${chatId}`);
        } catch (error) {
          console.error(error);
        }
      };

  return (
    <div onClick={handleChatClick}  className='flex items-center w-[95%] mx-auto hover:bg-[#424549] rounded p-2 cursor-pointer'>
        <div>
            <img alt='logo' src={url} className='w-[35px] h-[35px] rounded-full' />
        </div>
        <div className='text-gray-300 flex items-center'>
            <p className='ml-4 text-sm'>{name}</p>
            <p className='text-gray-400 text-sm ml-2 font-bold'>{`#${id}`}</p>
        </div>
    </div>
  )
}
