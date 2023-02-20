import React, { useState } from 'react'
import axios from 'axios'
import { AiOutlineLoading3Quarters } from 'react-icons/ai'

export default function ChannelForm({ setForm, owner, name }) {

    const [channelReg, setChannelReg] = useState('')
    const serverOwnerReg = owner
    const parentReg = name
    const [error, setError] = useState('')
    const [loading, setLoading] = useState(false)


    const createChannel = (e) => {
        setLoading(true)
        e.preventDefault();
        axios.post('https://fierce-savannah-71823.herokuapp.com/channels', {
            channel: channelReg,
            server: serverOwnerReg,
            parent: parentReg
        }).then(res => {
            if (res.data.err) {
                setError(res.data.err)
                setLoading(false)
            } else {
                setForm(false)
                setLoading(false)
            }
        })
    }

    const handleKeyDown = (e) => {
        if (e.key === 'Enter') {
            createChannel(e)
        }
    }


  return (
    <div className='absolute top-0 right-0 w-full h-screen bg-black/80 flex justify-center items-center z-50'>
        <div className='w-[400px] h-[250px] bg-gray-700 rounded-xl text-gray-300 flex flex-col'>
            <h1 className='p-4 text-2xl'>Create your channel</h1>
            <p className='px-4 text-sm text-gray-400'>Send messages, images, GIF's, opinions and write jokes</p>
            <p className='text-red-600 text-xs text-center relative top-2'>{error}</p>
            <form onSubmit={createChannel} className='w-[90%] mx-auto flex flex-col justify-center'>
                <div className='flex'>
                    <input onKeyDown={handleKeyDown} onChange={(e) => setChannelReg(e.target.value)} type="text" className='w-full bg-gray-900 py-2 rounded px-10 border-none outline-none mt-4' placeholder='new-channel' />
                    <div className='relative right-[91%] top-5 text-xl z-10 cursor-default'>#</div>
                </div>
                <div className='flex w-[90%] mx-auto justify-end  mt-12'>
                    <button onClick={() => setForm(false)} className='mr-5 text-sm font-bold hover:underline'>Cancel</button>
                    <button type='submit' className='bg-blue-600 py-2 px-3 text-sm rounded font-bold hover:bg-blue-700 cursor-pointer'>{loading ? <AiOutlineLoading3Quarters className='animate-spin' /> : 'Create channel'}</button>
                </div>
            </form>
        </div>
    </div>
  )
}
