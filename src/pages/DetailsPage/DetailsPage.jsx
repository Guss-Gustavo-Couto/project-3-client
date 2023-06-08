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

    const descriptionFromForm = formData.get('description')
    const ratingFromForm = formData.get('rating')
    
    const body = {
      description: descriptionFromForm,
      rating: ratingFromForm,
      galleryId: galleryId
    }

    const authToken = localStorage.getItem('authToken')
    console.log('---> ', authToken);


    axios
      .post(`${process.env.REACT_APP_SERVER_URL}/details`, body, {
        headers: {
          Authorization: `Bearer ${authToken}`
        }
      })
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
      .delete(`${process.env.REACT_APP_SERVER_URL}/details/${reviewId}`)
      .then((response) => {
        // Refresh the gallery details after successful review deletion
        getGallery();
      })
      .catch((error) => console.log(error));
  };

  return (
    <div className="space">
    <div className="not-centered-form-content">
    <div className="centered-contents">
        
      
      {gallery && (
        <div>
          <h2 phrases3>{gallery.title}</h2>
          <img className="details-img" src={gallery.image} alt={gallery.title}/><br/>
          <br/><span>{gallery.description}</span><br/>
          <a href={gallery.link} target="_blank">
              <img className="www" src="/images/www.png"></img></a><br/>
          
          <Link to="/gallery"><button className="form-button">Back</button></Link><br/><br/><br/>
        </div>
      )}

      <h4>Leave a Review!</h4><br/>
      <span>Only Logged in Users can create a review:</span><br/><br/>

      <form className="total-form" onSubmit={handleReviewSubmit}>
        <label htmlFor="rating" className="form-label">
          <span className="phrases">Rating:</span>
          <br />
          <input
            className="form-style2"
            type="number"
            name="rating"
            min="1"
            max="10"
          />
        </label>
        <br /><br/>
        <label htmlFor="description" className="phrases">
          Content:
        </label>
        <br />
        <textarea
          className="form-style2"
          name="description"
          id="content"
          cols="30"
          rows="5"
        ></textarea>
        <br />
        <br />
        <button className="form-button" type="submit">
          Create the review
        </button>
      </form>
      <br />

      {gallery && gallery.reviews?.length > 0 && <h4 className="titles">Last Reviews!</h4>}
      {gallery &&
        gallery.reviews.map((review) => (
          <div key={review._id} className="width-percentage">
            <span className="phrases">By: </span>
            <span className="phrases3">{review.author.name}</span>
            <br />
            <span className="phrases">Rating: </span>
            <span className="phrases3">{review.rating}</span>
            <br /><br />
            <span className="phrases">Review: </span><br/>
            <span className="phrases3">{review.description}</span>
            <br />
            <br />
            <button
              className="form-button"
              type="button"
              onClick={() => handleReviewDelete(review._id)}
            >
              Delete
            </button>
            <br /> <br /> <br />
          </div>
        ))}
    <div className="footer-overlay">
        <img className="logo" src="/images/footer-branco.png" alt="Logo"  /> </div>
       <iframe className="iframe" title="Background" src="https://smashthewalls.com/"
      ></iframe>
      <br/>
      </div>
    </div>
    </div>
  );
}

export default GalleryDetailsPage;