import Input from "../../input/Input";
import { useState } from "react";
import Button from "../../button/Button";
import classses from "./Search.module.css";
import Variables from "../../variables";
import Userinfo from "./userinfo/Userinfo";
// Public endpoint and serves the results searched by ID
function Search() {
  const [query, setQuery] = useState("");
  const [foundUser, setFoundUser] = useState("");

  const handleQuery = async (e) => {
    e.preventDefault();
    await fetch(Variables.URL + "/data?clientId=" + query)
    .then((resp) => resp.json())
    .then((data) => {
      setFoundUser(data);
      console.log(data)
    })
    .catch((e) => console.log(e))
  };
  return (
    <>
      <form>
        <Input
          label="Search By ID"
          type="text"
          value={query}
          callback={setQuery}
        />
        <Button text="Search" color="black" callback={handleQuery} />
      </form>
      <div className={classses.spacer}></div>

      <div>
        {foundUser && <Userinfo data={foundUser}/>}
        This is where the results will be displayed.
      </div>
    </>
  );
}

export default Search;
