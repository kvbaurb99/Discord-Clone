import React from 'react'
import ChanellsBar from '../Channel/ChanellsBar'
import MainBar from './MainBar'
import UserBar from './UserBar'
import ServerForm from './ServerForm'
import { useNavigate } from 'react-router-dom'

export default function Main({username, setData, setShowServerForm, serverData, showServerForm, channelData, userId, usersData, userFriends, logout, setUserFriends, requestsData}) {


    const navigate = useNavigate()
    if (username === '') {
      navigate('/login')
    }


  return (
    <div className='w-[1000px] md:w-full h-screen flex overflow-x-hidden'>
        <ChanellsBar setShowServerForm={setShowServerForm} data={serverData} channelData={channelData} userid={userId} />
        <UserBar userFriends={userFriends} username={username} userId={userId} channelData={serverData} logout={logout}  />
        <MainBar username={username} userId={userId} usersData={usersData} userFriends={userFriends} setUserFriends={setUserFriends} requestsData={requestsData} />
        <ServerForm username={username} showServerForm={showServerForm} setShowServerForm={setShowServerForm} setData={setData} userId={userId} />
    </div>
  )
}
