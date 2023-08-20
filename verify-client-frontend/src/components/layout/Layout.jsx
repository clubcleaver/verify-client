import EmailIcon from "@mui/icons-material/Email";
import { useState, useEffect } from "react";
import Dashboard from "./dashboard/Dashboard";
import Login from "./login/Login";
import variables from "../layout/variables"

function Layout() {
  const [loggedIn, setLoggedIn] = useState(false);

  useEffect(() => {
    // Every Rerender checks the token validiity with API
    const token = localStorage.token;
    if (token) {
      // Verify token with API here ...
      fetch(variables.URL + "/user/checkToken", {
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
    } else {
      setLoggedIn(false);
    }
  }, [loggedIn]);

  return loggedIn ? <Dashboard /> : <Login callback={setLoggedIn} />; //setLoggedIn state is also handled in Login component
}

export default Layout;
