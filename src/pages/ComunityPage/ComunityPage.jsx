import { useState, useEffect } from "react";
import axios from "axios";

function ComunityPage(props) {
  const [users, setUsers] = useState([]);

  useEffect(() => {
    axios
      .get(`${process.env.REACT_APP_SERVER_URL}/comunity`)
      .then((response) => {
        setUsers(response.data);
      });
  }, []);
  return (
    <div className="space">
    <div className="not-centered-form-content">
    <div className="centered-contents">
      <h2 className="titles2">Comunity Page</h2><br/><br/>
      {users.map((user) => {
        return (
          <div key={user._id}>
            <img src={user.image} />
            <p className="phrases4">{user.name}</p>
            <p className="phrases2">{user.description}</p>
            <p className="phrases2">This user has made: {user.reviews.lenght} Reviews</p>
            <a href={user.media} target="_blank"><img src="/images/social.png"></img></a>
            <br/><br/><br/>
          </div>
        );
      })}
    <div className="footer-overlay">
        <img className="logo" src="/images/footer-branco.png" alt="Logo"  /> </div>
       <iframe className="iframe" title="Background" src="https://smashthewalls.com/"
      ></iframe>
      <br/>
      </div>
    </div>
    </div>
  
    
  );
}

export default ComunityPage;
