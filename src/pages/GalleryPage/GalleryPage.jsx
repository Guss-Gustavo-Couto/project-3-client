import { useState, useEffect } from "react";
import { Link } from "react-router-dom/dist";

function GalleryPage(props) {
  const [gallerys, setGallerys] = useState([]);

  useEffect(()=>{
    setGallerys(props.gallerys);
  }, [props.gallerys]);;
 
    return (
      <div>
          <h2>Gallery</h2>
          {gallerys.map((gallery)=>{
              return(
                  <div key={gallery._id} className="gallery">
                      <h3>
                      <Link to={`/gallerys/${gallery._id}`}>VIEW DETAILS</Link>
                        <a href="{gallery.link}">VISIT WEB SITE</a>
                      
                      </h3>
                      <p>{gallery.title}</p>
                  </div>
              )
          })}
      </div>
    )
  }

export default GalleryPage;
 