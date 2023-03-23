export default function Locations(props) {
    
    return (
        <button onClick={props.locationHandler} id={props.id}>{props.location.name}</button>
    )
}