import React from "react";
import "../css/Home.css"; 

const Home = () => {
  const cardData = [
    {
      imageSrc: "https://f4.bcbits.com/img/a0363441108_5.jpg", 
      songName: "Tití Me Preguntó",
      link: "https://www.youtube.com/watch?v=Cr8K88UcO0s&ab_channel=BadBunny",
    },
    {
      imageSrc: "https://i1.sndcdn.com/artworks-XOwgFp4oSUVSuuJ9-Y02hBQ-t500x500.jpg",
      songName: "Cruel Summer",
      link: "https://www.youtube.com/watch?v=ic8j13piAhQ&ab_channel=TaylorSwiftVEVO",
    },
    {
        imageSrc: "https://i.ytimg.com/vi/PEybT27CzsY/maxresdefault.jpg",
        songName: "Meltdown",
        link: "https://www.youtube.com/watch?v=LuKm4L9ryB0&ab_channel=TravisScottVEVO",
      },
      {
        imageSrc: "https://www.billboard.com/wp-content/uploads/2022/09/Rema-Selena-Gomez-Calm-Down-2022-billboard-1548.jpg",
        songName: "Calm Down",
        link: "/songs/4https://www.youtube.com/watch?v=WcIcVapfqXw&ab_channel=SelenaGomezVEVO",
      },
      {
        imageSrc: "https://i0.wp.com/sinusoidalmusic.com/wp-content/uploads/2023/05/Web-capture_25-5-2023_233527_static.hiphopdx.com_.jpeg?fit=1497%2C843&ssl=1",
        songName: "All My Life",
        link: "https://www.youtube.com/watch?v=Z4N8lzKNfy4&ab_channel=LilDurk",
      },
  ];

  return (
    <div className="center-content">
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
