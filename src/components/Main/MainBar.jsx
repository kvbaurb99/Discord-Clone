import React from 'react'
import MainPage from './MainPage'
import TopMain from './TopMain'
import { useState } from 'react'

export default function MainBar({username, userId, usersData, userFriends, setUserFriends, requestsData}) {

  const [show, setShow] = useState('add')



  





  

  

  return (
    <div className='w-[900px] md:w-full h-screen bg-[#36393e] flex flex-col'>
      <TopMain setShow={setShow} username={username} show={show} requestsData={requestsData} />
      <MainPage username={username} show={show} setShow={setShow} userId={userId} usersData={usersData} userFriends={userFriends} setUserFriends={setUserFriends} requestsData={requestsData} />
    </div>
  )
}
