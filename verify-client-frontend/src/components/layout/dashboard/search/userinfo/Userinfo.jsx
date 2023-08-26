import classes from "./Userinfo.module.css";
import Button from "../../../button/Button";
import Variables from "../../../variables";
import { useState } from "react";

function Userinfo(props) {
  const [userDeleted, setUserDeleted] = useState(false);
  console.log(props);

  const deleteUser = () => {
    const token = localStorage.getItem("token");
    fetch(Variables.URL + "/data", {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
        authorization: "Bearer " + token,
      },
      body: JSON.stringify({
        clientId: props.data.user.clientId,
      }),
    })
      .then((resp) => resp.json())
      .then((data) => {
        if (data) {
          setUserDeleted(true);
        }
      });
  };

  return (
    <>
      {userDeleted && (
        <div>
          <h2>User Deleted Successfully:</h2>
          <p>user ID: {props.data.user.clientId}</p>
        </div>
      )}
      {!userDeleted && (
        <div>
          <h2>User Found:</h2>
          <h4>Client ID: {props.data.user.clientId.toUpperCase()}</h4>
          <p>First Name: {props.data.user.firstName}</p>
          <p>Lase Name: {props.data.user.lastName}</p>
          <p>Date of Birth: {props.data.user.dob}</p>
          <p>
            <strong>Status:</strong>{" "}
            {props.data.user.status ? (
              <span className={classes.active}>ACIVE</span>
            ) : (
              <span className={classes.cancelled}>CANCELLED</span>
            )}
          </p>
          <Button text="Delete Entry" color="red" callback={deleteUser} />
        </div>
      )}
    </>
  );
}
export default Userinfo;
