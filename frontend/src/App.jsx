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

  return (
    <div className="App">
       {locations && !enterLocation && <Locations locations={locations} locationHandler={locationHandler} />}
       {locations && enterLocation && <ShowLocation location={locations} locationIndex={whichLocation} />}
      
    </div>
  )
}



export default App
