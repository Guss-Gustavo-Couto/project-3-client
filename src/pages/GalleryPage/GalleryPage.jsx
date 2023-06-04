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

  if(!gallerys){
    return null
  }

  return (
    <div>
      <h2>Gallery</h2>
      {gallerys.map((gallery) => {
        if(gallery.isaproved){
          return (
            <div key={gallery._id} className="gallery">
              <p>{gallery.title}</p>
              <a href={gallery.link} target="_blank">Go To WebSite</a>
              <img src={gallery.image}/>
              {gallery.average && <p>avg rating: {gallery.average}</p>}
              
                <Link to={`/details/${gallery._id}`}>View Details</Link>
                 
              
            </div>
          ); 
          
        }else {
          return null
        }
      })}
    </div>
  );
}

export default GalleryPage;