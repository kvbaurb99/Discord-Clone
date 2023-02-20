import React from 'react'

export default function UserBarFriend({name, url}) {
  return (
    <div className='flex mt-2 items-center hover:bg-[#36393e] p-1 rounded'>
        <div>
            <img src={url} className='w-[30px] h-[30px] rounded-full object-fill' />
        </div>
        <div>
            <p className='text-gray-400 ml-4 text-base'>{name}</p>
        </div>
    </div>
  )
}
