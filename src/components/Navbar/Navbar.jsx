import "./Navbar.css";
import { Link } from "react-router-dom";
import { useContext } from "react";
import { AuthContext } from "../../context/auth.context";

function Navbar() {
  // Subscribe to the AuthContext to gain access to
  // the values from AuthContext.Provider's `value` prop
  const { isLoggedIn, user, logOutUser } = useContext(AuthContext);

  return (
    <nav class="navbar bg-dark border-bottom border-bottom-dark" data-bs-theme="dark">
      <Link to="/">
        Home
      </Link>
      <Link to="/gallery">
        <button>Gallery of Worthlessness</button>
      </Link>
      <Link to="/submit">
        <button>Submit Absurdity</button>
      </Link>
      <Link to="/comunity">
        <button>Our Idiotiles</button>
      </Link>
      
      

      {isLoggedIn && (
        <>
          <button onClick={logOutUser}>Logout</button>

          <Link to={`/profile/${user._id}`}>
            <button>Profile</button>
            {/* <img src="https://picsum.photos/id/402/200/300" style={{ width: 50, height: 50, borderRadius: 25}} alt="profile" /> */}
          </Link>

          <span>{user && user.name}</span>
        </>
      )}

      {!isLoggedIn && (
        <>
          <Link to="/signup">
            {" "}
            <button>Sign Up</button>{" "}
          </Link>
          <Link to="/login">
            {" "}
            <button>Login</button>{" "}
          </Link>
        </>
      )}
    </nav>
  );
}

export default Navbar;
