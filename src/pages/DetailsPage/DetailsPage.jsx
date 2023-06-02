import { useState, useEffect } from "react";
import axios from "axios";
import { Link, useParams } from "react-router-dom";

function DetailsPage(props) {
  // write state. By default it'll be null because we don't have
  // the project
  const [gallery, setGallery] = useState(null);

  // grab the ProjectId from route params
  const { galleryId } = useParams();

  // function to call axios to do a GET request
  // to find a Project by the Id.
  const getGallery = () => {
    axios
      .get(`${process.env.REACT_APP_SERVER_URL}/details/${galleryId}`)
      .then((response) => {
        const oneGallery = response.data;
        setGallery(oneGallery);
      })
      .catch((error) => console.log(error));
  };

  // Side-effect after initial render of the component.
  // The empty array must be as a parameter to tell to React that
  // it'll happen after it renders the component

  useEffect(() => {
    getGallery();
  }, []);

  return (
    <div className="project-details">
      {gallery && (
        <div>
          <h2>Details</h2>
          <h1>{gallery.title}</h1>
          <img src={gallery.image} />
          <p>{gallery.description}</p>
          <a href={gallery.link} target="_blank" />
          <p>{gallery.reviews}</p>

         
        </div>
      )}

      <Link to="/gallery">
        <button>Back to Gallery</button>
      </Link>
    </div>
  );
}

export default DetailsPage;
