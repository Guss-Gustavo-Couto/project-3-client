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
    <div className="space">
    <div className="centered-home-content">
    <div className="">
      <h2 className="titles">About</h2>
      <span className="home-phrases">Our Mission is to save the World, <br/>a Smile at a time!"</span>
      <p className="home-phrases2">Here are the Most Useless Websites in the World,' is a fun community where users can share and discover
        the most useless websites they come across on the web. Each user has the ability to submit sites for approval by
        the application manager. On the homepage, we feature the 'What's New' section where users can explore the latest
        4 websites that have been uploaded and validated. Additionally, we have included the 'I Feel Lucky' button,
        which allows users to randomly discover a useless website to explore. Get ready to dive into the hilarious world
        of the most useless websites in the world!</p> <br/><br/>

        </div>
    </div>
             
    <br/>
      <br/>
      
    <div className="centered-home-content">
    <div className="">
    <br/>
      <h1 className="titles">What's New /<br/> Latest Updates</h1>
      
      <br/>
      <br/>

      <span className="home-cards">
      {gallerys.slice(0, 4).map((gallery) => {
        
        return (
          
            <span className="home-cards">
            <img
              style={{ width: "30%" }}
              src={gallery.image}
              alt={gallery.title}
            />
            <h5>{gallery.title}</h5>
            <a href={gallery.link}>view site</a><br/>
            </span>
          
        );
        
      })}
      </span>
      
      
      <br/>
        <a href={gallerys.length > 0 ? gallerys[Math.floor(Math.random() * gallerys.length)].link : ''} target="_blank">
        <button className="form-button"> I Feel Lucky! </button></a>
      <br/><br/>

      <div className="footer-overlay">
        <img className="logo" src="/images/footer-branco.png" alt="Logo"  /> </div>
       <iframe className="iframe" title="Background" src="https://smashthewalls.com/"
      ></iframe>
      <br/>
      </div> 
      </div> 
      </div> 
  );
}

export default HomePage;