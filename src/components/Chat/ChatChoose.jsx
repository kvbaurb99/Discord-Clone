import React, { useEffect, useState } from 'react'
import { MdKeyboardArrowDown, MdKeyboardArrowRight } from 'react-icons/md';
import { FaPlus } from 'react-icons/fa';
import { useParams } from 'react-router-dom';
import SubChannel from '../Channel/SubChannel';
import ChannelForm from '../Channel/ChannelForm';
import UserInterface from '../Main/UserInterface';

export default function ChatChoose({data, channelData, username, setCurrentChannel, setRespond, respond, userId, logout}) {

    const [rolled, setRolled] = useState(true);
    const [channels, setChannels] = useState([])
    const [error, setError] = useState('')
    const [alertVisible, setAlertVisible] = useState(false)
    const [channelForm, setChannelForm] = useState(false)

    const product = useParams();

    
    const { server } = product

    const channelOwner = data.find(item => item.name === server);


    const checkUser = () => {
        if (channelOwner && username === channelOwner.owner) {
          setChannelForm(true)
        } else {
          setChannelForm(false)
          setError('You are not the owner of this channel')
          setAlertVisible(true)
          setTimeout(() => {
              setAlertVisible(false)
          }, 2000);
        }
      }


    useEffect(() => {
        const channel = channelData.filter(channel => channel.parent === server);
        setChannels(channel);
    }, [server, channelData])


    return (
        <>
          {channelOwner ?
            <div className='flex flex-col min-w-[250px] h-screen bg-[#282b30] text-gray-300'>
              <div className='p-4 text-lg font-bold shadow-sm shadow-[#1e2124] w-full'>
                <p className='text-center'>Server of user {channelOwner.owner}</p>
              </div>
              <div className='flex py-5 w-full items-center justify-between text-gray-400'>
                <div onClick={() => rolled ? setRolled(false) : setRolled(true)} className='flex ml-1  w-[80%] hover:text-gray-300 cursor-pointer'>
                  { rolled ? <MdKeyboardArrowDown  /> : <MdKeyboardArrowRight />}
                  <p className='text-xs '>TEXT CHANNELS</p>
                </div>
                <FaPlus onClick={checkUser} className='text-xs mr-4 hover:text-gray-300 cursor-pointer' />
              </div>
              <div className='flex flex-col h-screen'>
                { rolled ? channels.map((item, index) => (
                  <SubChannel
                    key={item.channel}
                    name={item.channel}
                    server={server}
                    changeChannel={setCurrentChannel}
                    setRespond={setRespond}
                    respond={respond}
                  />
                ))
                : null
                }
              </div>
              <UserInterface username={username} userId={userId } channelData={data} logout={logout} />
            </div>
            :
            <div></div>
          }
          {channelForm ? <ChannelForm form={channelForm} setForm={setChannelForm} owner={channelOwner.owner} name={channelOwner.name} /> : null}
          {alertVisible ? <div className='absolute top-0 left-[50%] text-sm bg-black/60 text-white h-[80px] rounded-bl-lg rounded-br-lg flex items-center p-6'>
            <p className='text-justify text-gray-400 font-bold'>{error}</p>
          </div> : null}
        </>
      );
}
