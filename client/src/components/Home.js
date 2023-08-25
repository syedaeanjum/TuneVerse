import React from "react";
import "../css/Home.css"; // Import the CSS file

const Home = () => {
  const cardData = [
    {
      imageSrc: "image1.jpg",
      songName: "Song 1",
      link: "/songs/1",
    },
    {
      imageSrc: "image2.jpg",
      songName: "Song 2",
      link: "/songs/2",
    },
    {
        imageSrc: "image3.jpg",
        songName: "Song 3",
        link: "/songs/3",
      },
      {
        imageSrc: "image4.jpg",
        songName: "Song 4",
        link: "/songs/4",
      },
      {
        imageSrc: "image5.jpg",
        songName: "Song 5",
        link: "/songs/5",
      },
  ];

  return (
    <div>
      <h1>Hot Tunes Right Now!</h1>
      <div className="card-container">
        {cardData.map((card, index) => (
          <div key={index} className="card">
            <img src={card.imageSrc} alt={card.songName} />
            <h3>{card.songName}</h3>
            <a href={card.link}>Listen</a>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Home;
