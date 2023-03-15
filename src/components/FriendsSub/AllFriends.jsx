import React from 'react'
import Friends from './Friends'

export default function AllFriends({username, userFriends, setUserFriends}) {



    const filterFriends = userFriends ? userFriends.filter(friend => friend.user === username) : [];
    const friendsCount = filterFriends.length



  return (
    <div className='w-full h-full flex flex-col text-gray-300'>
        <div className='w-full p-8 flex flex-col'>
            <h2 className='text-base font-bold'>{ friendsCount > 0 ? `ALL FRIENDS - ${friendsCount}` : 'ALL FRIENDS'}</h2>
        </div>
        <div className='flex flex-col'>
            {filterFriends.map(item => (
                <Friends
                    key={item.friend}
                    name={item.friend}
                    url={item.friendurl}
                    username={username}
                    setUserFriends={setUserFriends}
                    userFriends={userFriends}
                />
            ))}
        </div>
    </div>
  )
}
