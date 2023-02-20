import React, { useState } from 'react'
import Friends from './Friends'
import { useEffect } from 'react'
import axios from 'axios'

export default function AllFriends({username, userId}) {



    const [friendsData, setFriendsData] = useState([])
    const filterFriends = friendsData.filter(friend => friend.user === username)
    const friendsCount = filterFriends.length



    useEffect(() => {
        axios.get('https://fierce-savannah-71823.herokuapp.com/api/friends').then(res => {
            setFriendsData(res.data)
        })
    })

  return (
    <div className='w-full h-full flex flex-col text-gray-300'>
        <div className='w-full p-8 flex flex-col'>
            <h2 className='text-base font-bold'>{ friendsCount > 0 ? `ALL FRIENDS - ${friendsCount}` : 'ALL FRIENDS'}</h2>
        </div>
        <div className='flex flex-col'>
            {filterFriends.map(item => (
                <Friends
                    name={item.friend}
                    url={item.friendurl}
                    username={username}
                />
            ))}
        </div>
    </div>
  )
}
