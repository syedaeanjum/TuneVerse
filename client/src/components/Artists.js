import React, { useState, useEffect } from 'react';
import "../css/Artist.css"; 

const Artists = () => {
  const [artists, setArtists] = useState([]);
  const [name, setName] = useState('');
  const [image, setImage] = useState('');

  const handleArtist = async () => {
    try {
      const response = await fetch('/artists', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ name, image }),
      });

      if (response.status === 200) {
        const data = await response.json();
        setName(`/artists/${data.artist_id}`);
        setImage(`/artists/${data.artist_image}`);
      } else if (response.status === 404) {
        
      }
    } catch (error) {
      console.error("Error fetching artist:", error);
    }
  }

  useEffect(() => {
    
    const fetchArtistsData = async () => {
      try {
        const response = await fetch('/artists');
        if (response.status === 200) {
          const data = await response.json();
          setArtists(data); 
        }
      } catch (error) {
        console.error("Error fetching artists:", error);
      }
    };
    fetchArtistsData();
  }, []);

  return (
    <div className="artists-container">
  <div className="artists-wrapper">
    <h1>Artists</h1>
    <ul className="artist-list">
      {artists.map(artist => (
        <li className="picture-item" key={artist.id}>
          <div className="picture-container">
            <img src={artist.image} alt={artist.name} />
            <p>{artist.name}</p>
          </div>
        </li>
      ))}
    </ul>
  </div>
</div>
  );
};

export default Artists;
