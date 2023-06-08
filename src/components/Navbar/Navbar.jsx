import "./Navbar.css";
import { Link } from "react-router-dom";
import { useContext } from "react";
import { AuthContext } from "../../context/auth.context";

function Navbar() {
  // Subscribe to the AuthContext to gain access to
  // the values from AuthContext.Provider's `value` prop
  const { isLoggedIn, user, logOutUser } = useContext(AuthContext);


  return (
    <div>
    <div className="total-nav-bar">
    <img className="logo-nav-bar" src="/images/logo-invert.png" />
    <nav className="total-btns">
      <a href="/" className="nav-btn">Home</a>
      <a href="/gallery" className="nav-btn"> Gallery of Worthlessness </a>
      <a href="/submit" className="nav-btn"> Submit Absurdity </a>
      <a href="/comunity" className="nav-btn"> Our Idiotiles </a>
      

      {isLoggedIn && (
        <>
          <button className="log-button1" onClick={logOutUser}>Logout</button>

          <Link to={`/profile/${user._id}`}>
            <button className="log-button2"> Profile </button>
          </Link>
          {/* <img className="img-thumbnail" src={user.image} title={user.name}/> */}
        </> 
      )}

      {!isLoggedIn && (
        <>
          <Link to="/signup">
            {" "}
            <button  className="log-button1">Sign Up</button>{" "}
          </Link>
          <Link to="/login">
            {" "}
            <button  className="log-button2">Login</button>{" "}
          </Link>
        </>
      )}
      
      </nav>
      <br/>
      <img className="botton-header" src="images/header-background.png"/>
    </div>
    <img className="botton-header" src="images/header-background.png"/>
    </div>
    
  );
}

export default Navbar;
