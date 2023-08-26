import classes from "./Button.module.css";

//Button takes following props
//%%%%%%%%%%%%%%%%%%%%%%%%%%%%%
// color: background Color
// text: Display text
// callback: Onclick function
function Button(props) {
  return (
    <div>
      <button
        className={`${classes.button} ${classes[props.color]}`}
        onClick={props.callback}
      >
        {props.text}
      </button>
    </div>
  );
}

export default Button;
