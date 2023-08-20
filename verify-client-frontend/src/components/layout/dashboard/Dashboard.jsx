import { useState } from "react";
import URL from "../../layout/variables";
import classes from "./Dashboard.module.css";
import Input from "../input/Input";
import Button from "../button/Button";
import NewEntry from "./newEntry/NewEntry";
import Search from "./search/Search";

// Same as Login component, In the interest of avoiding complexity, No sub-division of components is done.
function Dashboard() {
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
      </div>
      <div className={classes.spacer}></div>
      {newUser && <NewEntry/>}
      {searchById && <Search/>}
      <div className={classes.spacer}></div>
    </div>
  );
}
export default Dashboard;
