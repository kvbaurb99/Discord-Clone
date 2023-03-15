import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom';
import { FaPlus } from 'react-icons/fa';
import { MdKeyboardArrowDown, MdKeyboardArrowRight } from 'react-icons/md';
import ChannelForm from './ChannelForm';
import SubChannel from './SubChannel';
import UserInterface from '../Main/UserInterface';

export default function ChatBar({username, data, form, setForm, channelData, setCurrentChannel, userId, logout}) { 

    // rolling channels on arrow click
    const [rolled, setRolled] = useState(true)
    // displaying error
    const [error, setError] = useState('')
    // displaying alert
    const [alertVisible, setAlertVisible] = useState(false)
    // channels for server side rendering
    const [channels, setChannels] = useState([]);

    const { name } = useParams();
    const product = data.find(product => product.name === name);
    const owner = product ? product.owner : '';

    useEffect(() => {
        const filteredChannels = channelData.filter(channel => channel.parent === name);
        setChannels(filteredChannels);
    }, [channelData, name]);


    const checkUser = () => {
        if (username === owner) {
            setForm(true)
        } else {
            setForm(false)
            setError('You are not the owner of this channel')
            setAlertVisible(true)
            setTimeout(() => {
                setAlertVisible(false)
            }, 2000);
        }
    }






  return (
    <>
    <div className='flex flex-col min-w-[250px] h-screen bg-[#282b30] text-gray-300'>
        <div className='p-4 text-lg font-bold shadow-sm shadow-[#1e2124] w-full'>
            <p className='text-center'>Server of user {owner}</p>
        </div>
        <div className='flex py-5 w-full items-center justify-between text-gray-400'>
            <div onClick={() => rolled ? setRolled(false) : setRolled(true)} className='flex ml-1  w-[80%] hover:text-gray-300 cursor-pointer'>
                { rolled ? <MdKeyboardArrowDown  /> : <MdKeyboardArrowRight />}
                <p className='text-xs '>TEXT CHANNELS</p>
            </div>
            <FaPlus onClick={checkUser} className='text-xs mr-4 hover:text-gray-300 cursor-pointer' />
        </div>
        <div className='flex flex-col h-full overflow-y-scroll scrollbar-hide'>
            {   rolled ? channels.map((item, index) => (
                <SubChannel
                    key={item.channel}
                    name={item.channel}
                    server={name}
                    changeChannel={setCurrentChannel}
                />
            ))
            : null
        }
        </div>
        <UserInterface username={username} userId={userId} channelData={data} logout={logout} />
    </div>
    {form ? <ChannelForm form={form} setForm={setForm} owner={owner} name={name} /> : null}
    {alertVisible ? <div className='absolute top-0 left-[50%] text-sm bg-black/60 text-white h-[80px] rounded-bl-lg rounded-br-lg flex items-center p-6'>
        <p className='text-justify text-gray-400 font-bold'>{error}</p>
    </div> : null}
    </>
  )
}
