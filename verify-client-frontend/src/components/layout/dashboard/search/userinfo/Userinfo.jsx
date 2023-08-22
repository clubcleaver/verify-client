

function Userinfo(props) {
    console.log(props)

    return(
        <>
        <p>First Name: {props.data.user.firstName}</p>
        <p>Lase Name: {props.data.user.lastName}</p>
        <p>Date of Birth: {props.data.user.dob}</p>
        <p>Status: {props.data.user.status ? <h3>ACIVE</h3> : <h3>CANCELLED</h3>}</p>
        </>
    )
}
export default Userinfo