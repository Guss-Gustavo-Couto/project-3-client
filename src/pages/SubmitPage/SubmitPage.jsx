import { useState } from "react";
import exampleService from "../../services/example.service";

function SubmitPage(props) {
  const [title, setTitle] = useState("");
  const [image, setImage] = useState("");
  const [link, setLink] = useState("");
  const [description, setDescription] = useState("");
  const [reviews, setReviews] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();

    const requestBody = { title, image, link, description, reviews };

    exampleService.createGallery(requestBody)
      .then(() => {
        setTitle("");
        setImage("");
        setLink("");
        setDescription("");
        setReviews("");
        props.refreshGallerys();
      })
      .catch((error) => console.log(error));
  };

  return (
    <div className="add-project">
      <form onSubmit={handleSubmit}>
        <label>Title:</label>
        <input
          type="text"
          name="title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
        />

        <label>Image:</label>
        <input
          type="text"
          name="image"
          value={image}
          onChange={(e) => setImage(e.target.value)}
        />

        <label>Description:</label>
        <textarea
          type="text"
          name="description"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
        />

        <label>Link:</label>
        <input
          type="text"
          name="link"
          value={link}
          onChange={(e) => setLink(e.target.value)}
        />

        <button type="submit">Submit</button>
      </form>
    </div>
  );
}

export default SubmitPage;
