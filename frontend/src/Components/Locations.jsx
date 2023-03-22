export default function Locations(props) {
    
    return (
        <div>
        {props.locations.results.map((location,index) => <button onClick={props.locationHandler} id={index} key={index}>{location.name}</button>)}
    </div>
    )
}