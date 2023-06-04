import { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import axios from "axios";

function BackOfficeEdit() {
  const [title, setTitle] = useState("");
  const [image, setImage] = useState("");
  const [link, setLink] = useState("");
  const [description, setDescription] = useState("");
  const [isaproved, setIsaproved] = useState(false);

  const navigate = useNavigate();
  const {galleryId} = useParams();

  const getGallery = async () => {
    try {
      const res = await axios.get(
        `${process.env.REACT_APP_SERVER_URL}/admin/${galleryId}`
      );
      console.log(res.data);
      setTitle(res.data.title);
      setImage(res.data.image);
      setLink(res.data.link);
      setDescription(res.data.description);
      setIsaproved(res.data.isapproved);
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    getGallery();
  }, [galleryId]);

  const handleSubmit = async (e) => {
    e.preventDefault();

    const requestBody = { title, image, link, description, isaproved};

    try {
      axios.put(`${process.env.REACT_APP_SERVER_URL}/admin/${galleryId}`, requestBody);

      setTitle("");
      setImage("");
      setLink("");
      setDescription("");
      setIsaproved(false);
      navigate("/gallery");
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <div className="add-project">
      <h1>BackOffice Page</h1>
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
        
        <input
          type="radio"
          label="isaproved"
          name="isaproved"
          value="false"
          onChange={(e) => setIsaproved(e.target.value)}
        />
        <label htmlFor="isaproved">False</label>
        <input
          type="radio"
          label="isaproved"
          name="isaproved"
          value="true"
          onChange={(e) => setIsaproved(e.target.value)}
        />
        <label htmlFor="isaproved">True</label>

        <button type="submit">Submit</button>
        <button type="submit">Submit</button>
      </form>
    </div>
  );
}

export default BackOfficeEdit;