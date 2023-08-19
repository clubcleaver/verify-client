import EmailIcon from "@mui/icons-material/Email";
import { useState, useEffect } from "react";
import Dashboard from "./dashboard/Dashboard";
import Login from "./login/Login";

function Layout() {
  const [loggedIn, setLoggedIn] = useState(false);

  useEffect(() => {
    // Todo: need to extend functionality to verify token at backend
    const token = localStorage.token;
    if (token) {
      fetch("http://localhost:3000/user/checkToken", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "authorization": "Bearer " + token,
        },
      })
        .then((resp) => resp.json())
        .then((data) => {
          console.log(data)
          if (data.success) {
            setLoggedIn(() => true);
          } else {
            setLoggedIn(false);
          }
        })
        .catch(e => console.log(e))
      // Verify token with API here ...
    } else {
      setLoggedIn(false);
    }
  }, [loggedIn]);

  return loggedIn ? <Dashboard /> : <Login callback={setLoggedIn} />; //setLoggedIn state is also handled in Login component
}

export default Layout;
