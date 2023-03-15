import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import { BiHash } from 'react-icons/bi';
import { AiOutlineLoading3Quarters } from 'react-icons/ai';
import Message from './Message';
import InputMessage from './InputMessage';

export default function Communicate({username, userId, servers, channelData}) {
  const chat = useParams();
  const [messageData, setMessageData] = useState([]);
  const [loading, setLoading] = useState(false);
  const [loading2, setLoading2] = useState(false)
  const [currentChannel, setCurrentChannel] = useState();



  const filterChannel = channelData.filter(channel => channel.parent === chat.server && channel.channel === chat.name);


  useEffect(() => {
    filterChannel.length > 0 ? setCurrentChannel(filterChannel[0].id) : setCurrentChannel(null);
  }, []);




  
 function getChannels() {
    axios.get(`https://fierce-savannah-71823.herokuapp.com/api/messages/${chat.name}/${chat.server}`)
      .then(response => {
        // check if last message was deleted
        if (response.data.length === 0 && messageData.length > 0) {
          setMessageData(prevMessageData => {
            const newMessageData = [...prevMessageData];
            newMessageData.pop();
            return newMessageData;
          });

        if (response.data.length === 0) {
          setMessageData([])
        }  
        } else {
          setMessageData(response.data === undefined ? null : response.data || []);
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
    setLoading2(true);
    axios.post('https://fierce-savannah-71823.herokuapp.com/api/messages', {
      id: msg
    })
    .then((res) => { 
      setLoading2(false);
      // manually remove deleted message from state of messageData
      setMessageData(prevMessageData => {
        const newMessageData = prevMessageData.filter(message => message.id !== msg);
        return newMessageData;
      });
    })
    .catch(error => {
      console.error(error);
      setLoading2(false);
    });
  };

  useEffect(() => {
    getChannels()
  }, [])



  const filterMessage = messageData.filter(message => message.channelid === currentChannel);

  const sortedMessages = filterMessage.sort((a, b) => {
    return new Date(b.date) - new Date(a.date);
  });







      


  




  return (
    <>
    <div className='md:w-[98%] w-[95%] h-full flex mx-auto text-gray-300 flex-col overflow-hidden'>
        <div className='w-[97%] mx-auto h-full flex flex-col-reverse overflow-y-scroll scrollbar-hide'>
        {loading ? <div className='rounded-full w-[40px] h-[40px] bg-[#282b30] flex items-center justify-center mb-4 ml-2'><AiOutlineLoading3Quarters className='animate-spin text-base md:text-xl' /></div> : null }
            {sortedMessages.map((message) => (
                
                <Message
                    key={message.id}
                    text={message.message}
                    user={message.user}
                    img={message.img}
                    time={message.date}
                    item={message.id}
                    username={username}
                    setMessageData={setMessageData}
                    messageData={messageData}
                    handleDelete={handleDelete}
                    loading={loading2}
                />
                
            ))}
            <div>
                <div className='mb-8'>
                 <div className='bg-[#424549] w-[70px] h-[70px] flex justify-center items-center rounded-full mb-2'>
                    <BiHash className='text-white text-5xl' />
                </div>
                <div>
                    <p className='text-3xl font-bold'>Welcome on: #{chat.name}</p>
                    <p className='text-gray-400 text-sm mt-2'>This is beggining of channel #{chat.name}.</p>
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
