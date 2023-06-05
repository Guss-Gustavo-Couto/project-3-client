import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import authService from "../../services/auth.service";

function SignupPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [name, setName] = useState("");
  const [errorMessage, setErrorMessage] = useState(undefined);
  const [phraseIndex, setPhraseIndex] = useState(0);

  const navigate = useNavigate();

  const handleEmail = (e) => setEmail(e.target.value);
  const handlePassword = (e) => {
    setPassword(e.target.value);
    setPhraseIndex((phraseIndex + 1) % passwordPhrases.length);
  };
  const handleName = (e) => setName(e.target.value);

  const handleSignupSubmit = (e) => {
    e.preventDefault();
    // Create an object representing the request body
    const requestBody = { email, password, name };

    // Or using a service
    authService
      .signup(requestBody)
      .then((response) => {
        // If the POST request is successful redirect to the login page
        navigate("/login");
      })
      .catch((error) => {
        // If the request resolves with an error, set the error message in the state
        const errorDescription = error.response.data.message;
        setErrorMessage(errorDescription);
      });
  };

  const passwordPhrases = [
    "Frase 1",
    "Frase 2",
    "Frase 3",
    "Frase 4",
    "Frase 5",
    "Frase 6",
    "Frase 7",
    "Frase 8",
    "Frase 9",
    "Frase 10",
    "Frase 11",
    "Frase 12",
    "Frase 13",
    "Frase 14",
    "Frase 15",
    "Frase 16",
    "Frase 17",
    "Frase 18",
    "Frase 19",
    "Frase 20",
    "Frase 21",
    "Frase 22",
    "Frase 23",
    "Frase 24",
    "Frase 25",
    "Frase 26",
  ];

  return (
    <div className="SignupPage">
      <h1>Sign Up</h1>

      <form onSubmit={handleSignupSubmit}>
        <label>Email:</label>
        <input type="email" name="email" value={email} onChange={handleEmail} />

        <label>Password:</label>
        <input
          type="password"
          name="password"
          value={password}
          onChange={handlePassword}
        />
        <p>{passwordPhrases[phraseIndex]}</p>
        <label>Name:</label>
        <input type="text" name="name" value={name} onChange={handleName} />

        <button type="submit">Sign Up</button>
      </form>

      {errorMessage && <p className="error-message">{errorMessage}</p>}

      <p>Already have an account?</p>
      <Link to={"/login"}>Login</Link>
    </div>
  );
}

export default SignupPage;
