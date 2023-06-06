import { useState, useEffect } from "react";
import { Link } from "react-router-dom/dist";
import axios from "axios";

function GalleryPage(props) {
  const [gallerys, setGallerys] = useState([]);
  const [topRated, setTopRated] = useState(false);
  const [showTop, setShowTop] = useState([]);
  const [moreReviews, setMoreReviews] = useState(false);
  const [newest, setNewest] = useState(false);
  const [cronologic, setCronologic] = useState(false);

  const seeTopRated = () => {
    if (topRated) {
      setTopRated(false);
    } else {
      setTopRated(true);
    }
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
        topRated
      </button>
      <button>moreReviews</button>
      <button>Newest</button>
      <button>Cronologically</button>

      {topRated &&
        showTop.map((gallery) => {
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
              <img src='".../public/images/3-star.png' />
              {gallery.average && <p>Rating Average : {gallery.average}</p>}

              <Link to={`/details/${gallery._id}`}>
                View Details{gallery.average}
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
