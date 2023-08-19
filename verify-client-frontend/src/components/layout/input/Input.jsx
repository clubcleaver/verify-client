import classes from './Input.module.css'
// Props expected:
// id:
// type:
// value: state
// callback: setState
// label: Field Label

function Input(props) {
  const handleChange = (event) => {
    props.callback(event.target.value)
  }
  return (
    <div className={classes.container}>
      <label className={classes.label} htmlFor={props.id}> {props.label}
        <input
          className={classes.input}
          id={props.id}
          type={props.type}
          value={props.value}
          onChange={handleChange}
        />
      </label>
    </div>
  );
}

export default Input;
