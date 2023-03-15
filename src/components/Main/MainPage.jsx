import React from 'react'
import AddFriends from '../FriendsSub/AddFriends'
import Pending from '../FriendsSub/Pending'
import AllFriends from '../FriendsSub/AllFriends'
import { useEffect } from 'react'

export default function MainPage({username, show, setShow, userId, usersData, userFriends, setUserFriends, requestsData }) {


  useEffect(() => {
    const loginForm = document.querySelector('.friends');
    loginForm.classList.add('slide-in-friends');
  }, [])


  return (
<div className='friends'>
{show === 'add' ? (
  <AddFriends username={username} userId={userId} usersData={usersData} />
) : show === 'pending' ? (
  <Pending username={username} userId={userId} usersData={usersData} requestsData={requestsData} />
) : show === 'all' ? (
  <AllFriends username={username} userId={userId} userFriends={userFriends} setUserFriends={setUserFriends} />
)
  :
  null
}
</div> 
  )
}
