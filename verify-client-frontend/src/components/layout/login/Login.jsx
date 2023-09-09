import { useState, useEffect } from "react";
import Button from "../button/Button";
import Input from "../input/Input";
import classes from "./Login.module.css";
import variables from "../../layout/variables";

//Login Component takes the setLoggedIn function as "callback" in props to set the loggedIn state in Layout component.

// Components could have been devided further into subcomponents, But for scale that would increase complexity un-necessesarily
// and may need give rise to comprehensive documentation, Which I am trying to avoid.

function Login(props) {
  const [register, setRegister] = useState(false);

  // Form State being handled in Child components...
  const [userName, setUserName] = useState("");
  const [userEmail, setUserEmail] = useState("");
  const [userPassword, setUserPassword] = useState("");
  const [key, setKey] = useState("");

  // Incorrect Login State (false is BAD)
  const [IncorrectLogin, setIncorrectLogin] = useState(true);

  // onClick changes state to register
  const toggleRegister = () => {
    if (!register) {
      setRegister(true);
    } else {
      setRegister(false);
    }
  };

  //Handle Login (If login successful update props.callback)

  const loginUser = async (event) => {
    if (event) {
      event.preventDefault();
    }
    const loggedInUser = await fetch(variables.URL + "/user/auth", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        email: userEmail,
        password: userPassword,
      }),
    })
      .then((resp) => resp.json())
      .then((data) => {
        if (data.success) {
          props.callback(true);
          localStorage.token = data.token;
        } else {
          console.log(data);
          setIncorrectLogin(false);
        }
      })
      .catch((e) => console.log(e));
  };

  // Handle User Registeration and Login if successfull.
  const registerUser = async (e) => {
    e.preventDefault();
    const registerUser = await fetch(variables.URL + "/user/create", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        name: userName,
        email: userEmail,
        password: userPassword,
        iacID: key,
      }),
    })
      .then((resp) => resp.json())
      .then((data) => {
        if (data.success) {
          // Login User here
          loginUser();
        } else {
          setIncorrectLogin(false);
        }
        console.log(data);
      })
      .catch((e) => {
        // this state handle the error message switch.
        setIncorrectLogin(false);
        console.log(e);
      });
  };

  return (
    <>
      <div className={classes.loginForm}>
        <h1>login to Dashboard</h1>
        <p>Please provide registered email and password</p>
        <form className={classes.loginForm}>
          {register && (
            <Input label="Name" value={userName} callback={setUserName} />
          )}
          <Input
            label="Email address"
            value={userEmail}
            callback={setUserEmail}
          />
          <Input
            label="Password"
            type="password"
            value={userPassword}
            callback={setUserPassword}
          />
          {register && (
            <Input label="Authorization Key" value={key} callback={setKey} />
          )}

          {register ? (
            <Button text="Register" color="black" callback={registerUser} />
          ) : (
            <Button text="Login" color="black" callback={loginUser} />
          )}
        </form>
        <div>
          <p>
            Or{" "}
            <a onClick={toggleRegister}>{!register ? "Register" : "Login:"}</a>{" "}
            {!register && "a New User:"}
          </p>
          {!IncorrectLogin ? <h2>Operation Failed Try Again</h2> : ""}
        </div>
      </div>
    </>
  );
}
export default Login;
