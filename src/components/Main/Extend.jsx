import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom';
import UserExtend from './UserExtend';
import UserProfile from './UserProfile';

export default function Extend({data, usersData, username, userFriends, userId, currentUser}) {

    const product = useParams();
    const [usersOn, setUsersOn] = useState([])
    const [close, setClose] = useState(false)
    const [currentFriend, setCurrentFriend] = useState()

    
    const { server } = product
    const channelOwner = data.find(item => item.name === server);
    const date = currentUser ? currentUser[0].date : null;
    const owner = channelOwner.owner ? channelOwner.owner : null;

    useEffect(() => {
        const usersOnData = usersData.filter(user => user.username !== channelOwner.owner)
        setUsersOn(usersOnData)
    }, [channelOwner.owner, usersData])

    useEffect(() => {
        const filter = userFriends.filter(item => item.friend === owner)
        setCurrentFriend(filter)
    }, [owner, userFriends])




  return (
    <div className='h-screen bg-[#282b30] shadow-sm shadow-black extend-start text-gray-400'>
        <div className='px-4 py-6'>
            <p className='text-xs'>OWNER - 1</p>
            <div onClick={() => setClose(true)} className='flex items-center mt-2 hover:bg-[#36393e] rounded p-1 cursor-pointer'>
                <img src="https://icon-library.com/images/yellow-discord-icon/yellow-discord-icon-15.jpg" alt="" className='w-[30px] h-[30px] rounded-full' />
                <p className='text-red-600 font-bold ml-2'>{channelOwner.owner}</p>
            </div>
        </div>
        <div className='px-4 py-4'>
            <p className='text-xs'>USERS - {usersOn.length}</p>
            <div className='flex flex-col mt-1'>
                {usersOn.map(user => (
                    <UserExtend
                    name={user.username}
                    userFriends={userFriends}
                    username={username}
                    userId={userId}
                    usersData={usersData}
                    date={user.date}
                    />
                ))}
            </div>
        </div>
        <UserProfile name={owner} setClose={setClose} currentFriend={currentFriend} username={username} userId={userId} usersData={usersData} date={date} close={close} />
    </div>
  )
}
