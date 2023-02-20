import React from 'react'
import { FaDiscord } from 'react-icons/fa'
import { AiOutlineClose, AiOutlineLoading3Quarters } from 'react-icons/ai'
import { useState } from 'react'
import axios from 'axios'
import { useNavigate } from 'react-router-dom'



export default function UserProfile({close, name, setClose, currentFriend, username, userId, usersData, date}) {


    const status = 'active'
    const [alert, setAlert] = useState('')
    const [loading, setLoading] = useState(false)

    const showAlert = (message) => {
      setAlert(message);
      setTimeout(() => {
        setAlert('');
      }, 3000);
    };

    const findUser = usersData.filter(user => user.username === name);
    const newDate = new Date(date).toLocaleDateString([], {year: "numeric", day: "numeric", month: "long"});
    const navigate = useNavigate()


    const addFriend = () => {
        setLoading(true)
        const sortedId = findUser[0].id;
        axios.post('https://fierce-savannah-71823.herokuapp.com/requests', {
            sender: username,
            receiver: name,
            status: status,
            senderid: userId,
            receiverid: sortedId
        }).then(res => {
            showAlert(res.data.message)
            setLoading(false)
        })  
      }

      const handleChatClick = async () => {
        try {
          const sortedId = findUser[0].id;
          const response = await axios.post('https://fierce-savannah-71823.herokuapp.com/privatechat', {
            user1: username,
            user2: name,
            user1id: userId,
            user2id: sortedId,
          });
          const chatId = response.data.id;
          navigate(`/main/${chatId}`);
        } catch (error) {
          console.error(error);
        }
      };

  return (
    <>
    { close ?
    <div className='fixed w-full h-screen bg-black/40 left-0 top-0 flex items-center justify-center cursor-default'>
        <div className='w-[18%] h-[40%] bg-[#282b30] rounded-lg'>
            <div className='bg-blue-600 h-[80px] w-full rounded-tl-lg rounded-tr-lg'>
                <div className='absolute right-[41%] p-2 text-white '><AiOutlineClose className='cursor-pointer' onClick={() => setClose(false)} /></div>
            </div>
            <div className='absolute flex items-center justify-center bg-[#282b30] h-[100px] w-[100px] rounded-full top-[22%] left-[15%] md:top-[32%] md:left-[42%]'>
                <img src='https://icon-library.com/images/yellow-discord-icon/yellow-discord-icon-15.jpg' className='rounded-full w-[80px] h-[80px] bg-blue-600' alt='avatar' />
            </div>
            <div className='bg-[#1e2124] w-[95%] h-[55%] mx-auto mt-11 rounded-lg'>
                <div className='px-2 py-3 border-b border-gray-400 w-[90%] mx-auto'>
                    <p className='mt-1 text-xl font-bold text-white'>{name}</p>
                </div>
                <div className='w-[90%] px-1 mx-auto py-3 text-xs text-white'>
                    <p className='font-bold'>MEMBER SINCE</p>
                    <div className='flex items-center mt-1'>
                        <FaDiscord className='text-gray-300' />
                        <p className='ml-1 text-gray-300'>{newDate}</p>
                    </div>
                    <div className='w-[90%] flex justify-around mt-10'>
                        { currentFriend.length <= 0 ?
                        <button onClick={addFriend} className='bg-green-600 py-2 px-4 rounded-lg font-bold hover:bg-green-700'>{loading ? <AiOutlineLoading3Quarters className='animate-spin' /> : 'Add friend'}</button>
                        :
                        <button className='bg-green-600 py-2 px-6 rounded-lg font-bold hover:bg-green-700 cursor-default'>Friend</button>
                        }
                        { username === name ?
                        <button className='bg-blue-600 p-2 rounded-lg font-bold hover:bg-blue-700 cursor-not-allowed'>Send message</button>
                        :
                        <button onClick={handleChatClick} className='bg-blue-600 p-2 rounded-lg font-bold hover:bg-blue-700'>Send message</button>
                        }
                    </div>
                </div>
                {alert ? <div class="absolute top-0 left-0 right-0 mx-auto w-1/4 h-1/10 bg-blue-600 rounded-bl-xl rounded-br-xl flex justify-center items-center error">
                <p class="text-white text-center font-bold">{alert}</p>
                </div> : null}
                </div>
        </div>
    </div>
    : null
    }
    </>
  )
}
