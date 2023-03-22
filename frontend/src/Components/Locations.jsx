export default function Locations(props) {
    
    return (
        <button onClick={props.locationHandler} id={props.id}>{props.location.name}</button>
    //     <div>

    //     {/* {props.locations.results.map((location,index) => <button onClick={props.locationHandler} id={index} key={index}>{location.name}</button>)} */}
    // </div>
    )
}