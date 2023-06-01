import { useState, useEffect } from "react";
import { Link } from "react-router-dom/dist";
import axios from "axios";

function GalleryPage(props) {
  const [gallerys, setGallerys] = useState([]);

  useEffect(() => {
    axios
      .get(`${process.env.REACT_APP_SERVER_URL}/gallery`)
      .then((response) => {
        setGallerys(response.data);
      });
  }, []);

  return (
    <div>
      <h2>Gallery</h2>
      {gallerys.map((gallery) => {
        return (
          <div key={gallery._id} className="gallery">
            <h3>
              <Link to={`/gallerys/${gallery._id}`}>VIEW DETAILS</Link>
              <a href="{gallery.link}">VISIT WEB SITE</a>
            </h3>
            <p>{gallery.title}</p>
          </div>
        );
      })}
    </div>
  );
}

export default GalleryPage;
