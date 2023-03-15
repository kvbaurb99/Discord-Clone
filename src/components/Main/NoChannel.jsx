import React from 'react'
import { GiAutoRepair } from 'react-icons/gi'
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useEffect } from 'react';


export default function NoChannel() {

    const [count, setCount] = useState(5);
    const navigate = useNavigate()
  
    useEffect(() => {
      if (count === 0) {
        navigate('/main') // navigate to main page
      } else {
        const timeout = setTimeout(() => setCount(count - 1), 1000);
        return () => clearTimeout(timeout);
      }
    }, [count]);

  return (
    <div className='w-full h-screen bg-[#36393e] flex justify-center items-center flex-col'>
        <GiAutoRepair className='text-7xl text-white' />
        <p className='text-white mt-3 text-lg'>Channel or server does not exist, you will be redirected to main page in</p>
        <p className='mt-5 text-4xl text-blue-600 font-bold'>{count}...</p>
    </div>
  )
}
