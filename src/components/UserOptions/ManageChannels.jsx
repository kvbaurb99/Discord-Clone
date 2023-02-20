import React from 'react'
import ChannelToManage from './ChannelToManage'

export default function ManageChannels({userId, channelData, user, setShowForm}) {

  const yourChannels = channelData.filter(channel => channel.owner === user)
  console.log(yourChannels)

  return (
    <div className='absolute top-0 right-0 w-full h-screen bg-black/80 flex justify-center items-center z-50'>
    <div className='w-[80%] h-[50%] md:w-[20%] md:h-[50%] bg-[#282b30] rounded-2xl flex flex-col'>
        <div className='p-4 border-b border-gray-300 w-[95%] mx-auto'>
          <p className='text-base font-bold'>Manage your channels</p>
        </div>
        <p className='text-center mt-4'>{yourChannels.length === 0 ? 'You have no channels.' : null}</p>
        <div className='overflow-y-scroll scrollbar-hide'>
          {yourChannels.map(channel => (
            <ChannelToManage
              name={channel.name}
              owner={channel.owner}
              setShowForm={setShowForm}
            />
          ))}
        </div>
        <div className='flex w-full justify-center text-white mb-3'>
          <button onClick={() => setShowForm('main')} className='w-[120px] bg-red-600 rounded mt-6 hover:bg-red-700 py-1'>Back</button>
        </div>
    </div>
</div>
  )
}
