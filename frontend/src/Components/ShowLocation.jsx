import { useEffect, useState } from "react"

export default function ShowLocation(props){

    const [enemyPokemon, setEnemyPokemon] = useState(null)
    const [startBattle, setStartBattle] = useState(false)
 
    useEffect(() => {
        fetch(`${props.location.results[props.locationIndex].url}`)
        .then(result => result.json())
        .then(selectedLocation => {
            console.log(selectedLocation)
            fetch(`https://pokeapi.co/api/v2/location-area/${selectedLocation.id}/`)
            .then( result => result.json())
            .then( area => {
                console.log(area);
                let randomPokemon = area.pokemon_encounters[Math.floor(Math.random() * area.pokemon_encounters.length)];
                console.log(randomPokemon.pokemon.name)
        
                fetch(`${randomPokemon.pokemon.url}`)
                .then(result => result.json())
                .then( pokemon => {
                    console.log(pokemon);
                    setEnemyPokemon(pokemon)
                    // setPokemon([pokemon.name, pokemon.sprites.other.dream_world.front_default])
                })
            })
           
        })

        
    }, [])

    const startBattleEvt = (e) =>{
        setStartBattle(true)
        e.target.style.visibility = "hidden"
    }
    
  
    return(
        <div>
       {enemyPokemon && startBattle &&
       <>
        <p>{enemyPokemon.name}</p>
        <img src={enemyPokemon.sprites.other.dream_world.front_default}/>
       </>
       }
       
       <button onClick={startBattleEvt}>START BATTLE</button>
       <button onClick={props.backToMap}>BACK</button>
       </div>
    )
}