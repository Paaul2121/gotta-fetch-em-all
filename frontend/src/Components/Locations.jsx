export default function Locations(props) {
    console.log(props.locations);
    
    return (
        <div>
        {props.locations.results.map(location => <button>{location.name}</button>)}
    </div>
    )
}