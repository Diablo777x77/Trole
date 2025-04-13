import React, { useEffect, useState } from 'react';
import socket from '../socket/socket';
export default function GameRoom({ playerName }) {
  const [hp, setHp] = useState(100);
  const [enemyHp, setEnemyHp] = useState(100);
  const [turn, setTurn] = useState(false);
  const [anim, setAnim] = useState('');

  useEffect(() => {
    const throwAudio = new Audio('/audio/throw.mp3');
    const hitAudio = new Audio('/audio/hit.mp3');
    socket.emit('join', { name: playerName });
    socket.on('start', () => setTurn(true));
    socket.on('attack', () => {
      setAnim('hit');
      hitAudio.play();
      setHp(prev => Math.max(prev - 10, 0));
      setTurn(true);
      setTimeout(() => setAnim(''), 1000);
    });
  }, [playerName]);

  const attack = () => {
    if (!turn) return;
    const throwAudio = new Audio('/audio/throw.mp3');
    throwAudio.play();
    socket.emit('attack');
    setEnemyHp(prev => Math.max(prev - 10, 0));
    setTurn(false);
  };

  return (
    <div>
      <h2>{playerName}</h2>
      <div className={`troll ${anim}`}>TROLL</div>
      <p>Twoje HP: {hp}</p>
      <p>Wróg HP: {enemyHp}</p>
      <button onClick={attack} disabled={!turn}>Rzuć kamień</button>
    </div>
  );
}