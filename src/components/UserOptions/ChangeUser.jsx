import React, { useState } from 'react'
import axios from 'axios'
import { useNavigate } from 'react-router-dom'
import { AiOutlineLoading3Quarters } from 'react-icons/ai'

export default function ChangeUser({setShowForm, user, userId}) {

    const [newUser, setNewUser] = useState('')
    const [alert, setAlert] = useState('')
    const navigate = useNavigate('')
    const [loading, setLoading] = useState(false)

    const showAlert = (message) => {
        setAlert(message);
        setTimeout(() => {
          setAlert('');
        }, 3000);
      };

    const changeUser = (e) => {
        e.preventDefault();
        setLoading(true)
        axios.post('https://fierce-savannah-71823.herokuapp.com/change', {
            username: newUser,
            id: userId,
            current: user
        }).then(res => {
            if (res.data.err) {
                showAlert(res.data.err)
                setLoading(false)
            } else {
            localStorage.removeItem('username'); 
            navigate('/login')
            setLoading(false)
            window.location.reload() 
            }
        })
    }

    const handleKeyDown = (e) => {
        if (e.key === 'Enter') {
          changeUser(e);
        }
      }

  return (
    <div className='absolute top-0 right-0 w-full h-screen bg-black/80 flex justify-center items-center z-50'>
    <div className='w-[95%] h-[35%] md:w-[30%] md:h-[25%] bg-[#282b30] rounded-2xl flex justify-center items-center flex-col'>
         <div className='mb-6'>
         <p className='text-sm text-center'>Change your username, remember to log in next time with your new username </p>
         <p className='text-xs text-center relative top-2 text-blue-600'>After succesfull change you will be navigated to login page to log in again</p>
         {alert ? <div className='absolute top-0 left-0 right-0 mx-auto w-[20%] h-[10%] bg-[#282b30] rounded-bl-xl rounded-br-xl flex justify-center items-center'>
            <p className='text-red-600'>{alert}</p>
         </div> : null}
         </div>
         <form onSubmit={changeUser} className='w-full flex flex-col items-center'>
         <input onChange={(e) => setNewUser(e.target.value)} onKeyDown={handleKeyDown} value={newUser} placeholder='New username...' type="text" name="" id="" className='w-[85%] py-2 rounded-xl bg-[#424549] border-none outline-none px-4' />
         <div className='w-full flex justify-center gap-10 relative top-5'>
            <button onClick={() => setShowForm('main')} className='bg-red-600 px-6 py-1 rounded-lg font-bold cursor-pointer hover:bg-red-700'>Back</button>
            <button type="submit" className='bg-blue-600 px-6 py-1 rounded-lg font-bold cursor-pointer hover:bg-blue-700'>{loading ? <AiOutlineLoading3Quarters className='animate-spin' /> : 'Change'}</button>
         </div> 
         </form>        
    </div>
</div>
  )
}
