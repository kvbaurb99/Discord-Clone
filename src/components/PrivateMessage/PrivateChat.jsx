import React from 'react'
import ChanellsBar from '../Channel/ChanellsBar'
import UserBar from '../Main/UserBar'
import MainPrivate from './MainPrivate'

export default function PrivateChat({setShowServerForm, data, channelData, userFriends, username, userId, logout}) {


  return (
    <div className='h-screen w-full flex'>
        <ChanellsBar setShowServerForm={setShowServerForm} data={data} channelData={channelData} />
        <UserBar userFriends={userFriends} username={username} userId={userId} channelData={data} logout={logout} />
        <MainPrivate username={username} yourId={userId} userFriends={userFriends}/>
    </div>
  )
}
