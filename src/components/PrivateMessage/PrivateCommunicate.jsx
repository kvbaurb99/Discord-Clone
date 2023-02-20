import React, { useEffect, useState } from 'react'
import InputPrivate from './InputPrivate'
import PrivateMessage from './PrivateMessage'
import axios from 'axios'
import { useParams } from 'react-router-dom'
import { AiOutlineLoading3Quarters } from 'react-icons/ai'

export default function PrivateCommunicate({chatsData, username, yourId, friend}) {

  const [messagesData, setMessagesData] = useState([])
  const param = useParams()
  const [loading, setLoading] = useState(false)
  const { userId } = param

  const sortedMessages = messagesData.sort((a, b) => {
    return new Date(b.date) - new Date(a.date);
  });






  useEffect(() => {
    axios.get('https://fierce-savannah-71823.herokuapp.com/api/privatemessages').then(res => {
      setMessagesData(res.data.filter(msg => msg.chat === userId));
    })
  })

  


  return (
    <>
    <div className='w-[98%] h-full flex flex-col mx-auto text-gray-300 overflow-hidden'>
      <div className='w-[97%] mx-auto h-full flex flex-col-reverse overflow-y-scroll scrollbar-hide scroll-smooth'>
      {loading ? <div className='rounded-full w-[40px] h-[40px] bg-[#282b30] flex items-center justify-center mb-4 ml-2 overflow-hidden'><AiOutlineLoading3Quarters className='animate-spin text-base md:text-xl' /></div> : null }
        {sortedMessages.map(msg => (
          <PrivateMessage
            name={msg.user}
            message={msg.message}
            date={msg.date}
            id={msg.messageid}
            username={username}
            yourId={yourId}
            loading = {loading}
            setLoading = {setLoading}
          />
        ))}
      </div>
      <div className='w-[97%] mx-auto mt-auto'>        
        <InputPrivate chatsData={chatsData} username={username} yourId={yourId} friend={friend} setLoading={setLoading} />
      </div>
    </div>
  </>
  )
}
