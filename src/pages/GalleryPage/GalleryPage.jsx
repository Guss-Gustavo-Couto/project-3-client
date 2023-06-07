import { useState, useEffect } from "react";
import { Link } from "react-router-dom/dist";
import axios from "axios";

function GalleryPage(props) {
  const [gallerys, setGallerys] = useState([]);
  const [topRated, setTopRated] = useState(true);
  const [showTop, setShowTop] = useState([]);
  const [moreReviews, setMoreReviews] = useState(true);
  const [showMore, setShowMore] = useState([]);
  const [newest, setNewest] = useState(true);
  const [showNew, setShowNew] = useState([]);
  const [cronologic, setCronologic] = useState(true);
  const [showCrono, setShowCrono] = useState([]);

  const seeCronologic = () => {
    if (cronologic) {
      setCronologic(false);
    } else {
      setCronologic(true);
      setNewest(false);
      setMoreReviews(false);
      setTopRated(false);
    }
  };

  const seeNewest = () => {
    if (newest) {
      setNewest(false);
    } else {
      setNewest(true);
      setMoreReviews(false);
      setTopRated(false);
      setCronologic(false);
    }
  };

  const seeMoreReviews = () => {
    if (moreReviews) {
      setMoreReviews(false);
    } else {
      setMoreReviews(true);
      setTopRated(false);
      setNewest(false);
      setCronologic(false);
    }
  };

  const seeTopRated = () => {
    if (topRated) {
      setTopRated(false);
    } else {
      setTopRated(true);
      setMoreReviews(false);
      setNewest(false);
      setCronologic(false);
    }
  };

  const getCronologic = () => {
    const all = axios
      .get(`${process.env.REACT_APP_SERVER_URL}/gallery`)
      .then((response) => {
        const crono = response.data.sort((b, a) => a.createdAt + b.createdAt);
        console.log("crono sorted", crono);
        setShowCrono(crono);
      });
  };

  const getNewest = () => {
    const all = axios
      .get(`${process.env.REACT_APP_SERVER_URL}/gallery`)
      .then((response) => {
        const newes = response.data.sort((b, a) => a.createdAt - b.createdAt);
        console.log("new sorted", newes);
        setShowNew(newes);
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
    axios
      .get(`${process.env.REACT_APP_SERVER_URL}/gallery`)
      .then((response) => {
        setGallerys(response.data);
        console.log(response.data);
      });
    seeTopRated();
    getTopRated();
    seeMoreReviews();
    getMoreReviews();
    seeNewest();
    getNewest();
    seeCronologic();
    getCronologic();
  }, []);

  if (!gallerys) {
    return null;
  }

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
          seeNewest();
        }}
      >
        Newest
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
          return (
            <div key={gallery._id}>
              <p>{gallery.title}</p>
            </div>
          );
        })}

      {moreReviews &&
        showMore.map((gallery) => {
          return (
            <div key={gallery._id}>
              <p>{gallery.title}</p>
            </div>
          );
        })}

      {newest &&
        showNew.map((gallery) => {
          return (
            <div key={gallery._id}>
              <p>{gallery.title}</p>
            </div>
          );
        })}

{cronologic &&
        showCrono.map((gallery) => {
          return (
            <div key={gallery._id}>
              <p>{gallery.title}</p>
            </div>
          );
        })}


      {gallerys.map((gallery) => {
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

              <Link to={`/details/${gallery._id}`}>
                View Details
              </Link>
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
