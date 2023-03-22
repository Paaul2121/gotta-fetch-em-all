import { useState, useEffect } from 'react'
import Locations from './Components/Locations'
import './App.css'

function App() {
  const [locations, setLocations] = useState(null)
  useEffect(() => {
    fetch("https://pokeapi.co/api/v2/location")
      .then(result => result.json())
      .then(data => {setLocations(data); console.log(data)})
  },[])

  return (
    <div className="App">
      {locations && <Locations locations={locations} />}
    </div>
  )
}



export default App
