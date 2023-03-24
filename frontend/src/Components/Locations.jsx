export default function Locations(props) {
    
    return (
        <button className="locBtn mapButton" onClick={props.locationHandler} id={"loc-"+props.id}>
    <span id={"loc-"+props.id}>{props.location.name}</span>
    <div class="top"></div>
    <div class="left"></div>
    <div class="bottom"></div>
    <div class="right"></div>
</button>
        )
    }
    
    // <button  className="locBtn mapButton" onClick={props.locationHandler} id={"loc-"+props.id}>{props.location.name}</button>


