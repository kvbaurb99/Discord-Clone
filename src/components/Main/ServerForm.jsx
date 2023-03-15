import React, { useState } from 'react'
import axios from 'axios';
import { AiOutlineLoading3Quarters } from 'react-icons/ai'

export default function ServerForm({username, showServerForm, setShowServerForm, userId}) {

    const [serverReg, setServerReg] = useState('');
    const serverOwnerReg = username;
    const selectedFile = 'https://i.pinimg.com/originals/07/60/44/076044059ffca0bef363e7940ea4e3ae.jpg'
    const [channelColor, setChannelColor] = useState('bg-[#424549]')
    const [loading, setLoading] = useState(false)
    const [error, setError] = useState('')
    const formattedTitle = `${serverReg.charAt(0).toUpperCase()}${serverReg.charAt(1)}${serverReg.charAt(2)}`;


    function handleColorChange(event) {
        const selectedColor = event.target.value;
        setChannelColor(selectedColor);
      }

    const createServer = (e) => {
        setLoading(true)

        
        e.preventDefault();
            axios.post('https://fierce-savannah-71823.herokuapp.com/servers', {
            name: serverReg,
            owner: serverOwnerReg,
            img: selectedFile,
            ownerid: userId,
            color: channelColor
        }).then((res) => {
            if (res.data.err) {
                setError(res.data.err);
                setTimeout(() => {
                  setError('');
                }, 2000);
               setLoading(false)
               return;
            }else {
                setShowServerForm(false);
                setLoading(false)
            }

            })
        }

        const closeForm = () => {
            setShowServerForm(false)
            setChannelColor('bg-[#424549]')
        }

        const handleKeyDown = (e) => {
            if (e.key === 'Enter') {
              createServer(e);
            }
          }


  return (
    showServerForm && (
    <div className='fixed w-screen h-screen bg-black/80 flex justify-center items-center z-50'>
        <div className='bg-white w-[425px] h-[500px] rounded-xl flex flex-col'>
            <div className='w-[90%] mt-5 flex flex-col mx-auto'>
                <h1 className='text-2xl font-bold text-center tracking-wide'>Create Server</h1>
                <p className='text-sm mt-2 text-center text-gray-500'>Your server is a place where you can spend your time with friends. Create your server and start talking.</p>
                <p className='text-center text-red-600 text-sm mt-2'>{error}</p>
            </div>
            <div className='w-full flex justify-center mt-2'>
                <div className={`w-[80px] h-[80px] ${channelColor} relative top-5 rounded-full flex justify-center items-center text-white`}>
                    <p className='font-bold'>{formattedTitle}</p>
                </div>
            </div>
            <form onSubmit={createServer} className='flex flex-col w-[90%] mx-auto mt-[2rem] justify-center items-center'>
                <label htmlFor="name" className='align-left mt-6 text-xs'>SERVER NAME</label>
                <input onKeyDown={handleKeyDown} onChange={(e) => setServerReg(e.target.value)} value={serverReg} type="text" name="name" id="name" className='bg-gray-300 w-full py-2 px-2 rounded border-none outline-none mt-1' />
                <label htmlFor="color" className='align-left mt-6 text-xs' >SERVER COLOR</label>
                <select name="color" id="color" className='w-full bg-gray-300 rounded py-2 px-2 mt-1' onChange={handleColorChange}>
                    <option value="bg-[#424549]">Gray</option>
                    <option value="bg-yellow-400">Yellow</option>
                    <option value="bg-green-600">Green</option>
                    <option value="bg-red-600">Red</option>
                    <option value="bg-pink-500">Pink</option>
                    <option value="bg-purple-600">Purple</option>
                    <option value="bg-orange-600">Orange</option>
                </select>
            <div className='w-full h-full flex mx-auto items-center justify-between mt-10'>
                <button onClick={closeForm} className='bg-red-500 text-white px-5 py-2 rounded text-sm hover:bg-red-600'>Exit</button>
                <button type="submit" className='bg-blue-500 text-white px-5 py-2 rounded text-sm hover:bg-blue-600'>{ loading ? <AiOutlineLoading3Quarters className='animate-spin' /> : 'Create'}</button>
            </div>
            </form>
        </div>
    </div>
    )
  )
}
