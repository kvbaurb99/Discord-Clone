import React from 'react'
import { AiOutlineClose } from 'react-icons/ai'
import Friend from './Friend'

export default function FriendsList({setFriendList, userFriends, username, userId}) {
  return (
    <div className='absolute w-[450px] h-[300px] top-[15%] left-[14.5%] rounded-lg bg-[#36393e]  border border-black'>
        <div className='flex justify-between items-center'>
            <h1 className='text-2xl p-4 text-white'>Choose friend</h1>
            <AiOutlineClose onClick={() => setFriendList(false)} className='text-gray-500 mr-4 mb-4 cursor-pointer hover:text-red-600' />
        </div>
        {userFriends.length === 0 ? <div className='w-full flex justify-center'>
        <img src="https://preview.redd.it/yb8x941uhjsz.png?auto=webp&s=957fec0f9e1b14949f0420f5cc72a81fee01bbf1" alt="" className='w-[150px] object-cover'/>
        </div> : null }
        {userFriends.length === 0 ? <div className='w-full flex flex-col justify-center'>
            <p className='text-center text-base mt-3 text-gray-500'>You don't have any friends to add!</p>
            <button onClick={() => setFriendList(false)} className='text-white bg-green-700 w-[90%] mx-auto py-2 rounded mt-4 text-sm hover:bg-green-800'>Add friend</button>
        </div> : null}
        <div className='px-4 py-2 overflow-y-scroll scrollbar-hide'>
          {userFriends.map(item => (
            <Friend
              name={item.friend}
              url={item.friendurl}
              id={item.friendid}
              username={username}
              userFriends={userFriends}
              userId={userId}
            />
          ))}
        </div>
    </div>
  )
}
