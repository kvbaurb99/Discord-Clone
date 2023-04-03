import axios from 'axios';
import React, { useState } from 'react'
import { Link } from 'react-router-dom'
import { useNavigate } from 'react-router-dom';
import { AiOutlineLoading3Quarters } from 'react-icons/ai'
import { useEffect } from 'react';
import Image from '../images/auth.jpg'

export default function LogIn({username, password, setUsername, setPassword, setAuthData}) {

    const navigate = useNavigate();
    const [error, setError] = useState('');
    const [errorCategory, setErrorCategory] = useState('')
    const [loading, setLoading] = useState(false)


    useEffect(() => {
        const formContainer = document.querySelector('.login-form-container');
        formContainer.classList.add('slide-in-top');
        document.body.classList.add('no-scroll');
        
        return () => {
          document.body.classList.remove('no-scroll');
        };
      }, []);

      useEffect(() => {
        const loginForm = document.querySelector('.login-window');
        loginForm.classList.add('slide-from-bottom');
      }, [])

  

    const login = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
        const response = await axios.post('https://fierce-savannah-71823.herokuapp.com/login', {
            username: username,
            password: password,
        });

        if (response.data.err) {
            setLoading(false)
            setError(response.data.err)
            setErrorCategory(response.data.category)
            setTimeout(() => {
                setError('')
                setErrorCategory('')
            }, 2000);

            return;
        }

        if (!response.data.message) {
            const authData = { isLoggedIn: true };
            localStorage.setItem('authData', JSON.stringify(authData));
            setAuthData(authData);          
            navigate('/main');
            window.location.reload();
        }
    } catch (error) {
        console.error(error);
    }
    setLoading(false);
};



  return (
    <div className='h-screen w-full flex justify-center items-center login-form-container bg-[#1e2124]'>
    <img src={Image} className='absolute top-0 left-0 w-full h-screen object-cover' alt="auth" />
    <div className='w-[90%] h-[55%] md:w-[25%] md:h-[45%] bg-[#36393e] relative z-10 rounded-lg login-window'>
        <div className='w-[90%] h-full flex flex-col m-auto'>
            <p className='text-white text-center py-6 font-bold text-2xl md:text-3xl animate-pulse'>Log In</p>
            <form onSubmit={login} className='flex flex-col text-gray-300'>
                <label className='text-xs font-bold mt-6' htmlFor="user">USERNAME <span className='text-red-600'>*</span></label>
                <input onChange={(e) => setUsername(e.target.value)} type="text" name="user" id="user" className={`mt-2 py-2 bg-[#1e2124] ${errorCategory === 'username' || errorCategory === 'double' ? 'border-red-600 border' : null} outline-none rounded px-2`} />
                {errorCategory === 'username' || errorCategory === 'double' ? <span className='text-xs mt-1 text-red-600'>{error}</span> : null}
                <label className='text-xs font-bold mt-6' htmlFor="password" >PASSWORD <span className='text-red-600'>*</span></label>
                <input onChange={(e) => setPassword(e.target.value)} type="password" name="" id="password" className={` ${errorCategory === 'password' || errorCategory === 'double' ? 'border-red-600 border' : null} mt-2 py-2 bg-[#1e2124] outline-none rounded px-2`} />
                {errorCategory === 'password' || errorCategory === 'double' ? <span className='text-xs mt-1 text-red-600'>{error}</span> : null}
                <button type="submit" className='bg-blue-700 mt-9 py-3 font-bold rounded cursor-pointer hover:bg-blue-800 active:bg-blue-900 flex justify-center'>{loading ? <AiOutlineLoading3Quarters className='animate-spin text-xl'/> : 'Continue' }</button>
            </form>
            <Link to={'/'} className='text-blue-600 mt-3 cursor-pointer hover:underline text-sm'>Don't have account?</Link>
        </div>
    </div>
</div>
  )
}
