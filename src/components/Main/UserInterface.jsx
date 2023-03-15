import React from 'react'
import { FiSettings } from 'react-icons/fi'
import { useState } from 'react'
import ChangeUser from '../UserOptions/ChangeUser'
import MainSettings from '../UserOptions/MainSettings'
import ManageChannels from '../UserOptions/ManageChannels'

export default function UserInterface({username, userId, channelData, logout}) {

    const [showSettings, setShowSettings] = useState(false)
    const [showForm, setShowForm] = useState('')



  return (
    <div className='bg-[#1e2124] w-full min-h-[60px] flex items-center text-white'>
    <div className='flex w-[50%] h-[80%] rounded items-center'>
        <img src="https://icon-library.com/images/yellow-discord-icon/yellow-discord-icon-15.jpg" alt="" className='w-[35px] h-[35px] rounded-full ml-2' />
        <div className='absolute ml-8 mt-6 z-50 w-[15px] h-[15px] bg-green-500 rounded-full'></div>
        <div className='flex flex-col ml-3'>
            <p className='text-xs font-bold'>{username.toLowerCase()}</p>
            <p className='text-xs text-gray-500'>{`#${userId}`}</p>
        </div>
    </div>
    <div className='flex w-[50%] justify-end mr-4 text-lg'>
        <div onClick={() => setShowForm('main')} className='hover:bg-gray-700 p-2 rounded cursor-pointer text-gray-400 hover:text-gray-200' title='Settings'>
            <FiSettings  />
        </div>         
    </div>
    {   showForm === 'main' ? (
            <MainSettings setShowSettings={setShowSettings} username={username} setShowForm={setShowForm} logout={logout}
             /> )
             : showForm === 'change' ? (
             <ChangeUser setShowSettings={setShowSettings} user={username} setShowForm={setShowForm} userId={userId}
              /> )
              : showForm === 'manage' ? (
                <ManageChannels setShowSettings={setShowSettings} user={username} setShowForm={setShowForm} userId={userId} channelData={channelData} />
              )
              :
              null           
    }
</div>
  )
}
