import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import "../css/Playlist.css";


const Playlist = () => {
  const [playlistName, setPlaylistName] = useState("");
  const [artistName, setArtistName] = useState("");
  const [songName, setSongName] = useState("");
  const [playlistSongs, setPlaylistSongs] = useState([]);
  const [createdPlaylists, setCreatedPlaylists] = useState([]);
  const [playlists, setPlaylists] = useState([]);
  const [playlistId, setPlaylistId] = useState("")
  const [detailId, setDetailId] = useState("")
  const [showForm, setShowForm] = useState(false)
  const [newPlaylistName, setNewPlaylistName] = useState('')


  const handleDetail = (detailedPlaylist) => {
    setDetailId(detailedPlaylist)
  }

  // console.log(detailId)
  // const premadePlaylists = [
  //   { name: "Chill Vibes", description: "Relaxing tunes for a calm day." },
  //   { name: "Upbeat Jams", description: "Energetic tracks to lift your spirits." },
  // ];

  useEffect(() => {
    fetch('/playlists')
      .then(r => r.json())
      .then(playlists => setPlaylists(playlists))
      .catch(error => console.error("Error while fetching playlists:", error));
  }, []);


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
    if(playlistName.length <5)
      {alert('Please enter playlist with at least 5 characters')}
    if (playlistName.trim() !== "") {
      const newPlaylist = {
        name: playlistName,
        songs: [...playlistSongs],
      };
      fetch('/playlists', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(newPlaylist),
      })
        .then(r => r.json())
        .then(p => {
          console.log(p)
          window.confirm ('Playlist successfully created.')
          setCreatedPlaylists([...createdPlaylists, newPlaylist]);
          setPlaylistName("");
          setArtistName("");
          setSongName("");
          setPlaylistSongs([]);
        })
    }
  }
  const handleShowForm = () => {
    setShowForm(!showForm);
  }
  const handlePlaylistModify = async (playlistId) => {
    try {
      const updatedData = {
        name: newPlaylistName,
      };

      const response = await fetch(`/playlists/${playlistId}`, {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(updatedData),
      });

      if (response.ok) {
        // Update the playlist name in your playlists state
        setPlaylists((prevPlaylists) =>
          prevPlaylists.map((playlist) =>
            playlist.id === playlistId ? { ...playlist, name: newPlaylistName } : playlist
          )
          
        );
        setNewPlaylistName('');
        console.log("Playlist modified successfully");
      } else {
        console.error("Failed to modify playlist");
        window.confirm ('Playlist name must be at least 5 characters.')
      }
    } catch (error) {
      console.error("Error while modifying playlist:", error);
    }
  };




  const deletePlaylist = async (playlistId) => {

    try {
      const response = await fetch(`/playlists/${playlistId}`, {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
        },
      });
      if (response.ok) {
        console.log("Playlist deleted successfully");
        setPlaylists(playlists.filter(playlist => playlist.id !== playlistId))
      } else {
        console.log(playlistId)
        console.error("Failed to delete playlist");
      }
    } catch (error) {
      console.error("Error:", error);
    }
  };


  return (
    <div className="playlist-container">
      <h1>Playlists</h1>
      <div className="premade-playlists">
        {playlists.map((playlist, index) => (
          <div key={index} className="playlist-card">
            <h3>{playlist.name}</h3>
            <p>{playlist.description}</p>
            {playlist.id === detailId ?
              <div>
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
                    </li>
                  ))}
                </ul>
                <button onClick={() => handleDetail('')}>
                  Less info</button>
                <button onClick={() => deletePlaylist(playlist.id)}>
                  Delete Playlist
                </button>
              </div>
              :
              <button onClick={() => handleDetail(playlist.id)}> More Info </button>
            }

            <Link to={`/playlists/${playlist.name.toLowerCase().replace(/\s+/g, "-")}`}>
              <button>Access Playlist</button>
            </Link>
            <button onClick={handleShowForm}>
              Rename Playlist
            </button>
            {
              showForm ? (
                <form onSubmit={handleSubmit}>
                  <input
                    type="text"
                    placeholder="Change Playlist Name"
                    value={newPlaylistName}
                    onChange={(e) => setNewPlaylistName(e.target.value)}
                  />
                  <button onClick={() => handlePlaylistModify(playlist.id)}>Modify Playlist</button>

                </form>
              ) : null
            }
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
                    {song.artist} - {song.title}
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
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};


export default Playlist;