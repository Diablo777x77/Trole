import React, { useState } from 'react';
import GameRoom from './GameRoom';
export default function Lobby() {
  const [name, setName] = useState('');
  const [joined, setJoined] = useState(false);
  return (
    <div>
      {!joined ? (
        <div>
          <h1>TrolleZ: Arena</h1>
          <input placeholder="Nick" onChange={e => setName(e.target.value)} />
          <button onClick={() => setJoined(true)}>Dołącz</button>
        </div>
      ) : (
        <GameRoom playerName={name} />
      )}
    </div>
  );
}