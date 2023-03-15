import React from 'react'
import Communicate from './Communicate'
import TopChatBar from './TopChatBar'
import { useNavigate } from 'react-router-dom'

export default function Chat({channel, username, userId, data, channelData}) {

  const navigate = useNavigate()
  if (username === '') {
    navigate('/login')
  }
  

  return (
    <div className='w-full h-full bg-[#36393e] flex flex-col'>
      <TopChatBar />
      <Communicate channel={channel} username={username} userId={userId} servers={data} channelData={channelData}/>
    </div>
  )
}