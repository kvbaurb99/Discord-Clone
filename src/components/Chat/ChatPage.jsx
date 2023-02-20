import React from 'react'
import ChanellsBar from '../Channel/ChanellsBar'
import { useState } from 'react'
import ChatChoose from './ChatChoose'
import Chat from './Chat'
import ServerForm from '../Main/ServerForm'
import Extend from '../Main/Extend'


export default function ChatPage({data, setShowServerForm, username, channelData, setRespond, respond, showServerForm, setData, userId, logout, usersData, userFriends, userData}) {

    const [currentChannel, setCurrentChannel] = useState('')
  


  return (
    <div className='w-[2000px] md:w-full h-screen flex overflow-x-hidden'>
        <ChanellsBar data={data} setShowServerForm={setShowServerForm} channelData={channelData} />
        <ChatChoose data={data} channelData={channelData} username={username} setCurrentChannel={setCurrentChannel} setRespond={setRespond} respond={respond} userId={userId} logout={logout} />
        <Chat channel={currentChannel} username={username} userId={userId} data={data} channelData={channelData}  />
        <ServerForm username={username} showServerForm={showServerForm} setShowServerForm={setShowServerForm} setData={setData} userId={userId}  />
        <Extend data={data} usersData={usersData} username={username} userFriends={userFriends} userId={userId} currentUser={userData} />
    </div>
  )
}
