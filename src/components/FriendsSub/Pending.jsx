import React, { useState } from 'react'
import Request from './Request'
import axios from 'axios'
import { useEffect } from 'react';


export default function Pending({username, userId, usersData}) {

    const [requests, setRequests] = useState([]);
    const filterRequests = requests.filter(request => request.receiver === username)
    
    useEffect(() => {
        axios.get('https://fierce-savannah-71823.herokuapp.com/api/requests').then(res => {
            setRequests(res.data)
        }).catch(err => {
            console.log(err)
        })
    }, [requests])


  return (
    <div className='w-full h-full flex flex-col text-gray-300'>
        <div className='w-full p-8 flex flex-col'>
            <h2 className='text-base font-bold'>FRIEND REQUESTS</h2>
        </div>
        <div>
            {filterRequests.map(request => (
                <Request
                    sender={request.sender}
                    username={username}
                    requestId={request.id}
                    userId={userId}
                    usersData={usersData}
                />
            ))}
        </div>
    </div>
  )
}
