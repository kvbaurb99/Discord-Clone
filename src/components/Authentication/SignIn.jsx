import React, { useState } from 'react'
import axios from 'axios'
import { Link, useNavigate } from 'react-router-dom'
import { AiOutlineLoading3Quarters } from 'react-icons/ai'


export default function SignIn({passwordReg, usernameReg, setUsernameReg, setPasswordReg}) {

  const [error, setError] = useState('')
  const [loading, setLoading] = useState(false)
  const navigate = useNavigate()
  const randomId = Math.floor(Math.random() * (9000 - 1000 + 1) + 1000)

  const register = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      const response = await axios.post('https://fierce-savannah-71823.herokuapp.com/register', {
        username: usernameReg,
        password: passwordReg,
        id: randomId
      });

      setError(response.data.err);
      if (!response.data.err) {
        navigate('/login')
      }
    } catch (error) {
      console.error(error);
    }

    setLoading(false);
  };


 

  return (
    <div className='h-screen w-full flex justify-center items-center'>
        <img src="https://preview.redd.it/vda9rbt01en01.png?auto=webp&s=526e77671d36dcd47c0e4282a3d7e8ea14599359" alt="" className='h-screen w-full object-fit absolute top-0 left-0' />
        <div className='w-[70%] h-[55%] md:w-[22%] md:h-[45%] bg-[#36393e] relative z-10 rounded-lg'>
            <div className='w-[90%] h-full flex flex-col m-auto'>
                <p className='text-white text-center py-6 font-bold text-2xl md:text-3xl'>Create Account</p>
                <p className='text-center text-sm text-red-600'>{error}</p>
                <form onSubmit={register} className='flex flex-col text-gray-300'>
                    <label className='text-xs font-bold mt-6' htmlFor="user">USERNAME <span className='text-red-600'>*</span></label>
                    <input  onChange={(e) => setUsernameReg(e.target.value)} type="text" name="user" id="user" className='mt-2 py-2 bg-[#1e2124] outline-none border-none rounded px-2'   />
                    <label className='text-xs font-bold mt-6' htmlFor="password" >PASSWORD <span className='text-red-600'>*</span></label>
                    <input  onChange={(e) => setPasswordReg(e.target.value)} type="password" name="" id="password" className='mt-2 py-2 bg-[#1e2124] outline-none border-none rounded px-2'  />
                    <button type="submit" className='bg-blue-600 mt-9 py-3 font-bold rounded cursor-pointer hover:bg-blue-700 active:bg-blue-800 flex justify-center'>{loading ? <AiOutlineLoading3Quarters className='animate-spin text-xl' /> : 'Continue'}</button>
                </form>
                <Link to={'/login'} className='text-blue-500 mt-3 cursor-pointer hover:underline text-sm'>Have account?</Link>
            </div>
        </div>
    </div>
  )
}
