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
        <div>
            <h1>Submited Page</h1>
            <p>Thank you for submited your Inutility, wait for aprove.</p>
            <Link to="/gallery">Back</Link>
        </div>
    )
}

export default SubmitedPage;