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
    <div className="space">
    <div className="centered-form-content">
    <div className="centered-contents">
    
    <h3 className="titles">Backoffice /Edit Page</h3>
      <form onSubmit={handleSubmit}>

        <label className="phrases">Title:</label><br/>
        <input className="form-style"
          type="text"
          name="title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
        /><br/> <br/>

        <label className="phrases">Image:</label><br/>
        <input  className="form-style" type="file" onChange={(e) => handleFileUpload(e)} /><br/>
        <br/>

        <label className="phrases">Description:</label><br/>
        <textarea className="form-style"
          type="text"
          name="description"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
        /><br/> <br/>

        <label className="phrases">Link:</label><br/>
        <input className="form-style"
          type="text"
          name="link"
          value={link}
          onChange={(e) => setLink(e.target.value)}
        /><br/> <br/><br/>
        
        <label className="phrases" htmlFor="isaproved">Like And Aprove !</label>
        <input 
          type="radio"
          label="isaproved"
          name="isaproved"
          value="true"
          onChange={(e) => setIsaproved(e.target.value)} />
          <label className="phrases" htmlFor="isaproved">__Not Good Enought !</label>
        <input 
          type="radio"
          label="isaproved"
          name="isaproved"
          value="false"
          onChange={(e) => setIsaproved(e.target.value)}
        /><br/> <br/> <br/> 
        

        <button className="form-button" type="submit">Submit</button> 
        <button
              className="form-button" 
              type="button"
              onClick={() => handleGalleryDelete(galleryId)}
            >
              Delete
            </button><br/>
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

export default BackOfficeEdit;