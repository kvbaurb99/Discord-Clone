import React from 'react'
import { FaUserFriends } from 'react-icons/fa'
import { MdOutlineHelp } from 'react-icons/md'
import { Link } from 'react-router-dom'

export default function TopMain({setShow, requestsCount}) {


  return (
    <div className='bg-[#36393e] w-full h-[64px] text-base shadow-sm shadow-[#1e2124] flex items-center text-gray-400 justify-between'>
    <div className='flex items-center'>
        <div className='w-[130px] flex items-center py-2 cursor-default ml-2 border-r border-solid border-gray-600'>
            <FaUserFriends className='ml-4 text-xl' />
            <p className='ml-4 text-md'>Friends</p>
        </div>
        <div className='flex ml-4 gap-6 items-center'>
            <p onClick={() => setShow('all')} className='hover:bg-gray-600 px-4 py-1 rounded cursor-pointer'>All</p>
            <div className='flex items-center hover:bg-gray-600 rounded px-4'>
                <p onClick={() => setShow('pending')} className='py-1 cursor-pointer'>Pending</p>
                {requestsCount > 0 ? <div className='ml-3 bg-red-600 text-white w-[20px] h-[20px] rounded-full text-base font-bold items-center justify-center flex'>
                     <p className='text-xs'>{requestsCount}</p>
                </div> : null}
            </div>
            <p onClick={() => setShow('add')} className='text-white bg-green-700 px-4 py-1 rounded cursor-pointer hover:bg-green-800 animate-pulse'>Add friend</p>
        </div>
    </div>
</div>
  )
}
