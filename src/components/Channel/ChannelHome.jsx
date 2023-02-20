import React from 'react'
import { useParams } from 'react-router-dom'

export default function ChannelHome() {

    const title = useParams()


  return (
    <div className='w-full h-full flex flex-col justify-center items-center'>
        <img src="https://support.discord.com/hc/user_images/2shWArOBL5i2Skacig0Rcw.png" alt="" className='w-[400px] mb-8' />
        <p className='text-gray-400 text-2xl'>Welcome on channel <span className='font-bold'>{title.name}</span></p>
        <p className='text-gray-400 text-sm mt-2'>Create new room or join existing.</p>
    </div>  
  )
}
