import React, { useState } from 'react'
import AddFriends from '../FriendsSub/AddFriends'
import Pending from '../FriendsSub/Pending'
import AllFriends from '../FriendsSub/AllFriends'
import ManageChannels from '../UserOptions/ManageChannels'

export default function MainPage({username, show, setShow, userId, usersData }) {


  return (
<>
{show === 'add' ? (
  <AddFriends username={username} userId={userId} usersData={usersData} />
) : show === 'pending' ? (
  <Pending username={username} userId={userId} usersData={usersData} />
) : show === 'all' ? (
  <AllFriends username={username} userId={userId} />
)
  :
  null
}
</> 
  )
}
