import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";

function EditProfilePage() {
  // Write State
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [media, setMedia] = useState("");
  const [image, setImage] = useState("");

  // req.params => Express
  // useParams() => ReactJS

  const { userId } = useParams();

  const navigate = useNavigate();

  const handleName = (e) => setName(e.target.value);
  const handleDescription = (e) => setDescription(e.target.value);
  const handleMedia = (e) => setMedia(e.target.value);
  const handleImage = (e) => setImage(e.target.value);

  // Have a Side-Effect after initial rendering of component

  const getProfile = async () => {
    try {
      const res = await axios.get(
        `${process.env.REACT_APP_SERVER_URL}/profile/${userId}`
      );
      console.log(res.data);
      setName(res.data.name);
      setDescription(res.data.description);
      setMedia(res.data.media);
      setImage(res.data.image);
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    getProfile();
  }, [userId]);

  // Create a function that Handles Form Submit
  const handleFormSubmit = async (e) => {
    // prevent the default action of the form => refreshing the page
    e.preventDefault();

    // store title, description that is going to be received
    // in ExpressJS as req.body.
    const requestBody = { name, description, media, image };

    try {
      axios.put(
        `${process.env.REACT_APP_SERVER_URL}/profile/${userId}`,
        requestBody
      );

      setName("");
      setDescription("");
      setMedia("");
      setImage("");

      navigate("/comunity");
    } catch (error) {
      console.log(error);
    }
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
        
      <h3 className="titles">Edit Your Profile</h3>
      <br/>
      <form onSubmit={handleFormSubmit} className="">
        <label className="phrases">Name:</label> <br/>
        <input className="form-style" type="text" name="name" value={name} onChange={handleName} /> <br/>
        <br/>
        
        <label className="phrases">Description:</label><br/>
        <textarea  className="form-style"
          name="description"
          value={description}
          onChange={handleDescription}
          minimumRows="3"
          minimumCols="30"
        /><br/>
        <br/>
        
        <label className="phrases">Your Personal webSpot:</label><br/>
        <input className="form-style" type="text" name="media" value={media} onChange={handleMedia} /><br/>
        <br/>
        
        <label className="phrases">Profile Image:</label><br/>
        <input className="form-style" type="file" onChange={(e) => handleFileUpload(e)} /><br/>
        <br/>
        
        <button className="form-button" type="submit">Edit</button><br/>
        <br/>
        <br/>
        <br/>
      </form>
      
      <br/>
      
      <div className="footer-overlay">
        <img className="logo" src="/images/footer-branco.png" alt="Logo"  /> </div>
       <iframe className="iframe" title="Background" src="https://smashthewalls.com/" /* Authorized use by the artist: by:mike@bod.ge */ 
      ></iframe>
      <br/>
      </div>
    </div>
    </div>
    
    
  );
}

export default EditProfilePage;