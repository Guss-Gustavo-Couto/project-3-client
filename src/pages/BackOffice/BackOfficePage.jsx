import { useState, useEffect } from "react";
import { Link } from "react-router-dom/dist";
import axios from "axios";

function BackOfficePage(props) {
  const [gallerys, setGallerys] = useState([]);
  const [gallery, setGallery] = useState({});

  useEffect(() => {
    axios.get(`${process.env.REACT_APP_SERVER_URL}/admin`).then((response) => {
      setGallerys(response.data);
    });
  }, []);

  if (gallery.isaproved === false) {
    return (
      <div>
        <h2>BackOffice Page</h2>
        {gallerys.map((gallery) => {
          return (
            <div key={gallery._id}>
              <p>{gallery.title}</p>
              <a href={gallery.link} target="_blank">
                Go To WebSite
              </a>
              <img src={gallery.image} />
              <Link to={`/backoffice/${gallery._id}`}>Edit</Link>
            </div>
          );
        })}
      </div>
    );
  } else {
    return (
      <div>
      </div>
    )
  }
}

export default BackOfficePage;
