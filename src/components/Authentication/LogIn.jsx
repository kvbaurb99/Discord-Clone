import axios from 'axios';
import React, { useState } from 'react'
import { Link } from 'react-router-dom'
import { useNavigate } from 'react-router-dom';
import { AiOutlineLoading3Quarters } from 'react-icons/ai'

export default function LogIn({username, password, setUsername, setPassword, setAuthData}) {

    const navigate = useNavigate();
    const [loginStatus, setLoginStatus] = useState('');
    const [loading, setLoading] = useState(false)

    const login = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
        const response = await axios.post('https://fierce-savannah-71823.herokuapp.com/login', {
            username: username,
            password: password,
        });
        if (!response.data.message) {
            const authData = { isLoggedIn: true, user: response.data };
            localStorage.setItem('authData', JSON.stringify(authData));
            setAuthData(authData);
            setLoginStatus('Logged in successfully!');
            navigate('/main');
        } else if (username === '' || password === '') {
            setLoginStatus('Username and password cannot be empty!');
        } else if (response.data.message) {
            setLoginStatus('Wrong username or password!');
        }
    } catch (error) {
        console.error(error);
    }
    setLoading(false);
};

  return (
    <div className='h-screen w-full flex justify-center items-center'>
    <img src="https://i.redd.it/t7b5j2cqpce21.png" alt="" className='h-screen w-full object-fit absolute top-0 left-0' />
    <div className='w-[70%] h-[55%] md:w-[22%] md:h-[45%] bg-[#36393e] relative z-10 rounded-lg'>
        <div className='w-[90%] h-full flex flex-col m-auto'>
            <p className='text-white text-center py-6 font-bold text-2xl md:text-3xl'>Log In</p>
            <form onSubmit={login} className='flex flex-col text-gray-300'>
                <h1 className='text-center text-sm text-red-600'>{loginStatus}</h1>
                <label className='text-xs font-bold mt-6' htmlFor="user">USERNAME <span className='text-red-600'>*</span></label>
                <input onChange={(e) => setUsername(e.target.value)} type="text" name="user" id="user" className='mt-2 py-2 bg-[#1e2124] outline-none border-none rounded px-2' />
                <label className='text-xs font-bold mt-6' htmlFor="password" >PASSWORD <span className='text-red-600'>*</span></label>
                <input onChange={(e) => setPassword(e.target.value)} type="password" name="" id="password" className='mt-2 py-2 bg-[#1e2124] outline-none border-none rounded px-2' />
                <button type="submit" className='bg-blue-600 mt-9 py-3 font-bold rounded cursor-pointer hover:bg-blue-700 active:bg-blue-800 flex justify-center'>{loading ? <AiOutlineLoading3Quarters className='animate-spin text-xl'/> : 'Continue' }</button>
            </form>
            <Link to={'/'} className='text-blue-500 mt-3 cursor-pointer hover:underline text-sm'>Don't have account?</Link>
        </div>
    </div>
</div>
  )
}
