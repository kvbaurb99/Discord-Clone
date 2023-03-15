import React, { useEffect, useState } from 'react'
import InputPrivate from './InputPrivate'
import PrivateMessage from './PrivateMessage'
import axios from 'axios'
import { useParams } from 'react-router-dom'
import { AiOutlineLoading3Quarters } from 'react-icons/ai'

export default function PrivateCommunicate({chatsData, username, yourId, friend}) {

  const [messagesData, setMessagesData] = useState([])
  const param = useParams()
  const [loading, setLoading] = useState(false)
  const [loading2, setLoading2] = useState(false)
  const { userId } = param

  const sortedMessages = messagesData.sort((a, b) => {
    return new Date(b.date) - new Date(a.date);
  });


  function getChannels() {
    axios.get(`https://fierce-savannah-71823.herokuapp.com/api/privatemessages/${userId}`)
      .then(response => {
        // check if last message was deleted
        if (response.data.length === 0) {
          setMessagesData(prevMessageData => {
            const newMessageData = [...prevMessageData];
            newMessageData.pop();
            return newMessageData;
          });
        } else {
          setMessagesData(response.data === undefined ? null : response.data || []);
        }
        
  
        // initiate next request after delay
        setTimeout(getChannels, 1000);
      })
      .catch(error => {
        // handle error
        // initiate next request after delay
        setTimeout(getChannels, 1000);
      });
  }

  const handleDelete = (msg) => {
    setLoading2(true)
    axios.post('https://fierce-savannah-71823.herokuapp.com/api/privatemessages', {
      messageid: msg
    })
    .then((res) => { 
      // manually remove deleted message from state of messageData
      setMessagesData(prevMessageData => {
        const newMessageData = prevMessageData.filter(message => message.messageid !== msg);
        setLoading2(false)
        return newMessageData;
        
      });
    })
    .catch(error => {
      console.error(error);
      setLoading2(false)
    });
  };

  useEffect(() => {
    getChannels()
  }, [userId])



  


  return (
    <>
    <div className='w-[98%] h-full flex flex-col mx-auto text-gray-300 overflow-hidden'>
      <div className='w-[97%] mx-auto h-full flex flex-col-reverse overflow-y-scroll scrollbar-hide scroll-smooth'>
      {loading ? <div className='rounded-full w-[40px] h-[40px] bg-[#282b30] flex items-center justify-center mb-4 ml-2 overflow-hidden'><AiOutlineLoading3Quarters className='animate-spin text-base md:text-xl' /></div> : null }
        {sortedMessages.map(msg => (
          <PrivateMessage
            key={msg.messageid}
            name={msg.user}
            message={msg.message}
            date={msg.date}
            id={msg.messageid}
            username={username}
            yourId={yourId}
            loading = {loading}
            setLoading = {setLoading}
            handleDelete= {handleDelete}
            loading2={loading2}
          />
        ))}
      </div>
      <div className='w-[97%] mx-auto mt-auto'>        
        <InputPrivate chatsData={chatsData} username={username} yourId={yourId} friend={friend} setLoading={setLoading} />
      </div>
    </div>
  </>
  )
}
