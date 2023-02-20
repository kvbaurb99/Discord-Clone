import React from 'react'
import ChannelHome from './ChannelHome'
import TopBar from './TopBar'

export default function MainChat({channel}) {
  return (
    <div className='w-full h-screen bg-[#36393e] flex flex-col'>
      <TopBar channel={channel} />
      <ChannelHome />
    </div>
  )
}
