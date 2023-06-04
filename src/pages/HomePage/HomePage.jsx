import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';

function HomePage() {
  const [gallery, setGallery] = useState([]);

  const getAllGallerys = () => {};

  return (
    <div>
      <h1>Home page</h1>
      <h2>What's New</h2>
      <div>
        <div>
          <img style={{ width: '100%' }} src={new1.imageUrl} alt={new1.title} />
          <h4>{new1.title}</h4>
        </div>
        <div>
          <img style={{ width: '100%' }} src={new2.image} alt={new2.title} />
          <h4>{new2.title}</h4>
        </div>
        <div>
          <img style={{ width: '100%' }} src={new3.image} alt={new3.title} />
          <h4>{new3.title}</h4>
        </div>
        <div>
          <img class="rounded-3" style={{ width: '100%' }} src={new4.imageUrl} alt={new4.title} />
          <h4>{new4.title}</h4>
        </div>
      </div>
      <h2>About</h2>
      <p></p>
    </div>
  );
}

export default HomePage;

