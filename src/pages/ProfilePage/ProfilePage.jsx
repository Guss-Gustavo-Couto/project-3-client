import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";

function EditProfilePage() {
  // Write State
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");

  // req.params => Express
  // useParams() => ReactJS

  const { userId } = useParams();

  const navigate = useNavigate();

  const handleName = (e) => setName(e.target.value);
  const handleDescription = (e) => setDescription(e.target.value);

  // Have a Side-Effect after initial rendering of component

  const getProfile = async () => {
    try {
      const res = await axios.get(
        `${process.env.REACT_APP_SERVER_URL}/profile/${userId}`
      );
      console.log(res.data);
      setName(res.data.name);
      setDescription(res.data.description);
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
    const requestBody = { name, description };

    try {
      axios.put(
        `${process.env.REACT_APP_SERVER_URL}/profile/${userId}`,
        requestBody
      );

      setName("");
      setDescription("");

      navigate("/");
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div>
      <h3>Edit the Profile</h3>

      <form onSubmit={handleFormSubmit}>
        <label>Name:</label>
        <input type="text" name="name" value={name} onChange={handleName} />

        <label>Description:</label>
        <textarea
          name="description"
          value={description}
          onChange={handleDescription}
        />

        <button type="submit">Edit</button>
      </form>
    </div>
  );
}

export default EditProfilePage;
