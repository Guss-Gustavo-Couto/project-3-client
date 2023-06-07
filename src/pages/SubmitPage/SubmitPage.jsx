import { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import IsPrivate from "../../components/IsPrivate/IsPrivate";

function SubmitPage() {
  const [title, setTitle] = useState("");
  const [image, setImage] = useState("");
  const [link, setLink] = useState("");
  const [description, setDescription] = useState("");
  const [reviews, setReviews] = useState("");

  const navigate = useNavigate();

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

  const handleSubmit = async (e) => {
    e.preventDefault();

    const requestBody = { title, image, link, description, reviews };

    try {
      axios.post(`${process.env.REACT_APP_SERVER_URL}/submit`, requestBody);

      setTitle("");
      setImage("");
      setLink("");
      setDescription("");
      setReviews("");
      navigate(`/submited`);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="add-project">
      <br />
      <form onSubmit={handleSubmit}>
        <label>Title:</label>
        <input
          type="text"
          name="title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
        />
        <br />
        <br />
        <label>Image:</label>
        <input type="file" onChange={(e) => handleFileUpload(e)} />
        <br />
        <label>Description:</label>
        <textarea
          type="text"
          name="description"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
        />
        <br />
        <br />
        <label>Link:</label>
        <input
          type="text"
          name="link"
          value={link}
          onChange={(e) => setLink(e.target.value)}
        />
        <br />
        <button type="submit">Submit</button>
      </form>
    </div>
  );
}

export default SubmitPage;
