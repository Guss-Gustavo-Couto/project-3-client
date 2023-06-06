import axios from "axios";
import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";

function HomePage() {
  const [gallerys, setGallerys] = useState([]);

  useEffect(() => {
    axios.get(`${process.env.REACT_APP_SERVER_URL}/api/`).then((response) => {
      setGallerys(response.data);
    });
  }, []);

  const sites = [
    "https://onesquareminesweeper.com/",
    "https://floatingqrcode.com/",
    "https://thatsthefinger.com/",
    "https://puginarug.com/",
  ];
  const randomSite = Math.floor(Math.random() * sites.length);

  if (!gallerys || !gallerys.length) {
    return null;
  }

  return (
    <div>
      <h2>Home PAGE:</h2>

      <h2>What's New</h2>
      {gallerys.slice(0, 4).map((gallery) => {
        return (
          <div>
            <img
              style={{ width: "50%" }}
              src={gallery.image}
              alt={gallery.title}
            />
            <h4>{gallery.title}</h4>
          </div>
        );
      })}
      <h2>About</h2>

      <p>
        "Our web page, 'The Most Useless Websites in the World,' is a fun
        community where users can share and discover the most useless websites
        they come across on the web. Each user has the ability to submit sites
        for approval by the application manager. On the homepage, we feature the
        'What's New' section where users can explore the latest 4 websites that
        have been uploaded and validated. Additionally, we have included the 'I
        Feel Lucky' button, which allows users to randomly discover a useless
        website to explore. Get ready to dive into the hilarious world of the
        most useless websites in the world! Our Mission is to save the World, a
        Smile at a time !"
      </p>
      <Link to={`/${randomSite}`}>
        <button>I FEEL LUCKY!</button>
      </Link>
    </div>
  );
}

export default HomePage;
