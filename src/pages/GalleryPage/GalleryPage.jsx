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
    <div>
      <h2>Gallery</h2>
      <h2>Filter By:</h2>
      <button
        onClick={() => {
          seeTopRated();
        }}
      >
        Top Rated
      </button>
      <button
        onClick={() => {
          seeMoreReviews();
        }}
      >
        More Reviews
      </button>
      <button
        onClick={() => {
          seeCronologic();
        }}
      >
        Cronologically
      </button>

      {topRated &&
        showTop.map((gallery) => {
          if (gallery.isaproved) {
            return (
              <div key={gallery._id} className="gallery-card">
                <p>{gallery.title}</p>
                <a href={gallery.link} target="_blank">
                  Go To WebSite
                </a>
                <img src={gallery.image} className="gallery-img" />
                <img src={`/images/${gallery.average}-star.png`} />
                {gallery.average && <p>Rating Average : {gallery.average}</p>}

                <Link to={`/details/${gallery._id}`}>View Details</Link>
              </div>
            );
          } else {
            return null;
          }
        })}


      {moreReviews &&
        showMore.map((gallery) => {
          if (gallery.isaproved) {
            return (
              <div key={gallery._id} className="gallery-card">
                <p>{gallery.title}</p>
                <a href={gallery.link} target="_blank">
                  Go To WebSite
                </a>
                <img src={gallery.image} className="gallery-img" />
                <img src={`/images/${gallery.average}-star.png`} />
                {gallery.average && <p>Rating Average : {gallery.average}</p>}

                <Link to={`/details/${gallery._id}`}>View Details</Link>
              </div>
            );
          } else {
            return null;
          }
        })}

      {cronologic &&
        showCrono.map((gallery) => {
          if (gallery.isaproved) {
            return (
              <div key={gallery._id} className="gallery-card">
                <p>{gallery.title}</p>
                <a href={gallery.link} target="_blank">
                  Go To WebSite
                </a>
                <img src={gallery.image} className="gallery-img" />
                <img src={`/images/${gallery.average}-star.png`} />
                {gallery.average && <p>Rating Average : {gallery.average}</p>}

                <Link to={`/details/${gallery._id}`}>View Details</Link>
              </div>
            );
          } else {
            return null;
          }
        })}
    </div>
  );
}

export default GalleryPage;
