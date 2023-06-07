import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import { useNavigate } from "react-router-dom";

function BackOfficePage(props) {
  const [gallerys, setGallerys] = useState([]);
  const [users, setUsers] = useState([]);
  const [admin, setAdmin] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();

    const requestBody = { admin };
    try {
      await axios.put(`${process.env.REACT_APP_SERVER_URL}/admin`, requestBody);
      setAdmin(false);
      navigate("/backoffice");
    } catch (error) {
      console.log(error);
    }
  };

  const handleAdmin = (e) => {
    setAdmin(e.target.value === "true");
  };

  useEffect(() => {
    axios.get(`${process.env.REACT_APP_SERVER_URL}/admin`).then((response) => {
      setGallerys(response.data.allSites);
      setUsers(response.data.allUsers);
      console.log(response.data);
    });
  }, []);

  return (
    <div className="space">
    <div className="centered-form-content">
    <div className="centered-contents">
      <h2>BackOffice - Waiting For Submission</h2>
      <br />
      <div className="section">
        {gallerys.map((gallery) => {
          if (gallery.isaproved === true) {
            return null;
          } else {
            return (
              <div key={gallery._id} className="gallery-card">
                <p>{gallery.title}</p>
                <a href={gallery.link} target="_blank" rel="noopener noreferrer">
                  Go To WebSite
                </a>
                <img className="back-img" src={gallery.image} alt={gallery.title}  />
                <Link to={`/backoffice/${gallery._id}`}>Edit</Link>
              </div>
            );
          }
        })}
      </div>
      <h2>BackOffice - Already Submited</h2>
      <br />
      <div className="section">
        {gallerys.map((gallery) => {
          if (gallery.isaproved === false) {
            return null;
          } else {
            return (
              <div key={gallery._id} className="gallery-card">
                <p>{gallery.title}</p>
                <a href={gallery.link} target="_blank" rel="noopener noreferrer">
                  Go To WebSite
                </a>
                <img class="back-img" src={gallery.image} alt={gallery.title} className="gallery-img" />
                <Link to={`/backoffice/${gallery._id}`}>Edit</Link>
              </div>
            );
          }
        })}
      </div>

      <h2>Active Users</h2>
      <br />
      <div className="section">
        {users.map((user) => (
          <div key={user._id}>
            <img className="back-img" style={{width:"100px" }} src={user.image} alt={user.name} />
            <p>{user.name}</p>
            <p>{user.email}</p>

            <form onSubmit={handleSubmit}>
              <input
                type="radio"
                label="admin"
                name="admin"
                value="false"
                checked={!admin}
                onChange={handleAdmin}
              />
              <label htmlFor="admin">Normal User</label>
              <input
                type="radio"
                label="admin"
                name="admin"
                value="true"
                checked={admin}
                onChange={handleAdmin}
              />
              <label htmlFor="admin">Admin</label>

              <button type="submit">Submit</button>
            </form>
          </div>
        ))}
      </div>
    </div>
      <div className="footer-overlay">
      <img className="logo" src="/images/footer-branco.png" alt="Logo"  /> </div>
     <iframe className="iframe" title="Background" src="https://smashthewalls.com/"
    ></iframe>
    <br/>
    </div>
  </div>
  
  );
}

export default BackOfficePage;

