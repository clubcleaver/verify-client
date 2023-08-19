import logo from "./assets/iac-logo.png";
import classes from "./App.module.css";
import Layout from "./components/layout/Layout"

function App() {
  return (
    <>
      <div className={classes.container}>
        <div>
          <img className={classes.logo} src={logo} alt="" />
        </div>
        <div className={classes.heading}>
          <h1>Client Database Dashboard</h1>
        </div>
        <div>
          <Layout/>
        </div>
      </div>
    </>
  );
}

export default App;
