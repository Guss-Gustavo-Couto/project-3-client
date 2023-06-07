import axios from 'axios';
import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';

function HomePage() {
  const [gallerys, setGallerys] = useState([]);

  useEffect(() => {
    axios
      .get(`${process.env.REACT_APP_SERVER_URL}/api/`)
      .then((response) => {
        setGallerys(response.data);
      });
  }, []);


  return (
    <div>
      <h1>Home page</h1>
      <h2>What's New</h2>
      {gallerys.slice(0,4).map((gallery) => {
          return <div>
          <img style={{ width: '100%' }} src={gallery.image} alt={gallery.title} />
          <h4>{gallery.title}</h4>
          </div>
      })}
      <h2>About</h2>
      <p>"Our web page, 'The Most Useless Websites in the World,' is a fun community where users can share and discover
        the most useless websites they come across on the web. Each user has the ability to submit sites for approval by
        the application manager. On the homepage, we feature the 'What's New' section where users can explore the latest
        4 websites that have been uploaded and validated. Additionally, we have included the 'I Feel Lucky' button,
        which allows users to randomly discover a useless website to explore. Get ready to dive into the hilarious world
        of the most useless websites in the world!
        <br />
        Our Mission is to save the World, a Smile at a time!"</p>

        <a href={gallerys.length > 0 ? gallerys[Math.floor(Math.random() * gallerys.length)].link : ''} target="_blank">
        I FEEL LUCKY!
      </a>
    </div>
  );
}

export default HomePage;