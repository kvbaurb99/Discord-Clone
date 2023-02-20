import React, { useEffect, useState } from 'react'
import PrivateChat from './PrivateChat'
import PrivateCommunicate from './PrivateCommunicate'
import TopPrivateBar from './TopPrivateBar'
import axios from 'axios'
import { useParams } from 'react-router-dom'

export default function MainPrivate({username, yourId, userFriends}) {
    
    const [chatsData, setChatsData] = useState([])

    const chat = useParams()

    const { userId } = chat

    const filterChat = chatsData.filter(chat => chat.id === userId)
    
    let friend = '';

    if (filterChat.length > 0) {
      friend = filterChat[0].user1 === username ? filterChat[0].user2 : filterChat[0].user1;
    }

    useEffect(() => {
        axios.get('https://fierce-savannah-71823.herokuapp.com/api/privatechat').then(res => {
            setChatsData(res.data)
        })
    })



  return (
    <div className='w-full h-screen flex flex-col bg-[#36393e]'>
        <TopPrivateBar chatsData={chatsData} username={username} friend={friend} />
        <PrivateCommunicate chatsData={chatsData} username={username} yourId={yourId} friend={friend} userFriends={userFriends} />
    </div>
  )
}
