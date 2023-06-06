import { useState, useEffect } from "react";
import { Link } from "react-router-dom/dist";
import axios from "axios";
import { useNavigate } from "react-router-dom";

function BackOfficePage(props) {
  const [gallerys, setGallerys] = useState([]);
  const [users, setUsers] = useState([]);
  const [admin, setAdmin] = useState(false);
  const [_id, set_id] = useState("");
  const navigate = useNavigate();

  const handleSubmit = async () => {
    try {
      const body = { _id, admin };
      await axios.put(`${process.env.REACT_APP_SERVER_URL}/isadmin`, body);
      setAdmin(body.admin);
      set_id(body._id);
      navigate("/backoffice");
    } catch (error) {
      console.log(error);
    }
  };

  const handleAdmin = (e) => {
    setAdmin(e.target.value);
  };
  const handleId = (e) => {
    set_id(e.target.value);
  };

  useEffect(() => {
    axios.get(`${process.env.REACT_APP_SERVER_URL}/admin`).then((response) => {
      setGallerys(response.data.allSites);
      setUsers(response.data.allUsers);
      console.log(response.data);
    });
    handleSubmit();
  }, []);

  return (
    <div>
      <h2>BackOffice - Waiting For Submission</h2>
      {gallerys.map((gallery) => {
        if (gallery.isaproved) {
          return(null)
            
        } else {
          return (
            <div key={gallery._id} className="gallery-card">
              <p>{gallery.title}</p>
              <p>{"" + gallery.isaproved}</p>
              <a href={gallery.link} target="_blank">
                Go To WebSite
              </a>
              <img src={gallery.image} className="gallery-img"/>
              <Link to={`/backoffice/${gallery._id}`}>Edit</Link>
            </div>
          );
        }
      })}
      <h2>BackOffice - Already Submited</h2>
      {gallerys.map((gallery) => {
        if (gallery.isaproved === false) {
          return(null)
            
        } else {
          return (
            <div key={gallery._id} className="gallery-card">
              <p>{gallery.title}</p>
              <p>{"" + gallery.isaproved}</p>
              <a href={gallery.link} target="_blank">
                Go To WebSite
              </a>
              <img src={gallery.image} className="gallery-img"/>
              <Link to={`/backoffice/${gallery._id}`}>Edit</Link>
            </div>
          );
        }
      })}
      <div>
        
        <h2>Comunity Page</h2>
        {users.map((user) => {
          return (
            <>
              <form onSubmit={handleSubmit}>
                <div key={user._id}>
                  <img src={user.image} />
                  <p>{user.name}</p>
                  <p>{user.email}</p>

                  <input
                    type="radio"
                    label="admin"
                    name="admin"
                    value="false"
                    onChange={handleAdmin}
                  />
                  <label htmlFor="admin">Normal USer</label>
                  <input
                    type="radio"
                    label="admin"
                    name="admin"
                    value="true"
                    onChange={handleAdmin}
                  />
                  <label htmlFor="admin">Admin</label>

                  <input
                    type="text"
                    label="_id"
                    name="_id"
                    value={user._id}
                    onChange={handleId}
                  />

                  <button type="submit">Submit</button>
                </div>
              </form>
            </>
          );
        })}
      </div>
    </div>
  );
}

export default BackOfficePage;
