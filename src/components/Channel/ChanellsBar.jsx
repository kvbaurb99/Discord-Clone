import React from 'react'
import { FaDiscord } from 'react-icons/fa'
import Channel from '../Main/Channel'
import { useNavigate } from 'react-router-dom'
import { AiOutlinePlus } from 'react-icons/ai'
import { useEffect } from 'react'

export default function ChanellsBar({setShowServerForm, data, channelData}) {

  const navigate = useNavigate()

  useEffect(() => {
    const loginForm = document.querySelector('.channels');
    loginForm.classList.add('slide-in-channels');
  }, [])

  return (
    <div className='min-w-[80px] h-[screen] bg-[#1e2124] flex flex-col items-center channels'>
      <div className='w-[60%] flex justify-center border-b-2 border-[#424549] py-3'>
      <div onClick={() => navigate('/main')} className='w-full h-[45px] bg-[#424549] flex justify-center items-center cursor-pointer hover:bg-blue-500 hover:rounded-2xl rounded-full'>
          <FaDiscord className='text-3xl text-white' />
        </div>
      </div> 
        <div className='flex flex-col items-center overflow-y-scroll scrollbar-hide mt-1'>
        {
          data && data.map((item, index) => (
            <Channel 
              key={item.name}
              url={item.img}
              title={item.name}
              owner={item.owner}
              color={item.color}
              channelData={channelData}
            />
          ))
        }
        </div>
        <div onClick={() => setShowServerForm(true)} className='w-[65%] h-[50px] bg-[#424549] mt-4 rounded-full flex justify-center items-center cursor-pointer text-white hover:rounded-2xl hover:text-white hover:bg-blue-600'>
          <AiOutlinePlus className='text-2xl' />
        </div>
    </div>  
  )
}
