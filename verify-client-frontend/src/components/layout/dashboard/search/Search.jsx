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
  const [foundUserError, setFoundUserError] = useState(true);
  const handleQuery = async (e) => {
    e.preventDefault();
    setFoundUser("")
    await fetch(Variables.URL + "/data?clientId=" + query)
      .then((resp) => resp.json())
      .then((data) => {
        if (data.success) {
          setFoundUser(data);
          console.log(data);
          setFoundUserError(true);
        } else {
          setFoundUserError(false);
        }
      })
      .catch((e) => console.log(e));
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
        {foundUser.success && <Userinfo data={foundUser} />}
        {!foundUserError && <h2>Failed: {foundUser.message}</h2>}
      </div>
    </>
  );
}

export default Search;
