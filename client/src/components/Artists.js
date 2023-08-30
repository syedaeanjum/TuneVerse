
import React, { useState, useEffect } from 'react';
import "../css/Artist.css";

const Artists = () => {
  const [name, setName] = useState('');
  const [image, setImage] = useState('');
  const [artists, setArtists] = useState([]);

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
        // Handle 404 error if needed
      }
    } catch (error) {
      console.error("Error fetching artist:", error);
    }
  }

  useEffect(() => {
    // Fetch artists data from the API endpoint
    const fetchArtistsData = async () => {
      try {
        const response = await fetch('/artists');
        if (response.status === 200) {
          const data = await response.json();
          setArtists(data); // Assuming the data is an array of artists
        }
      } catch (error) {
        console.error("Error fetching artists:", error);
      }
    };
    fetchArtistsData();
  }, []);

  return (
    <div className="artists-container">
      <h1>Artists</h1>
      <ul>
        {artists.map(artist => (
          <li key={artist.id}>
            <img src={artist.image} alt={artist.name} />
            <p>{artist.name}</p>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Artists;
