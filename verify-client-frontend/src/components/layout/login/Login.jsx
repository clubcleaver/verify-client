import { useState, useEffect } from "react";
import Button from "../button/Button";
import Input from "../input/Input";
import classes from "./Login.module.css";

//Login Component takes the setLoggedIn function as "callback" in props to set the loggedIn state in Layout component.

function Login(props) {
  const [register, setRegister] = useState(false);

  // Form State being handled in Child components...
  const [userName, setUserName] = useState("");
  const [userEmail, setUserEmail] = useState("");
  const [userPassword, setUserPassword] = useState("");
  const [key, setKey] = useState("");

  // Incorrect Login State (false is BAD)
    const [IncorrectLogin, setIncorrectLogin] = useState(true)

  // onClick changes state to register
  const toggleRegister = () => {
    if (!register) {
      setRegister(true);
    } else {
      setRegister(false);
    }
  };
  console.log(userEmail);
  console.log(userPassword);
  console.log(key);

  //Handle Login (If login successful update props.callback)

  const loginUser = async () => {
    const loggedInUser = await fetch("http://localhost:3000/user/auth", {
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
            setIncorrectLogin(false)
        }
      })
      .catch((e) => console.log(e));
  };

  const registerUser = async () => {
    console.log(key);
    console.log(userName);
    console.log(userEmail);
    const registerUser = await fetch("http://localhost:3000/user/create", {
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
            loginUser()
        } else {
            setIncorrectLogin(true)
        }
        console.log(data);
      })
      .catch((e) => {
        console.log(e);
      });
  };

  return (
    <>
      <div className={classes.loginForm}>
        <h1>login to Dashboard</h1>
        <p>Please provide registered email and password</p>
        <div className={classes.loginForm}>
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
        </div>
        <div>
          <p>
            Or{" "}
            <a onClick={toggleRegister}>{!register ? "Register" : "Login:"}</a>{" "}
            {!register && "a New User:"}
          </p>
          {!IncorrectLogin ? <h2>Login Failed Try Again</h2> : ""}
        </div>
      </div>
    </>

  );
}
export default Login;
