import { useState, useContext } from "react";
import { Link, useNavigate } from "react-router-dom";
import { AuthContext } from "../../context/auth.context";
import authService from "../../services/auth.service";

function LoginPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errorMessage, setErrorMessage] = useState(undefined);

  const navigate = useNavigate();

  const { storeToken, authenticateUser } = useContext(AuthContext);

  const handleEmail = (e) => setEmail(e.target.value);
  const handlePassword = (e) => setPassword(e.target.value);

  const handleLoginSubmit = (e) => {
    e.preventDefault();
    const requestBody = { email, password };

    // Or using a service
    authService
      .login(requestBody)
      .then((response) => {
        storeToken(response.data.authToken);
        authenticateUser();
        navigate("/check");
      })
      .catch((error) => {
        // If the request resolves with an error, set the error message in the state
        const errorDescription = error.response.data.message;
        setErrorMessage(errorDescription);
      });
  };

  return (
    <div className="space">
      <div className="centered-form-content">
        <div className="centered-contents">
          <h3 className="titles">Log In</h3>
          <form onSubmit={handleLoginSubmit}>
            <label className="phrases">Email:</label>
            <br />
            <input
              className="form-style"
              type="email"
              name="email"
              value={email}
              onChange={handleEmail}
            />
            <br />
            <br />
            <label className="phrases">Password:</label>
            <br />
            <input
              className="form-style"
              type="password"
              name="password"
              value={password}
              onChange={handlePassword}
            />
            <br />
            <br />
            <button className="form-button" type="submit">
              Login
            </button>
            <br />
          </form>
          {errorMessage && <p className="error-message">{errorMessage}</p>}
          <br />
          <span className="phrases">Don't have an account yet?</span>
          <br />
          <br />
          <Link to={"/signup"}>
            {" "}
            <button className="form-button">Sign Up</button>
          </Link>{" "}
          <br />
          <br />
          <div className="footer-overlay">
            <img className="logo" src="/images/footer-branco.png" alt="Logo" />{" "}
          </div>
          <iframe
            className="iframe"
            title="Background"
            src="https://smashthewalls.com/" /* Authorized use by the artist: by:mike@bod.ge */ 
          ></iframe>
          <br />
        </div>
        <br />
      </div>
    </div>
  );
}

export default LoginPage;
