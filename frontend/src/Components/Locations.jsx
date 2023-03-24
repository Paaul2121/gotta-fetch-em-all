export default function Locations(props) {
    
    return (
        <button  className="locBtn mapButton" onClick={props.locationHandler} id={"loc-"+props.id}>{props.location.name}</button>
        )
    }


