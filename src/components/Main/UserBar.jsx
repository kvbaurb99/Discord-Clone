import React, { useState } from 'react'
import { FaUserFriends } from 'react-icons/fa'
import { FaFire } from 'react-icons/fa'
import { FaPlus } from 'react-icons/fa'
import { Link, useNavigate } from 'react-router-dom'
import FriendsList from '../PrivateMessage/FriendsList'
import UserBarFriend from './UserBarFriend'
import UserInterface from './UserInterface'


export default function UserBar({username, userId, channelData, userFriends, logout}) {

    const [friendList, setFriendList] = useState(false)
    const navigate = useNavigate()


  return (
    <div className='flex flex-col min-w-[250px] h-screen bg-[#282b30]'>
        <div className='flex flex-col w-full items-center mt-4 text-gray-400'>
            <div onClick={() => navigate('/main')} className='w-[90%] flex items-center rounded-lg py-2 bg-[#36393e] cursor-pointer text-gray-200'>
                <FaUserFriends className='ml-4 text-2xl' />
                <p className='ml-4 text-md'>Friends</p>
            </div>
            <Link to='https://discord.com/nitro' target='_blank' className='hover:bg-[#36393e] w-[90%] mt-1 rounded-lg py-2 flex items-center cursor-pointer hover:text-gray-200'>
                <FaFire className='ml-4 text-2xl' />
                <p className='ml-4 text-md'>Nitro</p>
            </Link>
        </div>
        <div className='flex flex-col w-full'>
            <div className='flex text-xs font-bold text-gray-400 justify-around mt-6 items-center hover:text-gray-200'>
                <p className='tracking-wide'>PRIVATE MESSAGES</p>
                <FaPlus onClick={() => setFriendList(true)} className='cursor-pointer text-gray-400' />
            </div>
            {friendList ? <FriendsList setFriendList={setFriendList} userFriends={userFriends} username={username} userId={userId}/> : null}
            <div className='py-4 px-6 overflow-y-scroll scrollbar-hide'>
                {userFriends.map(item => (
                    <UserBarFriend
                    name={item.friend}
                    url={item.friendurl}
                    />
                ))}
            </div>
        </div>
        <div className='w-full h-full overflow-y-scroll scrollbar-hide'></div>
        <UserInterface username={username} userId={userId} channelData={channelData} logout={logout} />
    </div>
  )
}
