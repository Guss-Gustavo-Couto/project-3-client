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
    <div>
      <h2>Comunity Page</h2>
      {users.map((user) => {
        return (
          <div key={user._id}>
            <img src={user.image} />
            <p>{user.name}</p>
            <p>{user.description}</p>
            <p>{user.media}</p>
          </div>
        );
      })}
    </div>
    
  );
}

export default ComunityPage;
