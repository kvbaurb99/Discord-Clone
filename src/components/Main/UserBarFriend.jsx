import React, { useState } from 'react'
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { useEffect } from 'react';

export default function UserBarFriend({name, url, username, userId, userFriends}) {

  const navigate = useNavigate()
  const [unread, setUnread] = useState([])

  const findUser = userFriends.filter(user => user.friend === name);



  const checkForRead = () => {
    axios.get(`https://fierce-savannah-71823.herokuapp.com/${name}`)
    .then(res => {
      if (res.data.length === 0) {
        setUnread([])
      } else {
        setUnread(res.data)
      }
    })
    .catch(err => {
      setTimeout(checkForRead, 10000)
    })
    setTimeout(checkForRead, 10000)
  }

  useEffect(() => {
    checkForRead()
  }, [])



  const handleChatClick = async () => {
    try {
      if (findUser.length > 0) {
        const sortedId = findUser[0].friendid;
        const response = await axios.post('https://fierce-savannah-71823.herokuapp.com/privatechat', {
          user1: username,
          user2: name,
          user1id: userId,
          user2id: sortedId,
        });
        const chatId = response.data.id;
        navigate(`/main/${chatId}`);
        window.location.reload()
  
        // Mark the messages as read
        await axios.post('https://fierce-savannah-71823.herokuapp.com/privatemessagesread', {
          userId: sortedId,
          chatId: chatId,
        });
      } else {
        console.log("No friend found with username", username);
      }
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div onClick={handleChatClick} className='flex mt-2 items-center hover:bg-[#36393e] p-1 rounded cursor-pointer relative'>
        <div>
            <img alt='logo' src={url} className='w-[30px] h-[30px] rounded-full object-fill' />
        </div>
        <div>
            <p className='text-gray-400 ml-4 text-base'>{name}</p>
        </div>
        {unread.length > 0 ? <div className='rounded-full w-[20px] h-[20px] bg-red-600 absolute right-0 flex items-center justify-center'>
          <p className='text-white text-xs font-bold'>{unread.length}</p>
        </div> : null}
    </div>
  )
}
