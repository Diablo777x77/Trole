import { io } from 'socket.io-client';
const socket = io('https://trolle-server.vercel.app');
export default socket;