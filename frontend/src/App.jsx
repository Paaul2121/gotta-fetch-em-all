import { useState, useEffect } from 'react'
import Locations from './Components/Locations'
import './App.css'
import ShowLocation from './Components/ShowLocation'

function App() {
  const [locations, setLocations] = useState(null)
  const [[enterLocation, whichLocation], setWhichLocation] = useState([false,-1])


  useEffect(() => {
    fetch("https://pokeapi.co/api/v2/location")
      .then(result => result.json())
      .then(data => {setLocations(data); console.log(data)})
  },[])

  const locationHandler = (e) =>{
    setWhichLocation([true, e.target.id])
  }

  const backToMap = () =>{
    setWhichLocation([false,-1]);
  }

  return (
    <div className="App">
       {locations && !enterLocation && [...locations.results].map((location,index) => <Locations key={index} id={index} location={location} locationHandler={locationHandler}/>)}
       {locations && enterLocation && <ShowLocation location={locations} locationIndex={whichLocation} backToMap={backToMap}/>}
      
    </div>
  )
}

{/* <Locations locations={locations} locationHandler={locationHandler} /> */}

export default App
