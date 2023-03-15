import React, { useState } from 'react'
import { BsFillTrashFill } from 'react-icons/bs'
import axios from 'axios';
import { AiOutlineLoading3Quarters } from 'react-icons/ai'
import { useNavigate } from 'react-router-dom';

export default function ChannelToManage({name, owner, setShowForm}) {

    const formattedTitle = `${name.charAt(0).toUpperCase()}${name.charAt(1)}${name.charAt(2)}`;
    const [loading, setLoading] = useState(false)
    const navigate = useNavigate()
    const handleDelete = async () => {
        setLoading(true)
        navigate('/main')
        try {
            await axios.post('https://fierce-savannah-71823.herokuapp.com/deletechannel' , {
                name: name
            });
        } catch (error) {
            console.log(error)
        }
        setLoading(false)
    }
  return (
<>
    <div className='flex items-center justify-around mt-6'>
        <div className='rounded-full w-[50px] h-[50px] flex items-center justify-center text-white font-bold bg-[#424549]'>
            <p>{formattedTitle}</p>
        </div>
        <div className='text-sm'>
            <p>Name: {name}</p>
            <p>Owner: {owner}</p>
        </div>
        <div className='flex'>
            <div onClick={handleDelete} className='rounded-full bg-[#424549] w-[30px] h-[30px] flex justify-center items-center hover:bg-red-600 cursor-pointer'>
                {loading ? <AiOutlineLoading3Quarters className='animate-spin' /> : <BsFillTrashFill className='text-sm' />}
            </div>
        </div>
    </div>
</>
  )
}
