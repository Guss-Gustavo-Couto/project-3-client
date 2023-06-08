import { useState, useEffect } from "react";
import { Link } from "react-router-dom/dist";
import axios from "axios";

function GalleryPage() {
  const [topRated, setTopRated] = useState(true);
  const [showTop, setShowTop] = useState([]);
  const [moreReviews, setMoreReviews] = useState(true);
  const [showMore, setShowMore] = useState([]);
  const [cronologic, setCronologic] = useState(false);
  const [showCrono, setShowCrono] = useState([]);

  const seeCronologic = () => {
    if (cronologic) {
      setCronologic(false);
      setMoreReviews(false);
      setTopRated(false);
    } else {
      setCronologic(true);
      setMoreReviews(false);
      setTopRated(false);
    }
  };

  const seeMoreReviews = () => {
    if (moreReviews) {
      setMoreReviews(false);
    } else {
      setMoreReviews(true);
      setTopRated(false);
      setCronologic(false);
    }
  };

  const seeTopRated = () => {
    if (topRated) {
      setTopRated(false);
    } else {
      setTopRated(true);
      setMoreReviews(false);
      setCronologic(false);
    }
  };

  const getCronologic = () => {
    const all = axios
      .get(`${process.env.REACT_APP_SERVER_URL}/gallery`)
      .then((response) => {
        const crono = response.data.sort((b, a) => a.createdAt - b.createdAt);
        console.log("crono sorted", crono);
        setShowCrono(crono);
      });
  };

  const getMoreReviews = () => {
    const all = axios
      .get(`${process.env.REACT_APP_SERVER_URL}/gallery`)
      .then((response) => {
        const more = response.data.sort(
          (a, b) => b.reviews.length - a.reviews.length
        );
        console.log("more sorted", more);
        setShowMore(more);
      });
  };

  const getTopRated = () => {
    const all = axios
      .get(`${process.env.REACT_APP_SERVER_URL}/gallery`)
      .then((response) => {
        const top = response.data.sort((a, b) => b.average - a.average);
        console.log("top sorted", top);
        setShowTop(top);
      });
  };

  useEffect(() => {
    seeCronologic();
    getCronologic();
    seeTopRated();
    getTopRated();
    seeMoreReviews();
    getMoreReviews();
  }, []);

  return (
    <div className="space">
    <div className="centered-form-content">
    <div className="centered-contents">
      <h2 className="titles">Gallery</h2><br/>
      <span className="phrases">Filter By:     </span>
      <button className="form-button"
        onClick={() => {
          seeTopRated();
        }}
      >
        Top Rated
      </button >
      <button className="form-button"
        onClick={() => {
          seeMoreReviews();
        }}
      >
        More Reviews
      </button >
      <button className="form-button"
        onClick={() => {
          seeCronologic();
        }}
      >
        Cronologically
      </button> <br/><br/><br/><br/>

      <div className = "section2">
      {topRated &&
        showTop.map((gallery) => {
          if (gallery.isaproved) {
            return (
              
              <div key={gallery._id} className="gallery-card">
                
                <a href={gallery.link} target="_blank">
                <img src={gallery.image} className="gallery-img" />
                </a>
                <p className="gallery-title">{gallery.title}</p>
                {gallery.average && <img className="star-img"src={`/images/${gallery.average}-star.png`} />}<br/><br/>
                <Link to={`/details/${gallery._id}`}><button className="form-button">View Details</button></Link> <br/><br/>
                <br/>
              </div>
              
            );
          } else {
            return null;
          }
        })}
        </div>
        <div className = "section2">
      {moreReviews &&
        showMore.map((gallery) => {
          if (gallery.isaproved) {
            return (
              <div key={gallery._id} className="gallery-card">
                
                <a href={gallery.link} target="_blank">
                <img src={gallery.image} className="gallery-img" />
                </a>
                <p className="gallery-title">{gallery.title}</p>
                {gallery.average && <img className="star-img"src={`/images/${gallery.average}-star.png`} />}<br/><br/>
                <Link to={`/details/${gallery._id}`}><button className="form-button">View Details</button></Link> <br/><br/>
                <br/>
              </div>
            );
          } else {
            return null;
          }
        })}
        </div>
      <div className = "section2">
      {cronologic &&
        showCrono.map((gallery) => {
          if (gallery.isaproved) {
            return (
              <div key={gallery._id} className="gallery-card">
                
                <a href={gallery.link} target="_blank">
                <img src={gallery.image} className="gallery-img" />
                </a>
                <p className="gallery-title">{gallery.title}</p>
                {gallery.average && <img className="star-img"src={`/images/${gallery.average}-star.png`} />}<br/><br/>
                <Link to={`/details/${gallery._id}`}><button className="form-button">View Details</button></Link> <br/><br/>
                <br/>
              </div>
            );
          } else {
            return null;
          }
        })}
        </div>
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

export default GalleryPage;
