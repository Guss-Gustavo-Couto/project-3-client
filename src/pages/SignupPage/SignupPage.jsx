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
    "Our Passive Aggressive Idiot Comments on your Password !",
    "Our Passive Aggressive Idiot Comments on your Password !",
    "Do you even know what a password is !?",
    "Worst. Password. Ever.",
    "I need a password not this monstrosity.",
    "Really, you call that! a password ?",
    "Really poor effort.",
    "I'm not angry, just disappointed.",
    "Try harder, bub",
    "This is pretty pathetic",
    "May god have mercy on your email account.",
    "Don't come crying to me when you're hacked.",
    "I hope this account isn't important.",
    "This password needs more emoji.",
    "Todlers eat passwords like yours for breakfast",
    "Mashing your head on the keyboard would be more secure",
    "Are you taking this seriously?",
    "I've seen dogs with better passwords.",
    "Perhaps this was good 10 years ago.",
    "I worry about you.",
    "You lack creativity.",
    "Oh... you're going to use that huh?",
    "Weak. Just weak.",
    "Sorry chump, this just won't do.",
    "You're half way there, I'd say.",
    "I almost like where you're going with this.",
  ];

  return (
    <div className="space">
    <div className="centered-form-content">
    <div className="centered-contents">
    <h3 className="titles">New user? Let's Sign Up!</h3>

      <form onSubmit={handleSignupSubmit}>
        <label className="phrases">Email:</label><br/>
        <input className="form-style" type="email" name="email" value={email} onChange={handleEmail} />
        <br/><br/>
        <label className="phrases">Password:</label><br/>
        <input className="form-style"
          type="password"
          name="password"
          value={password}
          onChange={handlePassword}
        />
        <p className="jokes">{passwordPhrases[phraseIndex]}</p>
        <label className="phrases">Name:</label><br/>
        <input className="form-style" type="text" name="name" value={name} onChange={handleName} />
        <br/><br/>
        <button className="form-button" type="submit">Sign Up</button><br/>
      </form><br/>

      {errorMessage && <p className="error-message">{errorMessage}</p>}

      
      <Link to={"/login"}><button className="form-button">Log In</button></Link> <p className="phrases" >Already have an account?</p>

      
      <div className="footer-overlay">
        <img className="logo" src="/images/footer-branco.png" alt="Logo"  /> </div>
       <iframe className="iframe" title="Background" src="https://smashthewalls.com/"
      ></iframe>
      <br/>
      </div>
      <br/>
    </div>
    </div>
  );
}

export default SignupPage;
