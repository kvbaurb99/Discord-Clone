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
import NoChannel from "./components/Main/NoChannel";





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
  const [requestsData, setRequestsData] = useState([]);
  // ---------
  const [userFriends, setUserFriends] = useState([])
  const [userId, setUserId] = useState(0)



  axios.defaults.withCredentials = true;
  const history = createBrowserHistory();

  function logout() {
      history.push('/login')
      localStorage.removeItem('username');
      setAuthData(null);
      window.location.reload()
  }

  // data of channels, servers
  function getData() {
    axios.get('https://fierce-savannah-71823.herokuapp.com/api/data')
        .then(response => {
            setChannelData(response.data.channels || []);
            setServerData(response.data.servers || []);
            setUserFriends(response.data.friends.filter(item => item.user === username))
            setRequestsData(response.data.requests.filter(request => request.receiver === username))
            setUsersData(response.data.users || [])
            setUserData(response.data.users.filter(user => user.username === username))
            // initiate next request after delay
            setTimeout(getData, 2000);
        })
        .catch(error => {
            // handle error
            console.error(error);
            // initiate next request after delay
            setTimeout(getData, 2000);
        });
}

useEffect(() => {
    getData();
}, []);


    useEffect(() => {
      setUserId(userData.length > 0 ? userData[0].id : null);
    }, [userData]);
  
  
  



    useEffect(() => {
    // store username in local storage
    localStorage.setItem('username', username);
  }, [username]);



  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<SignIn setUsernameReg={setUsernameReg} setPasswordReg={setPasswordReg} passwordReg={passwordReg} usernameReg={usernameReg} />} />
        <Route path="/login" element={<LogIn username={username} setUsername={setUsername} password={password} setPassword={setPassword} setAuthData={setAuthData} />} />
        <Route path='/main' element={<Main userFriends={userFriends} username={username} setShowServerForm={setShowServerForm} serverData={serverData} showServerForm={showServerForm} data={serverData} setData={setServerData} channelData={channelData} userId={userId} usersData={usersData} setAuthData={setAuthData} authData={authData} logout={logout} setUserFriends={setUserFriends} requestsData={requestsData} />} />
        <Route path='/channels/:name' element={<ChannelPage setShowServerForm={setShowServerForm} data={serverData} username={username} channelData={channelData} setData={setServerData} showServerForm={showServerForm} userId={userId} logout={logout} />} />
        <Route path ='/channeldoesnotexist' element={<NoChannel />} />
        <Route path='/channels/:server/:name' element={<ChatPage setShowServerForm={setShowServerForm} data={serverData} username={username} channelData={channelData} setRespond={setRespond} respond={respond} showServerForm={showServerForm} setData={setServerData} userId={userId} logout={logout} usersData={usersData} userFriends={userFriends} userData={userData} />} />
        <Route path="/main/:userId" element={<PrivateChat setShowServerForm={setShowServerForm} data={serverData} channelData={channelData} userFriends={userFriends} username={username} showServerForm={showServerForm} setData={setServerData}  userId={userId} usersData={usersData} logout={logout} />}  />
        <Route path='/main/author' element={<Author />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
