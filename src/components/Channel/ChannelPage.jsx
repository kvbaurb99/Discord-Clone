import React, { useState } from 'react'
import ChanellsBar from './ChanellsBar'
import ChatBar from './ChatBar'
import MainChat from './MainChat'
import ServerForm from '../Main/ServerForm'

export default function ChannelPage({data, setShowServerForm, username, channelData, setData, showServerForm, userId, logout}) {

  const [channelForm, setChannelForm] = useState(false)
  const [currentChannel, setCurrentChannel] = useState('')



  return (
    <div className='w-[1800px] md:w-full h-screen flex overflow-x-hidden'>
        <ChanellsBar data={data} setShowServerForm={setShowServerForm} channelData={channelData} />
        <ChatBar username={username} data={data} setForm={setChannelForm} form={channelForm} channelData={channelData} setCurrentChannel={setCurrentChannel} userId={userId} logout={logout} />
        <MainChat channel={currentChannel} />
        <ServerForm username={username} showServerForm={showServerForm} setShowServerForm={setShowServerForm} setData={setData} userId={userId} />
    </div>
  )
}
