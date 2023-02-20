import React, { useState } from 'react'
import axios from 'axios'
import { useParams } from 'react-router-dom'

export default function InputPrivate({username, yourId, friend, setLoading}) {

    const [messageReg, setMessageReg] = useState('')
    const data = useParams()

    const { userId } = data



    const sendMessage = (e) => {
        setLoading(true)
        e.preventDefault()
        axios.post('https://fierce-savannah-71823.herokuapp.com/privatemessages', {
            chat: userId,
            user: username,
            userid: yourId,
            message: messageReg
        }).then(res => {
          setMessageReg('')
          setLoading(false)
        })
    }

  return (
    <div>
    <form action="" onSubmit={sendMessage}>
    <input value={messageReg} onChange={(e) => setMessageReg(e.target.value)} type="text" placeholder={`Write to @${friend}`} className='mb-6 py-3 rounded-xl bg-[#424549] outline-none border-none px-6 w-full text-gray-400'/>
    <input type="submit" value="" />
    </form>
</div>
  )
}
