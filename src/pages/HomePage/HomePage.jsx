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


  if(!gallerys || !gallerys.length){
    return null
  }

  return (
    <div>
      <h1>Home page</h1>
      <h2>What's New</h2>
      {gallerys.slice(0,4).map((gallery) => {
          return <div>
          <img style={{ width: '100%' }} src={gallery.imageUrl} alt={gallery.title} />
          <h4>{gallery.title}</h4>
          </div>
      })}
      <h2>About</h2>
      <p></p>
    </div>
  );
}

export default HomePage;
