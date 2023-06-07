import { useState } from "react";
import axios from "axios";
import { useNavigate, useParams } from "react-router-dom";

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
    <div className="space">
    <div className="centered-form-content">
    <div className="centered-contents">
      <br />
      <h3 className="titles">Submit your Absurdities</h3>
      <form onSubmit={handleSubmit}>
        <label className="phrases">Title:</label><br/>
        <input className="form-style"
          type="text"
          name="title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
        />
        <br />
        <br />
        <label className="phrases">Image:</label><br/>
        <input className="form-style" type="file" onChange={(e) => handleFileUpload(e)} />
        <br />
        <label className="phrases">Description:</label><br />
        <textarea className="form-style"
          type="text"
          name="description"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
        />
        <br />
        <br />
        <label className="phrases">Link to Website:</label><br />
        <input className="form-style"
          type="text"
          name="link"
          value={link}
          onChange={(e) => setLink(e.target.value)}
        />
        <br />
        <br />
        <br />
        <button className="form-button" type="submit">Submit</button>
      </form>
      <br/>
      
      <div className="footer-overlay">
        <img className="logo" src="/images/footer-branco.png" alt="Logo"  /> </div>
       <iframe className="iframe" title="Background" src="https://smashthewalls.com/"
      ></iframe>
      <br/>
      </div>
      <br/>
    </div>
    </div>
  );
}

export default SubmitPage;
