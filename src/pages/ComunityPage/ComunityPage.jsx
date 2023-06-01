import { useState, useEffect } from "react";

function ComunityPage(props) {
  const [users] = useState([]);

  useEffect(()=>{
    setGallerys(props.users);
  }, [props.users]);;
 
    return (
      <div>
          <h2>Comunnity Page</h2>
          {users.map((user)=>{
              return(
                  <div>
                      <h3>{user.name}</h3>
                      <p>{user.description}</p>
                      <p>{user.description}</p>
                  </div>
              )
          })}
      </div>
    )
  }

  export default ComunityPage;
