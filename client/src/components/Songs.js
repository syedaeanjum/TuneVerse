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
            <img src={card.imageSrc} alt={card.title} />
            <h3>{card.title}</h3>
            <a href={card.link}>Listen</a>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Songs;
