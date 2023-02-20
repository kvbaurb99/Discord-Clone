import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import InputMessage from './InputMessage'
import Message from './Message'
import axios from 'axios'
import { BiHash } from 'react-icons/bi'
import { AiOutlineLoading3Quarters } from 'react-icons/ai'


export default function Communicate({username, userId, servers, channelData}) {

    const chat = useParams()
    const [messageData, setMessageData] = useState([])
    const [messages, setMessages] = useState([])
    const [loading, setLoading] = useState(false)
    const [currentChannel, setCurrentChannel] = useState()

    const filterMessage = messageData.filter(message => message.channelid === currentChannel);
    
    const filterChannel = channelData.filter(channel => channel.parent === chat.server && channel.channel === chat.name)

    const data = useParams()



    const sortedMessages = filterMessage.sort((a, b) => {
        return new Date(b.date) - new Date(a.date);
      });


    useEffect(() => {
        setCurrentChannel(filterChannel[0].id)
    }, [filterChannel])

    useEffect(() => {
        axios.get('https://fierce-savannah-71823.herokuapp.com/api/messages')
        .then(res => {
            setMessageData(res.data)
        })
    }, [messageData])


    useEffect(() => {
        setMessages(sortedMessages)
    }, [sortedMessages])








  return (
    <>
    <div className='md:w-[98%] w-[95%] h-full flex mx-auto text-gray-300 flex-col overflow-hidden'>
        <div className='w-[97%] mx-auto h-full flex flex-col-reverse overflow-y-scroll scrollbar-hide'>
        {loading ? <div className='rounded-full w-[40px] h-[40px] bg-[#282b30] flex items-center justify-center mb-4 ml-2'><AiOutlineLoading3Quarters className='animate-spin text-base md:text-xl' /></div> : null }
            { messages.map((message, index) => (
                <Message
                    key={index.id}
                    text={message.message}
                    user={message.user}
                    img={message.img}
                    time={message.date}
                    item={message.id}
                    username={username}
                />
            ))}
            <div>
                <div className='mb-8'>
                <div className='bg-[#424549] w-[70px] h-[70px] flex justify-center items-center rounded-full mb-2'>
                    <BiHash className='text-white text-5xl' />
                </div>
                <div>
                    <p className='text-3xl font-bold'>Welcome on: #{data.name}</p>
                    <p className='text-gray-400 text-sm mt-2'>This is beggining of channel #{data.name}.</p>
                </div>
                </div>
            </div>
        </div>
    </div>
    <div className='w-[97%] mx-auto'>        
        <InputMessage name={chat.name} username={username} userId={userId} setLoading={setLoading} currentChannel={currentChannel} />
    </div>
    </>
  )
}
