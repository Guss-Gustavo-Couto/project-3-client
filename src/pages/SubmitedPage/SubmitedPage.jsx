import { useEffect } from "react";
import axios from "axios";
import { Link } from "react-router-dom";

function SubmitedPage(){
    useEffect(() => {
        axios
          .get(`${process.env.REACT_APP_SERVER_URL}/submited`)
          .then((response) => {
            console.log(response);
          })
          });

    return(
        <div className="space">
        <div className="not-centered-form-content">
        <div className="">
            <h1>Thank You for submited your Inutility,</h1>
            <p >wait till our Admin see if it's <b>Useless</b> enought and aprove it.</p>
            <Link to="/submit"><button className="form-button">Submit Another</button></Link>
            <div className="footer-overlay">
        <img className="logo" src="/images/footer-branco.png" alt="Logo"  /> </div>
       <iframe className="iframe" title="Background" src="https://smashthewalls.com/"
      ></iframe>
      <br/>
      </div>
      </div>
    </div>
    
    )
}

export default SubmitedPage;