import {useParams, Link} from "react-router-dom";
import {useState, useEffect} from 'react';

function GalleryDetailsPage(props) {
 
  const [gallery, setGallery] = useState("");
  const {galleryId} = useParams();

  const {gallerys} = props;

  useEffect(()=>{
        const foundGallery = gallerys.find((oneGallery)=>{
        return oneGallery._id === galleryId;
    })

    setGallery(foundGallery);

  }, [gallerys])

  return (
    <div>
        {   
            gallery && (
            <div>
                <h2>{gallery.name}</h2>
                <h3>Tech Stack: {gallery.technologies}</h3>
                <p>{gallery.description}</p>
                <Link to="/gallerys">Back</Link>
            </div>
        )}
    </div>
  )
}

export default GalleryDetailsPage;




