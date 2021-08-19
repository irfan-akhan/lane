import React, { useState } from "react";
import { Grid } from "@material-ui/core";
import input from "../styles/Drivefor.module.css";
import { Person, Mail, Phone, School, DriveEta } from "@material-ui/icons";
let driverRequirements = {
  firstName: "",
  middleName: "",
  lastName: "",
  gender: "",
  email: "",
  mobile: "",
  altMobile: "",
  education: "",
  policy: false,
  carName: "",
  carType: "",
  carModel: "",
  carYear: "",
  maritalStatus: "",
  address: "",
  city: "",
  state: "",
  eFirstName: "",
  eMiddleName: "",
  eLastName: "",
  eMobile: "",
  eAddress: "",
  otherPlatform: false,
  platformName: "",
  passport: "",
  license: "",
  cInsuarance: "",
  certfInsuarance: "",
  lasdri: "",
  interior1: "",
  interior2: "",
  interior3: "",
  interior4: "",
  exterior1: "",
  exterior2: "",
  exterior3: "",
  exterior4: "",
};

const newForm = () => {
  const [driverInput, setDriverInput] = useState(driverRequirements);
  const [interior, setInterior] = useState([]);
  const [exterior, setExterior] = useState([]);
  const [passport, setPassport] = useState();
  const [policy, setPolicy] = useState([false]);
  const onfileUpload = (e) => {
    // console.log(e.target.files[0]);
    setDriverInput({ ...driverInput, [e.target.name]: e.target.files[0] });
  };

  const onSubmitHandler = (e) => {
    e.preventDefault();
    let data = new FormData();
    // formData.append("data", driverInput);
    console.log(driverInput.passport);

    data.append("photo", "wwww");

    console.log(data.entries());
    fetch("https://shuttlelaneee.herokuapp.com/api/drive", {
      method: "POST",
      headers: {
        "Content Type": "multipart/form-data",
      },
    });
  };
  console.log(driverInput);
  return (
    <section style={{ width: "50vw", marginTop: "6rem" }}>
      <Grid container xs={12} sm={8}>
        <Grid item>
          <form onSubmit={onSubmitHandler} className="checkoutForm">
            <h4>Personal Details</h4>
            <div
              style={{
                display: "flex",
                justifyContent: "flex-start",
              }}
            >
              <div className="inputControl">
                <span>
                  <Person />
                </span>
                <input type="text" name="firstName" placeholder="First Name" />
              </div>
              <div className="inputControl">
                <span>
                  <Person />
                </span>
                <input
                  type="text"
                  name="middleName"
                  placeholder="Middle Name"
                />
              </div>
              <div className="inputControl">
                <span>
                  <Person />
                </span>
                <input type="text" name="lastName" placeholder="Last Name" />
              </div>
            </div>
            <div style={{ padding: "0 0 2rem 0" }}>
              <div id="radio" className={input.radio}>
                <div>
                  <label htmlFor="radio">
                    <strong>Gender : </strong>
                  </label>
                  <input type="radio" name="gender" id="gender" />
                  <label htmlFor="male">Male</label>
                  <input type="radio" name="gender" id="gender" />
                  <label htmlFor="female">Female</label>
                </div>
              </div>
            </div>
            <div
              style={{
                display: "flex",
                justifyContent: "flex-start",
              }}
            >
              <div className="inputControl">
                <span>
                  <Mail />
                </span>
                <input
                  type="email"
                  required
                  name="email"
                  placeholder="Email Address"
                />
              </div>
              <div className="inputControl">
                <span>
                  <Phone />
                </span>
                <input type="tel" required name="mobile" placeholder="Phone" />
              </div>
              <div className="inputControl">
                <span>
                  <Phone />
                </span>
                <input
                  type="tel"
                  required
                  name="altMobile"
                  placeholder="Alternate Number"
                />
              </div>
            </div>
            <div
              style={{
                display: "flex",
                justifyContent: "flex-start",
              }}
            >
              <div className="inputControl">
                <span>
                  <School />
                </span>
                <select name="education" className={input.extra}>
                  <option disabled selected>
                    Education
                  </option>
                  <option value="primary">Primary</option>
                  <option value="secondary">Secondary</option>
                  <option value="polytechnic">Polytechnic</option>
                  <option value="university">University</option>
                  <option value="other">Other</option>
                </select>
              </div>
              <div className={input.policy}>
                <input type="checkbox" required name="policy" />I agree to the
                Privacy Policy
              </div>
            </div>

            <div className={policy == false ? "no" : "yes"}>
              <h4>Additional Information</h4>
              <div
                style={{
                  display: "flex",
                  justifyContent: "flex-start",
                }}
              >
                <div className="inputControl">
                  <span>
                    <DriveEta />
                  </span>
                  <select name="carType">
                    <option disabled selected>
                      Car Type
                    </option>
                    <option value="primary">Salon</option>
                    <option value="secondary">SUV</option>
                    <option value="polytechnic">Mini Bus</option>
                  </select>
                </div>
                <div className="inputControl">
                  <span>
                    <DriveEta />
                  </span>
                  <input type="text" name="carName" placeholder="Car Name" />
                </div>
                <div className="inputControl">
                  <span>
                    <DriveEta />
                  </span>
                  <input type="text" name="carModel" placeholder="Model" />
                </div>
                <div className="inputControl">
                  <span>
                    <DriveEta />
                  </span>
                  <input type="number" name="carYear" placeholder="Year" />
                </div>
              </div>
              <div
                id="radio"
                style={{
                  display: "flex",
                  justifyContent: "flex-start",
                }}
              >
                <div style={{ padding: "1rem 0 2rem 0" }}>
                  <label htmlFor="radio">
                    <strong>Marital Status : </strong>
                  </label>
                  <label htmlFor="maritalStatus">Married</label>
                  <input type="radio" name="maritalStatus" id="maritalstatus" />
                  <label htmlFor="maritalStatus">Single</label>
                  <input type="radio" name="maritalStatus" id="maritalstatus" />
                </div>
              </div>
              <div
                style={{
                  display: "flex",
                  justifyContent: "flex-start",
                }}
              >
                <div className="inputControl">
                  <span>
                    <Person />
                  </span>
                  <input
                    type="text"
                    required
                    name="address"
                    placeholder="Address"
                  />
                </div>
                <div className="inputControl">
                  <span>
                    <Person />
                  </span>
                  <input type="text" required name="city" placeholder="City" />
                </div>
                <div className="inputControl">
                  <span>
                    <Person />
                  </span>
                  <input
                    type="text"
                    required
                    name="state"
                    placeholder="State"
                  />
                </div>
              </div>
              <h3>Emergency Contact</h3>
              <div
                style={{
                  display: "flex",
                  justifyContent: "flex-start",
                }}
              >
                <div className="inputControl">
                  <span>
                    <Person />
                  </span>
                  <input
                    type="text"
                    name="eFirstName"
                    placeholder="First Name"
                  />
                </div>
                <div className="inputControl">
                  <span>
                    <Person />
                  </span>
                  <input
                    type="text"
                    name="eMiddleName"
                    placeholder="Middle Name"
                  />
                </div>
                <div className="inputControl">
                  <span>
                    <Person />
                  </span>
                  <input type="text" name="eLastName" placeholder="Last Name" />
                </div>
              </div>
              <div
                style={{
                  display: "flex",
                  justifyContent: "flex-start",
                }}
              >
                <div className="inputControl">
                  <span>
                    <Person />
                  </span>
                  <input type="tel" name="eMobile" placeholder="Phone Number" />
                </div>
                <div className="inputControl">
                  <span>
                    <Person />
                  </span>
                  <input type="text" name="eAddress" placeholder="Address" />
                </div>
              </div>
              <div id="radio" className={input.radio}>
                <label htmlFor="radio">
                  Are you currently driving for any ride-hailing platforms? (eg.
                  Uber, Taxify, Oride,etc.)
                </label>
                <div>
                  <div className="">
                    <label htmlFor="otherPlatform">Yes</label>
                    <input type="radio" name="platformName" id="platformName" />
                  </div>
                  <div className="">
                    <label htmlFor="status">No</label>
                    <input type="radio" name="platformName" id="platformName" />
                  </div>
                </div>
                <div className="inputControl">
                  <input
                    type="text"
                    name="platformName"
                    placeholder="if yes Please Specify the name  "
                  />
                </div>
              </div>
              <h4>Files</h4>
              <div>
                <div className="inputControl" id="files">
                  <span>
                    <Person />
                  </span>
                  <input
                    onChange={onfileUpload}
                    type="file"
                    name="passport"
                    id="passport"
                  />
                  <label htmlFor="passport">Passport</label>
                </div>
              </div>
              <div>
                <div className="inputControl" id="files">
                  <span>
                    <Person />
                  </span>
                  <input
                    onChange={onfileUpload}
                    type="file"
                    name="license"
                    id="license"
                  />
                  <label htmlFor="license">Driver License</label>
                </div>
              </div>
              <div>
                <div className="inputControl" id="files">
                  <span>
                    <Person />
                  </span>
                  <input
                    onChange={onfileUpload}
                    type="file"
                    name="compInsurance"
                    id="compInsuarance"
                  />
                  <label htmlFor="compInsuarance">
                    Comprehensive Insuarance
                  </label>
                </div>
              </div>
              <div>
                <div className="inputControl" id="files">
                  <span>
                    <Person />
                  </span>
                  <input
                    onChange={onfileUpload}
                    type="file"
                    name="certfInsuarance"
                    id="certfInsuarance"
                  />
                  <label htmlFor="certfInsuarance">
                    Certificate of Insuarance
                  </label>
                </div>
              </div>
              <div>
                <div className="inputControl" id="files">
                  <span>
                    <Person />
                  </span>
                  <input
                    onChange={onfileUpload}
                    type="file"
                    name="lasdri"
                    id="lasdri"
                  />
                  <label htmlFor="lasdri">Lasdri</label>
                </div>
              </div>
              <div>
                <div className="inputControl" id="files">
                  <span>
                    <Person />
                  </span>
                  <input
                    onChange={onfileUpload}
                    type="file"
                    name="interior1"
                    id="interior1"
                  />
                  <label htmlFor="interior1">Interior (Photo1)</label>
                </div>
              </div>
              <div>
                <div className="inputControl" id="files">
                  <span>
                    <Person />
                  </span>
                  <input
                    onChange={onfileUpload}
                    type="file"
                    name="interior2"
                    id="interior2"
                  />
                  <label htmlFor="interior2">Interior (Photo2)</label>
                </div>
              </div>
              <div>
                <div className="inputControl" id="files">
                  <span>
                    <Person />
                  </span>
                  <input
                    onChange={onfileUpload}
                    type="file"
                    name="interior3"
                    id="interior3"
                  />
                  <label htmlFor="interior3">Interior (Photo3)</label>
                </div>
              </div>
              <div>
                <div className="inputControl" id="files">
                  <span>
                    <Person />
                  </span>
                  <input
                    onChange={onfileUpload}
                    type="file"
                    name="interior4"
                    id="interior4"
                  />
                  <label htmlFor="interior4">Interior (Photo4)</label>
                </div>
              </div>
              <div>
                <div className="inputControl" id="files">
                  <span>
                    <Person />
                  </span>
                  <input
                    onChange={onfileUpload}
                    type="file"
                    name="exterior1"
                    id="exterior1"
                  />
                  <label htmlFor="exterior1">Exterior (Photo1)</label>
                </div>
              </div>
              <div>
                <div className="inputControl" id="files">
                  <span>
                    <Person />
                  </span>
                  <input
                    onChange={onfileUpload}
                    type="file"
                    name="exterior2"
                    id="exterior2"
                  />
                  <label htmlFor="exterior2">Exterior (Photo2)</label>
                </div>
              </div>
              <div>
                <div className="inputControl" id="files">
                  <span>
                    <Person />
                  </span>
                  <input
                    onChange={onfileUpload}
                    type="file"
                    name="exterior3"
                    id="exterior3"
                  />
                  <label htmlFor="exterior3">Exterior (Photo3)</label>
                </div>
              </div>
              <div>
                <div className="inputControl" id="files">
                  <span>
                    <Person />
                  </span>
                  <input
                    onChange={onfileUpload}
                    type="file"
                    name="exterior4"
                    id="exterior4"
                  />
                  <label htmlFor="exterior4">Exterior (Photo4)</label>
                </div>
              </div>
            </div>
            <button type="submit" className="btnGrad">
              Submit
            </button>
          </form>
        </Grid>
      </Grid>
    </section>
  );
};

export default newForm;
