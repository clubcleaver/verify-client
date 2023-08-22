import classes from './Userinfo.module.css'

function Userinfo(props) {
  console.log(props);

  return (
    <>
      <h2>User Found:</h2>
      <p>First Name: {props.data.user.firstName}</p>
      <p>Lase Name: {props.data.user.lastName}</p>
      <p>Date of Birth: {props.data.user.dob}</p>
      <p>
        <strong>Status:</strong>{" "}
        
          {" "}
          {props.data.user.status ? <span className={classes.active}>ACIVE</span> : <span className={classes.cancelled}>CANCELLED</span>}
        
      </p>
    </>
  );
}
export default Userinfo;
