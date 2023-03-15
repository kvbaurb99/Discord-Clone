import React, { useState } from 'react'
import { AiOutlineCheck, AiOutlineLoading3Quarters } from 'react-icons/ai'
import { AiOutlineClose } from 'react-icons/ai'
import axios from 'axios'

export default function Request({sender, username, requestId, userId, usersData, setRequests}) {

    const url= 'https://icon-library.com/images/yellow-discord-icon/yellow-discord-icon-15.jpg'
    const [loading, setLoading] = useState(false)
    const [loading2, setLoading2] = useState(false)
    const sortId = usersData.filter(user => user.username === sender);



    const addFriend = () => {
        setLoading(true)
        const findUser = usersData.filter(user => user.username === sender);
        axios.post('https://fierce-savannah-71823.herokuapp.com/friends', {
            user: sender,
            friend: username,
            friendurl: url,
            userid: findUser[0].id,
            friendid: userId
        }).then(() => {
            axios.post('https://fierce-savannah-71823.herokuapp.com/friends', {
                user: username,
                friend: sender,
                friendurl: url,
                userid: userId,
                friendid: findUser[0].id
            }).then(() => {
                axios.post('https://fierce-savannah-71823.herokuapp.com/api/requests', {
                    id: requestId
                }).then((res) => {
                    setLoading(false)
                })               
            })
        })

    }

    const declineRequest = () => {
        setLoading2(true);
        axios.post('https://fierce-savannah-71823.herokuapp.com/api/requests', {
          id: requestId
        })
        .then((res) => { 
          setLoading2(false);
        })}

  return (
    <div className='flex px-8 py-4 items-center border-t border-gray-400/20 w-[95%] mx-auto justify-between hover:bg-gray-400/20 rounded'>
            <div className='flex items-center'>
                <img src="https://icon-library.com/images/yellow-discord-icon/yellow-discord-icon-15.jpg" alt="" className='w-[40px] h-[40px] rounded-full object-fit' />
                <div className='flex flex-col text-xs ml-4'>
                    <p className='text-white font-bold text-sm'>{sender}</p>
                    <p className='text-gray-400 text-xs'>#{sortId[0].id}</p>
                </div>
            </div>
            <div className='flex text-xl gap-3'>
                <div onClick={addFriend} title='Accept' className='bg-[#1e2124]/60 p-2 rounded-full hover:text-green-600 cursor-pointer hover:bg-[#1e2124]'>
                    { !loading ? 
                    <AiOutlineCheck />
                    :
                    <AiOutlineLoading3Quarters className='animate-spin' />
                    }
                </div>
                <div onClick={declineRequest} title='Ignore' className='bg-[#1e2124]/60 p-2 rounded-full hover:text-red-600 cursor-pointer hover:bg-[#1e2124]'>
                    { !loading2 ?
                    <AiOutlineClose  />
                    :
                    <AiOutlineLoading3Quarters className='animate-spin' />
                    }
                </div>
            </div>
        </div>
  )
}
