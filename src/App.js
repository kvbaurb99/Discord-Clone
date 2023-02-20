import { useEffect, useState } from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import LogIn from "./components/Authentication/LogIn";
import Main from "./components/Main/Main";
import axios from "axios";
import ChannelPage from "./components/Channel/ChannelPage";
import SignIn from './components/Authentication/SignIn';
import ChatPage from "./components/Chat/ChatPage";
import PrivateChat from "./components/PrivateMessage/PrivateChat";
import { createBrowserHistory } from 'history';
import Author from "./components/Author/Author";




function App() {

  // mysql authentication --------
  const [usernameReg, setUsernameReg] = useState('');
  const [passwordReg, setPasswordReg] = useState('');
  const [username, setUsername] = useState(localStorage.getItem('username') || '');
  const [password, setPassword] = useState('');
  const [authData, setAuthData] = useState()
  // -------------
  // showing form for creating server ----------
  const [showServerForm, setShowServerForm] = useState(false);
  // -----------------
  // array of servers -------
  const [serverData, setServerData] = useState([]);
  // -----------
  // array of channels ----
  const [channelData, setChannelData] = useState([]);
  // ----
  const [respond, setRespond] = useState('');
  // array of current user data -------
  const [userData, setUserData] = useState([]);
  // --------
  // array of all users data ---------
  const [usersData, setUsersData] = useState([]);
  // ---------
  const [userFriends, setUserFriends] = useState([])



  axios.defaults.withCredentials = true;
  const userId = userData.length > 0 ? userData[0].id : null;
  const history = createBrowserHistory();

  function logout() {
      history.push('/login')
      localStorage.removeItem('username');
      setAuthData(null);
      window.location.reload()
  }
  



  // getting data of servers
  useEffect(() => {
    axios.get('https://fierce-savannah-71823.herokuapp.com/api/servers').then(res => {
      setServerData(res.data);
    })
    .catch(err => {
      console.log(err)
    })
  }, [serverData]);

  // getting data of channels
  useEffect(() => {
    axios.get('https://fierce-savannah-71823.herokuapp.com/api/channels').then(res => {
      setChannelData(res.data);
    })
    .catch(err => {
      console.log(err)
    })
  }, [serverData]);
  // getting data of current user
  useEffect(() => {
    axios.get('https://fierce-savannah-71823.herokuapp.com/api/users').then(res => {
      setUserData(res.data.filter(user => user.username === username))
    })   
  }, [username])
  // getting data of all users
  useEffect(() => {
    axios.get('https://fierce-savannah-71823.herokuapp.com/api/users').then(res => {
      setUsersData(res.data)
    })
  }, [usersData])

  useEffect(() => {
    axios.get('https://fierce-savannah-71823.herokuapp.com/api/friends').then(res => {
      const filter = res.data.filter(item => item.user === username)
      setUserFriends(filter)
    })
  }, [userFriends, username])

    useEffect(() => {
    // store username in local storage
    localStorage.setItem('username', username);
  }, [username]);













  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<SignIn setUsernameReg={setUsernameReg} setPasswordReg={setPasswordReg} passwordReg={passwordReg} usernameReg={usernameReg} />} />
        <Route path="/login" element={<LogIn username={username} setUsername={setUsername} password={password} setPassword={setPassword} setAuthData={setAuthData} />} />
        <Route path='/main' element={<Main userFriends={userFriends} username={username} setShowServerForm={setShowServerForm} serverData={serverData} showServerForm={showServerForm} data={serverData} setData={setServerData} channelData={channelData} userId={userId} usersData={usersData} setAuthData={setAuthData} authData={authData} logout={logout} />} />
        <Route path='/channels/:name' element={<ChannelPage setShowServerForm={setShowServerForm} data={serverData} username={username} channelData={channelData} setData={setServerData} showServerForm={showServerForm} userId={userId} logout={logout} />} />
        <Route path='/channels/:server/:name' element={<ChatPage setShowServerForm={setShowServerForm} data={serverData} username={username} channelData={channelData} setRespond={setRespond} respond={respond} showServerForm={showServerForm} setData={setServerData} userId={userId} logout={logout} usersData={usersData} userFriends={userFriends} userData={userData} />} />
        <Route path="/main/:userId" element={<PrivateChat setShowServerForm={setShowServerForm} data={serverData} channelData={channelData} userFriends={userFriends} username={username} showServerForm={showServerForm} setData={setServerData}  userId={userId} usersData={usersData} logout={logout} />}  />
        <Route path='/main/author' element={<Author />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
