import { useEffect, useState } from "react"
import {useAtom} from "jotai"
import state from "./AtomStates"
import PokemonCard from "./PokemonCard"
import FriendlyPokemonCard from "./FriendlyPokemonCard"
 
export default function ShowLocation(props) {

    const [enemyPokemon, setEnemyPokemon] = useState(null)
    const [startBattle, setStartBattle] = useState(false)
    const [selectedPokemons,setSelectedPokemons] = useAtom(state.selectedPokemons)
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

    const pokemonSelect = () => {
        console.log("asdsad");
    }

    const startBattleEvt = (e) => {
        setStartBattle(true)
        e.target.style.visibility = "hidden"
    }


    return (
        <div id="battleGround">

            {enemyPokemon && startBattle &&
                <div id="enemyPokemonHolder">
                    <p id="enemyPokemonName" className="center">{enemyPokemon.name[0] + enemyPokemon.name.slice(1)}</p>
                    <img id="enemyPokemonImage" src={enemyPokemon.sprites.other.home.front_default} />
                    <div id="enemyPokemonStats">
                        <p>HP : {enemyPokemon.stats[0].base_stat}</p>
                        <p>ATTACK : {enemyPokemon.stats[1].base_stat}</p>
                    </div>
                </div>
            }

            <div id="friendlyPokemonHolder">{[...selectedPokemons].map((pokemon) => 
                <FriendlyPokemonCard pokemon={pokemon} />
            )}
            </div>

            <button id="battleButton" onClick={startBattleEvt}>START BATTLE</button>
            <div id="backToMapButton" className="center"> <button onClick={props.backToMap}>BACK</button> </div>
        </div>
    )
}