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

  const handleGalleryDelete = (galleryId) => {
    axios
      .delete(`${process.env.REACT_APP_SERVER_URL}/admin/${galleryId}`)
      .then((response) => {
        // Refresh the gallery details after successful review deletion
        getGallery();
        navigate("/backoffice");
      })
      .catch((error) => console.log(error));
  };

  // ******** this method handles the file upload ********
  const handleFileUpload = async (e) => {
    // console.log("The file to be uploaded is: ", e.target.files[0]);
    try {
      const uploadData = new FormData();
      uploadData.append("image", e.target.files[0]);
      const response = await axios.post(
        `${process.env.REACT_APP_SERVER_URL}/upload`,
        uploadData
      );
      console.log(response.data.fileUrl);
      setImage(response.data.fileUrl);
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
        <input type="file" onChange={(e) => handleFileUpload(e)} />
        

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
        <button
              className="link-button"
              type="button"
              onClick={() => handleGalleryDelete(galleryId)}
            >
              Delete
            </button>
      </form>
    </div>
  );
}

export default BackOfficeEdit;