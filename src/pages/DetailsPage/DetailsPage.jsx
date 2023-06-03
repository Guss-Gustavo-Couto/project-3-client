import { useParams, Link } from "react-router-dom";
import { useState, useEffect } from "react";

function GalleryDetailsPage(props) {
  const [gallery, setGallery] = useState("");
  const { galleryId } = useParams();

  const { gallerys } = props;

  useEffect(() => {
    const foundGallery = gallerys.find((oneGallery) => {
      return oneGallery._id === galleryId;
    });

    setGallery(foundGallery);
  }, [gallerys]);

  return (
    <div>
      {gallery && (
        <div>
          <h2>{gallery.title}</h2>
          <img src={gallery.image} />
          <h3>visit: {gallery.link}</h3>
          <p>{gallery.description}</p>
          <p>{gallery.reviews}</p>
          <Link to="/gallerys">Back</Link>
        </div>
      )}
    </div>
  );
}

export default GalleryDetailsPage;
