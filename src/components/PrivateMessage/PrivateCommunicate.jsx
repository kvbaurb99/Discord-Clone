import React, { useEffect, useState } from 'react'
import InputPrivate from './InputPrivate'
import PrivateMessage from './PrivateMessage'
import axios from 'axios'
import { useParams } from 'react-router-dom'
import { AiOutlineLoading3Quarters } from 'react-icons/ai'
import socket from '../socket/socket'

export default function PrivateCommunicate({chatsData, username, yourId, friend}) {

  const [messagesData, setMessagesData] = useState([])
  const param = useParams()
  const [loading, setLoading] = useState(false)
  const [loading2, setLoading2] = useState(false)
  const { userId } = param

  const sortedMessages = messagesData.sort((a, b) => {
    return new Date(b.date) - new Date(a.date);
  });


  function getChannels() {
    axios.get(`https://fierce-savannah-71823.herokuapp.com/api/privatemessages/${userId}`)
      .then(response => {
        // check if last message was deleted
        setMessagesData(response.data || [])
  })}


  useEffect(() => {

    getChannels()

    socket.on('privateUpdate', getChannels)

    return () => {
      socket.off('privateUpdate')
    }
    

  }, [userId])



  


  return (
    <>
    <div className='w-[98%] h-full flex flex-col mx-auto text-gray-300 overflow-hidden'>
      <div className='w-[97%] mx-auto h-full flex flex-col-reverse overflow-y-scroll scrollbar-hide scroll-smooth'>
      {loading ? <div className='rounded-full w-[40px] h-[40px] bg-[#282b30] flex items-center justify-center mb-4 ml-2 overflow-hidden'><AiOutlineLoading3Quarters className='animate-spin text-base md:text-xl' /></div> : null }
        {sortedMessages.map(msg => (
          <PrivateMessage
            key={msg.messageid}
            name={msg.user}
            message={msg.message}
            date={msg.date}
            id={msg.messageid}
            username={username}
            yourId={yourId}
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
