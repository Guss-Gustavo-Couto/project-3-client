import { useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

function CheckPage() {
  const navigate = useNavigate();

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

    return () => {
      checkboxes.forEach((checkbox) => {
        checkbox.removeEventListener("change", verifyCheckboxes);
      });
    };
  }, [navigate]);

  return (
    <div>
      <h3>Prove us you deserve to be an Idiotile and complete this INUTIL checkbox chalenge in less than 1 minute!</h3>
      <br />
      <input type="checkbox" id="01" name="01" value="checked" />
      <input type="checkbox" id="02" name="02" value="checked" />
      <input type="checkbox" id="03" name="03" value="checked" />
      <input type="checkbox" id="04" name="04" value="checked" />
      <input type="checkbox" id="05" name="05" value="checked" />
      <br />
      {/*<input type="checkbox" id="01" name="01" value="checked" />
      <input type="checkbox" id="02" name="02" value="checked" />
      <input type="checkbox" id="03" name="03" value="checked" />
      <input type="checkbox" id="04" name="04" value="checked" />
      <input type="checkbox" id="05" name="05" value="checked" />
      <br />
      <input type="checkbox" id="01" name="01" value="checked" />
      <input type="checkbox" id="02" name="02" value="checked" />
      <input type="checkbox" id="03" name="03" value="checked" />
      <input type="checkbox" id="04" name="04" value="checked" />
      <input type="checkbox" id="05" name="05" value="checked" />
      <br />
      <input type="checkbox" id="01" name="01" value="checked" />
      <input type="checkbox" id="02" name="02" value="checked" />
      <input type="checkbox" id="03" name="03" value="checked" />
      <input type="checkbox" id="04" name="04" value="checked" />
      <input type="checkbox" id="05" name="05" value="checked" />
      <br />
      <input type="checkbox" id="01" name="01" value="checked" />
      <input type="checkbox" id="02" name="02" value="checked" />
      <input type="checkbox" id="03" name="03" value="checked" />
      <input type="checkbox" id="04" name="04" value="checked" />
      <input type="checkbox" id="05" name="05" value="checked" />
      <br />
      <input type="checkbox" id="01" name="01" value="checked" />
      <input type="checkbox" id="02" name="02" value="checked" />
      <input type="checkbox" id="03" name="03" value="checked" />
      <input type="checkbox" id="04" name="04" value="checked" />
      <input type="checkbox" id="05" name="05" value="checked" />
      <br />
      <input type="checkbox" id="01" name="01" value="checked" />
      <input type="checkbox" id="02" name="02" value="checked" />
      <input type="checkbox" id="03" name="03" value="checked" />
      <input type="checkbox" id="04" name="04" value="checked" />
      <input type="checkbox" id="05" name="05" value="checked" /> */}
      
    </div>
  );
}

export default CheckPage;
