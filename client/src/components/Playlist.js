import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import "../css/Playlist.css";

const Playlist = () => {
  const [playlistName, setPlaylistName] = useState("");
  const [artistName, setArtistName] = useState("");
  const [songName, setSongName] = useState("");
  const [playlistSongs, setPlaylistSongs] = useState([]); // Array to store playlist songs
  const [createdPlaylists, setCreatedPlaylists] = useState([]);

   // Load playlists from local storage on component mount
   useEffect(() => {
    const storedPlaylists = localStorage.getItem("userPlaylists");
    if (storedPlaylists) {
      setCreatedPlaylists(JSON.parse(storedPlaylists));
    }
  }, []);

  // Save playlists to local storage whenever they change
  useEffect(() => {
    localStorage.setItem("userPlaylists", JSON.stringify(createdPlaylists));
  }, [createdPlaylists]);

  const premadePlaylists = [
    { name: "Chill Vibes", description: "Relaxing tunes for a calm day." },
    { name: "Upbeat Jams", description: "Energetic tracks to lift your spirits." },
  ];

  const handleSubmit = (e) => {
    e.preventDefault();
    if (playlistName.trim() !== "" && artistName.trim() !== "" && songName.trim() !== "") {
      const newSong = {
        artist: artistName,
        song: songName,
      };
      setPlaylistSongs([...playlistSongs, newSong]);
      setArtistName("");
      setSongName("");
    }
  };

  const handlePlaylistSubmit = (e) => {
    e.preventDefault();
    if (playlistName.trim() !== "" && playlistSongs.length > 0) {
      const newPlaylist = {
        name: playlistName,
        songs: [...playlistSongs],
      };
      setCreatedPlaylists([...createdPlaylists, newPlaylist]);
      setPlaylistName("");
      setArtistName("");
      setSongName("");
      setPlaylistSongs([]);
    }
  };

  const handlePlaylistModify = async (modifiedPlaylist) => {
    try {
      const response = await fetch(`/api/playlists/${modifiedPlaylist.name}/update`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(modifiedPlaylist),
      });

      if (response.ok) {
        // Handle successful update
        // You might want to update the local state or show a success message
      } else {
        // Handle error response
        console.error("Failed to modify playlist");
      }
    } catch (error) {
      console.error("Error while modifying playlist:", error);
    }
  };

  return (
    <div className="playlist-container">
      <h1>Playlists</h1>
      <div className="premade-playlists">
        {premadePlaylists.map((playlist, index) => (
          <div key={index} className="playlist-card">
            <h3>{playlist.name}</h3>
            <p>{playlist.description}</p>
            <Link to={`/playlists/${playlist.name.toLowerCase().replace(/\s+/g, "-")}`}>
              <button>Access Playlist</button>
            </Link>
          </div>
        ))}
      </div>
      <div className="create-playlist-form">
        <h2>Create Your Own Playlist</h2>
        <form onSubmit={handleSubmit}>
          <input
            type="text"
            placeholder="Artist Name"
            value={artistName}
            onChange={(e) => setArtistName(e.target.value)}
          />
          <input
            type="text"
            placeholder="Song Name"
            value={songName}
            onChange={(e) => setSongName(e.target.value)}
          />
          <button type="submit">Add Song</button>
        </form>
        <form onSubmit={handlePlaylistSubmit}>
          <input
            type="text"
            placeholder="Playlist Name"
            value={playlistName}
            onChange={(e) => setPlaylistName(e.target.value)}
          />
          {playlistSongs.length > 0 && (
            <div>
              <h3>Songs in Playlist:</h3>
              <ul>
                {playlistSongs.map((song, index) => (
                  <li key={index}>
                    {song.artist} - {song.song}
                  </li>
                ))}
              </ul>
            </div>
          )}
          <button type="submit">Create Playlist</button>
        </form>
      </div>
      <div className="user-playlists">
        <h2>Your Created Playlists</h2>
        <ul>
          {createdPlaylists.map((playlist, index) => (
            <li key={index}>
              {playlist.name}
              <ul>
                {playlist.songs.map((song, index) => (
                  <li key={index}>
                  {song.artist} - {song.song} 
                  </li>
                ))}
              </ul>
              <button onClick={() => handlePlaylistModify(playlist)}>
          Modify Playlist
        </button>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default Playlist;
