import React, { useEffect, useState } from 'react'
import axios from 'axios'
import { useParams } from 'react-router-dom'

export default function InputMessage({username, userId, setLoading, currentChannel}) {

  const channel = useParams()

  const [messageReg, setMessageReg] = useState('')
  const [channelReg, setChannelReg] = useState('')
  const userReg = username
  const imgReg = 'https://icon-library.com/images/yellow-discord-icon/yellow-discord-icon-15.jpg'
  const {server} = channel




  useEffect(() => {
    setChannelReg(channel.name)
  }, [channel])

  const createMessage = (e) => {
    e.preventDefault();
    if (!messageReg) {
      return;
    }
    setLoading(true);
    axios
      .post("https://fierce-savannah-71823.herokuapp.com/messages", {
        message: messageReg,
        channel: channelReg,
        user: userReg,
        img: imgReg,
        userid: userId,
        channelparent: server,
        channelid: currentChannel
      })
      .then((res) => {
        setMessageReg("");
        setLoading(false);
      });
  };




  return (
    <div>
        <form action="" onSubmit={createMessage}>
        <input value={messageReg} onChange={(e) => setMessageReg(e.target.value)} type="text" placeholder={`Write on #${channel.name}`} className='mb-6 py-3 rounded-xl bg-[#424549] outline-none border-none px-6 w-full text-gray-400'/>
        <input type="submit" value="" />
        </form>
    </div>
  )
}
