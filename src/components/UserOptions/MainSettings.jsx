import React from 'react'
import { AiOutlineUser, AiOutlineLogout, AiOutlineEdit, AiOutlineInfoCircle, AiOutlineClose } from 'react-icons/ai'
import { useNavigate } from 'react-router-dom';


export default function MainSettings({username,setShowForm, logout}) {

    const navigate = useNavigate('')

    const logOut = () => {
        logout();
        navigate('/login')
    }


  return (
    <div className='absolute top-0 right-0 w-full h-screen bg-black/80 flex justify-center items-center z-50'>
        <div className='absolute flex items-center justify-center bg-[#282b30] h-[100px] w-[100px] rounded-full top-[22%] left-[15%] md:top-[26%] md:left-[39%]'>
            <img src='https://icon-library.com/images/yellow-discord-icon/yellow-discord-icon-15.jpg' className='rounded-full w-[80px] h-[80px] bg-blue-600' alt='avatar' />
        </div>
        <div className='w-[80%] h-[60%] md:w-[25%] md:h-[55%] bg-[#282b30] rounded-2xl'>
            <div className='bg-blue-600 h-[80px] w-full rounded-tl-2xl rounded-tr-xl text-gray-300 text-lg '>
                <AiOutlineClose onClick={() => setShowForm('')} className='absolute right-[15%] md:right-[40%] mt-4 md:left-[60.5%] cursor-pointer' />
            </div>
            <div className='mt-[15%] bg-[#1e2124] w-[90%] h-[60%] mx-auto rounded-xl'>
                <div className='p-4 border-b border-gray-300 w-[95%] mx-auto'>
                    <h1 className='text-2xl font-bold'>{username}</h1>    
                </div>
                <div className='p-4 w-[95%] mx-auto border-b border-gray-300 text-gray-300'>
                    <div onClick={() => setShowForm('change')} className='flex items-center text-lg w-full hover:bg-gray-500 p-1 rounded cursor-pointer hover:text-gray-200'>
                        <AiOutlineUser />
                        <p className='ml-2'>Change username</p>
                    </div>
                    <div onClick={() => setShowForm('manage')} className='flex items-center text-lg mt-1 hover:bg-gray-500 p-1 rounded cursor-pointer hover:text-gray-200'>
                        <AiOutlineEdit />
                        <p className='ml-2'>Manage your channels</p>
                    </div>
                </div>
                <div className='p-4 w-[95%] mx-auto border-b border-gray-300 text-gray-300'>
                    <div onClick={() => navigate('/main/author')} className='flex items-center text-lg w-full hover:bg-gray-500 p-1 rounded cursor-pointer hover:text-gray-200'>
                        <AiOutlineInfoCircle />
                        <p className='ml-2'>Authors</p>
                    </div>
                    <div onClick={logOut} className='flex items-center text-lg w-full hover:bg-red-600 p-1 rounded cursor-pointer hover:text-gray-200'>
                        <AiOutlineLogout />
                        <p className='ml-2'>Log out</p>
                    </div>
                </div>
            </div>           
        </div>
    </div>
  )
}