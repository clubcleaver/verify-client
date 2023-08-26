import { useState } from "react";
import classes from "./Dashboard.module.css";
import Button from "../button/Button";
import NewEntry from "./newEntry/NewEntry";
import Search from "./search/Search";

// Same as Login component, In the interest of avoiding complexity, No sub-division of components is done.
function Dashboard(props) {
  const [newUser, setNewUser] = useState(true);
  const [searchById, setSearchById] = useState(false);

  // Toggle DOM for New Entry
  const newEntryToggle = () => {
    setSearchById(false);
    setNewUser(true);
  };

  // Toggle DOM for search by ID
  const searchToggle = () => {
    setSearchById(true);
    setNewUser(false);
  };

  const logOut = () => {
    localStorage.removeItem("token");
    props.callback(false);
  };

  return (
    <div>
      {/* Nav Options */}
      <div className={classes.options}>
        <Button
          text="Create New Entry"
          color="black"
          callback={newEntryToggle}
        />

        <Button text="Search by ID" color="black" callback={searchToggle} />
        <Button text="Log Out" color="red" callback={logOut} />
      </div>
      <div className={classes.spacer}></div>
      {newUser && <NewEntry />}
      {searchById && <Search />}
      <div className={classes.spacer}></div>
    </div>
  );
}
export default Dashboard;
