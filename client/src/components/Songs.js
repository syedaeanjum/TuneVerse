import React from "react";
import "./Songs.css";

const Songs = () => {
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
    {
        imageSrc: "image6.jpg",
        songName: "Song 6",
        link: "/songs/6",
      },
      {
        imageSrc: "image7.jpg",
        songName: "Song 7",
        link: "/songs/7",
      },
      {
        imageSrc: "image8.jpg",
        songName: "Song 8",
        link: "/songs/8",
      },
      {
        imageSrc: "image9.jpg",
        songName: "Song 9",
        link: "/songs/9",
      },
      {
        imageSrc: "image10.jpg",
        songName: "Song 10",
        link: "/songs/10",
      },
      {
        imageSrc: "image11.jpg",
        songName: "Song 11",
        link: "/songs/11",
      },
      {
        imageSrc: "image12.jpg",
        songName: "Song 12",
        link: "/songs/12",
      },
      {
        imageSrc: "image13.jpg",
        songName: "Song 13",
        link: "/songs/13",
      },
      {
        imageSrc: "image14.jpg",
        songName: "Song 14",
        link: "/songs/14",
      },
      {
        imageSrc: "image15.jpg",
        songName: "Song 15",
        link: "/songs/15",
      },
  ];

  return (
    <div className="songs-container">
      <h1>Songs</h1>
      <div className="songs-list">
        {cardData.map((card, index) => (
          <div key={index} className="song-card">
            <img src={card.imageSrc} alt={card.songName} />
            <h3>{card.songName}</h3>
            <a href={card.link}>Listen</a>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Songs;
