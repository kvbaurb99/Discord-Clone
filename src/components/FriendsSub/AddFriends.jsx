import axios from 'axios';
import React, { useState } from 'react'

export default function AddFriends({username, userId, usersData}) {

    const [idReg, setIdReg] = useState('')
    const status = 'active'
    const [alert, setAlert] = useState('')
    const [loading, setLoading] = useState(false)

    const showAlert = (message) => {
      setAlert(message);
      setTimeout(() => {
        setAlert('');
      }, 3000);
    };


    const findUser = usersData.filter(user => user.username === idReg);
  


    const addFriend = (e) => {
      setLoading(true)
      e.preventDefault();
      if (findUser.length === 0) {
        showAlert('User not found');
        setIdReg('')
        setLoading(false)
        return;
      }
      const sortedId = findUser[0].id;
      axios.post('https://fierce-savannah-71823.herokuapp.com/requests', {
          sender: username,
          receiver: idReg,
          status: status,
          senderid: userId,
          receiverid: sortedId
      }).then(res => {
          showAlert(res.data.message)
          setIdReg('')
          setLoading(false)
      })
    }




  return (
<div className='w-full h-full flex flex-col text-gray-300'>
    <div className='w-full p-8 flex flex-col border-b border-gray-400/20'>
      {loading ? <h2 className='text-base font-bold tracking-wide animate-bounce'>ADDING...</h2> : <h2 className='text-base font-bold tracking-wide'>ADD YOUR FRIEND</h2>}
      <p className='text-sm text-gray-400 mt-1'>You can add your friend by entering his username. Be careful for UppeRcaSe and lowercase letters!</p>
      <form onSubmit={addFriend}>
      <input  value={idReg} onChange={(e) => setIdReg(e.target.value)} placeholder='Enter user name e.g. Wumpus' type="text" className='p-3 rounded-xl bg-[#1e2124] outline-none focus:border-blue-600/80 focus:border mt-3 w-full h-[50px]'/>
      {alert ? <div class="absolute top-0 left-0 right-0 mx-auto w-1/4 h-1/10 bg-blue-600 rounded-bl-xl rounded-br-xl flex justify-center items-center error">
        <p class="text-white text-center font-bold">{alert}</p>
        </div> : null}
      </form>
    </div>
    <div className='w-full flex flex-col items-center mt-8'>
      <img src="https://preview.redd.it/epufxryqsvu11.jpg?auto=webp&s=9a36324b193aad88225af0a8a90f16fadecda76f" alt="" className='w-[500px] mb-8' />
      <p className='text-gray-400'>Wumpus need someone to play with. Add some friends!</p>
    </div>
</div>
  )
}
