import React from "react";
import "./Artist.css";

const Artists = () => {
  const cardData = [
    {
      imageSrc: "artist1.jpg",
      artistName: "Artist 1",
      link: "/artists/1",
    },
    {
      imageSrc: "artist2.jpg",
      artistName: "Artist 2",
      link: "/artists/2",
    },
    {
      imageSrc: "artist3.jpg",
      artistName: "Artist 3",
      link: "/artists/3",
    },
    {
      imageSrc: "artist4.jpg",
      artistName: "Artist 4",
      link: "/artists/4",
    },
    {
      imageSrc: "artist5.jpg",
      artistName: "Artist 5",
      link: "/artists/5",
    },
    
  ];

  return (
    <div className="artists-container">
      <h1>Artists</h1>
      <div className="artists-list">
        {cardData.map((card, index) => (
          <div key={index} className="artist-card">
            <img src={card.imageSrc} alt={card.artistName} />
            <h3>{card.artistName}</h3>
            <a href={card.link}>Profile</a>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Artists;
