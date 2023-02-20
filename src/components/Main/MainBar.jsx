import React from 'react'
import MainPage from './MainPage'
import TopMain from './TopMain'
import { useState } from 'react'
import { useEffect } from 'react'
import axios from 'axios'

export default function MainBar({username, userId, usersData}) {

  const [show, setShow] = useState('add')
  const [requestsCount, setRequestsCount] = useState()


  useEffect(() => {
    axios.get('https://fierce-savannah-71823.herokuapp.com/api/requests').then(res => {
      const filterRequests = res.data.filter(request => request.receiver === username);
      setRequestsCount(filterRequests.length);
    });
  }, [username]);

  





  

  

  return (
    <div className='w-[900px] md:w-full h-screen bg-[#36393e] flex flex-col'>
      <TopMain setShow={setShow} requestsCount={requestsCount} />
      <MainPage username={username} show={show} setShow={setShow} userId={userId} usersData={usersData} />
    </div>
  )
}
