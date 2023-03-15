import React from 'react'
import Request from './Request'


export default function Pending({username, userId, usersData, requestsData}) {




  return (
    <div className='w-full h-full flex flex-col text-gray-300'>
        <div className='w-full p-8 flex flex-col'>
            <h2 className='text-base font-bold'>FRIEND REQUESTS</h2>
        </div>
        <div>
            {requestsData.map(request => (
                <Request
                    key={request.id}
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
