import React, { useEffect, useState } from 'react'
import UserProfile from './UserProfile'

export default function UserExtend({name, userFriends, username, userId, usersData, date}) {

    const [close, setClose] = useState(false)
    const [currentFriend, setCurrentFriend] = useState()

    useEffect(() => {
        const filter = userFriends.filter(item => item.friend === name)
        setCurrentFriend(filter)
    }, [name, userFriends])




  return (
    <div className='mt-3'>
        <div onClick={() => setClose(true)} className='hover:bg-[#36393e] rounded p-1 flex cursor-pointer'>
        <div>
            <img src="https://icon-library.com/images/yellow-discord-icon/yellow-discord-icon-15.jpg" alt="" className='w-[30px] h-[30px] rounded-full' />
        </div>
        <div className='ml-2 flex'>
            <p>{name}</p>
        </div>
        </div>
        <UserProfile close={close} name={name} setClose={setClose} currentFriend={currentFriend} username={username} userId={userId} usersData={usersData} date={date} />
    </div>
  )
}
