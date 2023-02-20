import React from 'react'
import { AiOutlineGithub, AiFillLinkedin, AiOutlineArrowLeft } from 'react-icons/ai'
import { Link, useNavigate } from 'react-router-dom'

export default function Author() {

    const navigate = useNavigate()

    const previous = () => {
        navigate('/main')
    }

  return (
    <div className='w-full h-screen bg-blue-600 flex justify-center items-center'>
        <div className='w-[40%] h-[40%] bg-[#36393e] rounded-xl flex flex-col'>
            <div className='w-full text-center'>
                <h1 className='text-4xl font-bold text-gray-300 mt-5'>Discord Clone App</h1>
            </div>
            <div className='w-full flex justify-center mt-[10%] gap-5 text-gray-300'>
                <Link to='https://github.com/kvbaurb99' target='_blank'><AiOutlineGithub className='text-6xl animate-pulse cursor-pointer' /></Link>
                <Link to='https://www.linkedin.com/in/jakub-urba%C5%84ski-74903524a/' target='_blank'><AiFillLinkedin className='text-6xl animate-pulse cursor-pointer text-blue-600' /></Link>
            </div>
            <div className='text-center mt-[8%]'>
            <p className='text-xs font-bold text-gray-400 mt-3'>This app is only copy of Discord created for programming training purposes, original app can be found here:</p>
                <a href='https://discord.com/' target='_blank' className='text-blue-600 underline text-sm relative top-1 font-bold hover:text-blue-700'>Discord</a>
            </div>
            <div onClick={previous} className='absolute p-4 text-lg text-gray-300 cursor-pointer'><AiOutlineArrowLeft /></div>
        </div>
    </div>
  )
}
