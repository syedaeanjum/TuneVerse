import React, { useEffect, useState } from "react";
import "../css/Songs.css";

const Songs = () => {
const [songs, setSongs] = useState ([])
useEffect(() => {
  fetch ('/songs')
  .then (r=>r.json())
  .then (s => setSongs(s))
},[])

  return (
    <div className="songs-container">
      <h1>Songs</h1>
      <div className="songs-list">
        {songs.map((card, index) => (
          <div key={index} className="song-card">
            <h3>{card.title}</h3>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Songs;
