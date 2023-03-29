import { useEffect, useState } from "react"
import {useAtom} from "jotai"
import state from "./AtomStates"
import PokemonCard from "./PokemonCard"
import FriendlyPokemonCard from "./FriendlyPokemonCard"
 
export default function ShowLocation(props) {

    const [enemyPokemon, setEnemyPokemon] = useState(null)
    const [startBattle, setStartBattle] = useState(false)
    const [selectedPokemons,setSelectedPokemons] = useAtom(state.selectedPokemons)
    const [friendlySelectedPokemon, setFriendlySelectedPokemon] = useState(null);
    console.log(selectedPokemons)
    

    useEffect(() => {
        fetch(`${props.location.results[props.locationIndex.split("-")[1]].url}`)
            .then(result => result.json())
            .then(selectedLocation => {
                console.log("select",selectedLocation)
                fetch(`https://pokeapi.co/api/v2/location-area/${selectedLocation.id}/`)
                    .then(result => result.json())
                    .then(area => {
                        console.log(area);
                        let randomPokemon = area.pokemon_encounters[Math.floor(Math.random() * area.pokemon_encounters.length)];
                        console.log(randomPokemon.pokemon.name)

                        fetch(`${randomPokemon.pokemon.url}`)
                            .then(result => result.json())
                            .then(pokemon => {
                                console.log(pokemon);
                                setEnemyPokemon(pokemon)

                            })
                    })
            })

    }, [])

    const FriendlyPokemonCardEvent = (e) => {
        setFriendlySelectedPokemon(JSON.parse(e.target.id));
        console.log(JSON.parse(e.target.id));
    }

    const pokemonSelect = () => {
        console.log("asdsad");
    }

    const startBattleEvt = (e) => {
        setStartBattle(true)
        e.target.style.visibility = "hidden";
        document.getElementById("friendlyPokemonHolder").style.visibility = "hidden";
    }


    return (
        <div id="battleGround">

            {enemyPokemon && startBattle &&
                <div id="enemyPokemonHolder">
                    <div id="enemyHealthBar">
                        <div id="health">
                        </div>
                        <div id="lost">
                        </div>
                        <div id="heal">
                    </div>
                </div> 
                <img id="enemyPokemonImage" src={enemyPokemon.sprites.other.home.front_default} />
                </div>
            }

            <div id="friendlyPokemonHolder">{[...selectedPokemons].map((pokemon) => 
                <FriendlyPokemonCard FriendlyPokemonCardEvent={FriendlyPokemonCardEvent} pokemon={pokemon} />
            )}
            </div>
            <div className="friendly_Pokemon_Fighter">
              {
              startBattle && 
              <div id="friendlyHealthBar">
                    <div id="health">
                    </div>
                    <div id="lost">
                    </div>
                    <div id="heal">
                    </div>
                </div> 
                }  
                <img id="friendly_Pokemon_Fighter_Image" src={friendlySelectedPokemon && friendlySelectedPokemon.sprites.other.home.front_default} />
            </div>
             
            <button id="battleButton" onClick={startBattleEvt}>START BATTLE</button>
            <div id="backToMapButton" className="center"> <button onClick={props.backToMap}>BACK</button> </div>
        </div>
    )
}