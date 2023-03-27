import { useState, useEffect } from 'react'
import Locations from './Components/Locations'
import './App.css'
import ShowLocation from './Components/ShowLocation'
import PokemonCard from './Components/PokemonCard'
import AllPokemons from './Components/AllPokemons'

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
  let mapHideEvent = ()=> {
    document.querySelector("#mapLoc").style.visibility = "hidden";
  }

  return (
    <div className="App">
      <div id="mapLoc"> {locations && !enterLocation && [...locations.results].map((location, index) => <Locations key={index} id={index} location={location} locationHandler={locationHandler} />)}
       <button className = "hideMap" onClick={mapHideEvent}>CLICK MEEEE</button>
      </div>
       {locations && enterLocation && <ShowLocation location={locations} locationIndex={whichLocation} backToMap={backToMap}/>}
     <> <AllPokemons/> </>
     
      <button className='mapBtn'>OPEN MAP</button>
      <button className="pokedexBtn"> OPEN POKEDEX </button>
    </div>
  )
}

export default App;