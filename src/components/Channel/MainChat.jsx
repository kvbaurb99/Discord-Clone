import React from 'react'
import ChannelHome from './ChannelHome'
import TopBar from './TopBar'

export default function MainChat({channel, channelData}) {




  return (
    <div className='w-full h-screen bg-[#36393e] flex flex-col'>
      <TopBar channel={channel} channelData={channelData} />
      <ChannelHome />
    </div>
  )
}
