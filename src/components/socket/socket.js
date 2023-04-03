import io from 'socket.io-client';

const socket = io.connect('https://fierce-savannah-71823.herokuapp.com');

export default socket;