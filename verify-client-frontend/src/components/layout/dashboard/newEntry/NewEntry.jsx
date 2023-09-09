import { useState } from "react";
import Input from "../../input/Input";
import Button from "../../button/Button";
import classes from "./NewEntry.module.css";
import Variables from "../../variables";

// Create User Schema
// %%%%%%%%%%%%%%%%%%%%%%
//firstName: firstName,
// lastName: lastName,
// dob: dob,
// status: status,

// download: document, (Not implimented yet)

function NewEntry() {
  const [fname, setFname] = useState("");
  const [lname, setLname] = useState("");
  const [dob, setDob] = useState("");
  const [status, setStatus] = useState(true);
  const [clientCreated, setClientCreated] = useState(false);
  const [clientError, setClientError] = useState(false);

  // Submitting new Users on DB requires authentication
  const submitClient = async (e) => {
    e.preventDefault();
    setClientError(false);
    setFname("");
    setLname("");
    setDob("");
    const token = localStorage.token;
    // setStatus(e.a);
    await fetch(Variables.URL + "/data", {
      method: "POST", //Post method to write to API
      headers: {
        "Content-Type": "application/json",
        authorization: "Bearer " + token,
      },
      body: JSON.stringify({
        firstName: fname,
        lastName: lname,
        dob: dob,
        status: status,
      }),
    })
      .then((resp) => resp.json())
      .then((data) => {
        if (data.success) {
          setFname("");
          setLname("");
          setDob("");
          setClientCreated(data);

        } else {
          setClientError(true);
          setClientCreated(data)
        }
      })
      .catch((e) => console.log(e));
  };

  return (
    <>
      <h1>Create New Client Entry</h1>
      <form>
        <Input
          label="First Name"
          type="text"
          value={fname}
          callback={setFname}
        />
        <Input
          label="Last Name"
          type="text"
          value={lname}
          callback={setLname}
        />
        <label className={classes.fieldPadding}>
          Status:
          <select onChange={(e) => setStatus(e.target.value)}>
            <option value={true}>Active</option>
            <option value={false}>Cancelled</option>
          </select>
        </label>

        <Input
          label="Date of Birth"
          type="date"
          value={dob}
          callback={setDob}
        />
        {/* <Input label="PDF" type="file" /> */}
        <Button text="Submit" color="green" callback={submitClient} />
      </form>
      {clientCreated.success && (
        <>
          <h3>Client Created Successfully</h3>
          <h4> ID: {clientCreated.user.clientId.toUpperCase()} </h4>
          <h4>
            {" "}
            Name: {clientCreated.user.firstName} {clientCreated.user.lastName}{" "}
          </h4>
        </>
      )}
      {clientError && (
        <>
          <h3>ERROR: Try Again</h3>
          {clientCreated.message}
        </>
      )}
    </>
  );
}

export default NewEntry;
