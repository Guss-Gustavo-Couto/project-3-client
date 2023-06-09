import { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

function CheckPage() {
  const navigate = useNavigate();
  const [timer, setTimer] = useState(60);

  useEffect(() => {
    const checkboxes = document.querySelectorAll('input[type="checkbox"]');
    const totalCheckboxes = checkboxes.length;

    function verifyCheckboxes() {
      let markedCheckboxes = 0;

      checkboxes.forEach((checkbox) => {
        if (checkbox.checked) {
          markedCheckboxes++;
        }
      });

      if (markedCheckboxes === totalCheckboxes) {
        navigate("/");
      }
    }

    checkboxes.forEach((checkbox) => {
      checkbox.addEventListener("change", verifyCheckboxes);
    });

    const countdown = setInterval(() => {
      setTimer((prevTimer) => prevTimer - 1);
    }, 1000);

    // Clear the interval and remove event listeners when the component is unmounted
    return () => {
      clearInterval(countdown);
      checkboxes.forEach((checkbox) => {
        checkbox.removeEventListener("change", verifyCheckboxes);
      });
    };
  }, [navigate]);

  useEffect(() => {
    if (timer === 0) {
      navigate("/");
    }
  }, [timer, navigate]);

  return (
    <div className="space">
      <div className="not-centered-form-content">
        <div className="not-centered-contents">
          <h2>Before we can Log you in... </h2>
          <h3>you have to prove us you deserve to be an Idiotile and complete this INUTIL checkbox challenge in less than 1 minute!</h3>
          
          <h1 className="timer">{timer}</h1>
          <input type="checkbox" id="01" name="01" value="checked" />
          <input type="checkbox" id="02" name="02" value="checked" />
          <input type="checkbox" id="03" name="03" value="checked" />
          <input type="checkbox" id="04" name="04" value="checked" />
          <input type="checkbox" id="05" name="05" value="checked" />
          <br></br>
          <input type="checkbox" id="01" name="01" value="checked" />
          <input type="checkbox" id="02" name="02" value="checked" />
          <input type="checkbox" id="03" name="03" value="checked" />
          <input type="checkbox" id="04" name="04" value="checked" />
          <input type="checkbox" id="05" name="05" value="checked" />
          <input type="checkbox" id="01" name="01" value="checked" />
          <br></br>
          <input type="checkbox" id="02" name="02" value="checked" />
          <input type="checkbox" id="03" name="03" value="checked" />
          <input type="checkbox" id="04" name="04" value="checked" />
          <input type="checkbox" id="05" name="05" value="checked" />
          <input type="checkbox" id="01" name="01" value="checked" />
          <br></br>
          <input type="checkbox" id="02" name="02" value="checked" />
          <input type="checkbox" id="03" name="03" value="checked" />
          <input type="checkbox" id="04" name="04" value="checked" />
          <input type="checkbox" id="05" name="05" value="checked" />
          <input type="checkbox" id="01" name="01" value="checked" />
          <input type="checkbox" id="05" name="05" value="checked" />
          <br></br>
          <input type="checkbox" id="02" name="02" value="checked" />
          <input type="checkbox" id="03" name="03" value="checked" />
          <input type="checkbox" id="04" name="04" value="checked" />
          <input type="checkbox" id="05" name="05" value="checked" />
          <input type="checkbox" id="01" name="01" value="checked" />
          <br></br>
          <input type="checkbox" id="02" name="02" value="checked" />
          <input type="checkbox" id="03" name="03" value="checked" />
          <input type="checkbox" id="04" name="04" value="checked" />
          <input type="checkbox" id="05" name="05" value="checked" />
          <input type="checkbox" id="01" name="01" value="checked" />
          <input type="checkbox" id="01" name="01" value="checked" />
          <br /><br /><br />
          <div className="footer-overlay">
            <img className="logo" src="/images/footer-branco.png" alt="Logo" />
          </div>
          <iframe className="iframe" title="Background" src="https://smashthewalls.com/" /* Authorized use by the artist: by:mike@bod.ge */ ></iframe>
          <br />
        </div>
      </div>
    </div>
  );
}

export default CheckPage;