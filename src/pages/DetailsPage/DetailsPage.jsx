import { useParams, Link } from "react-router-dom";
import { useState, useEffect } from "react";
import axios from "axios";

function GalleryDetailsPage(props) {
  const [gallery, setGallery] = useState(null);

  const { galleryId } = useParams();

  const getGallery = () => {
    axios
      .get(`${process.env.REACT_APP_SERVER_URL}/details/${galleryId}`)
      .then((response) => {
        const oneGallery = response.data;
        setGallery(oneGallery);
      })
      .catch((error) => console.log(error));
  };

  useEffect(() => {
    getGallery();
  }, []);

  const handleReviewSubmit = (event) => {
    event.preventDefault();
    const form = event.target;
    const formData = new FormData(form);

    axios
      .post(`/review/create/${galleryId}`, formData)
      .then((response) => {
        // Refresh the gallery details after successful review submission
        getGallery();
        // Reset the form
        form.reset();
      })
      .catch((error) => console.log(error));
  };

  const handleReviewDelete = (reviewId) => {
    axios
      .post(`/review/delete/${reviewId}`)
      .then((response) => {
        // Refresh the gallery details after successful review deletion
        getGallery();
      })
      .catch((error) => console.log(error));
  };

  return (
    <div>
      {gallery && (
        <div>
          <h2>{gallery.title}</h2>
          <img src={gallery.image} alt={gallery.title} />
          <h3>Visit: {gallery.link}</h3>
          <p>{gallery.description}</p>
          <Link to="/gallery">Back</Link>
        </div>
      )}

      <h4>Leave a Review!</h4>

      <form className="total-form" onSubmit={handleReviewSubmit}>
        <label htmlFor="rating" className="form-label">
          <p className="bold">Rating:</p>
          <br />
          <input
            className="input-field-form"
            type="number"
            name="rating"
            min="1"
            max="10"
          />
        </label>
        <br />
        <label htmlFor="content" className="form-label">
          Content:
        </label>
        <br />
        <textarea
          className="input-field-form"
          name="content"
          id="content"
          cols="30"
          rows="5"
        ></textarea>
        <br />
        <br />
        <button className="link-button" type="submit">
          Create the review
        </button>
      </form>

      <h4 className="bold">Last Reviews!</h4>
      {gallery &&
        gallery.reviews.map((review) => (
          <div key={review._id} className="width-percentage">
            <span className="bold">By: </span>
            <span>{review.author.username}</span>
            <br />
            <span className="bold">Rating: </span>
            <span>{review.rating}</span>
            <br />
            <span className="bold">Review: </span>
            <span>{review.content}</span>
            <br />
            <br />
            <button
              className="link-button"
              type="button"
              onClick={() => handleReviewDelete(review._id)}
            >
              Delete
            </button>
            <br />
          </div>
        ))}
    </div>
  );
}

export default GalleryDetailsPage;
