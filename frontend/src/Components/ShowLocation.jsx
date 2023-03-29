import { useEffect, useState } from "react"
import {useAtom} from "jotai"
import state from "./AtomStates"
import WinOrLoseMSG from "./WinOrLoseMSG"
import FriendlyPokemonCard from "./FriendlyPokemonCard"
import FightIntro from "./WinLoseFight/FightIntro"
import WinnerVideo from "./WinLoseFight/WinnerVideo"
import DefeadVideo from "./WinLoseFight/DefeadVideo"


 const bloodImg = ["https://o.remove.bg/downloads/ec99d8e8-3c55-492f-84f5-be5bf33079a1/png-transparent-blood-blood-miscellaneous-image-file-formats-text-thumbnail-removebg-preview.png","https://o.remove.bg/downloads/6433ad2a-572c-4c79-a329-2f1f49809f25/png-transparent-blood-blood-miscellaneous-hand-photography-removebg-preview.png","https://o.remove.bg/downloads/5a976ed4-737b-46b7-9990-6f83965fb212/png-transparent-splash-of-blood-bloodstain-pattern-analysis-blood-love-miscellaneous-text-removebg-preview.png","https://o.remove.bg/downloads/5c968aa5-f88f-4b16-8d51-97ebb2bd5ff9/png-transparent-blood-splash-blood-splash-of-red-blood-miscellaneous-ink-color-splash-removebg-preview.png"];



export default function ShowLocation(props) {

    const [enemyPokemon, setEnemyPokemon] = useState(null)
    const [startBattle, setStartBattle] = useState(false)
    const [selectedPokemons,setSelectedPokemons] = useAtom(state.selectedPokemons)
    const [dead_Pokemons_Number, setDead_Pokemons_Number] = useState(0)
    const [friendlySelectedPokemon, setFriendlySelectedPokemon] = useState(null);
    const [winOrLose, setWinOrLose] = useState(null)
    const [deadEnemyPokemon, setDeadEnemyPokemon] = useState(false);
    const [showFightVideo, setShowFightVideo] = useState(false);
    const [showWinnerVideo, setShowWinnerVideo] = useState(false);
    const [showDefeadVideo, setShowDefeadVideo] = useState(false);

    

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
             if(document.getElementById("attack")) document.getElementById("attack").style.visibility = "visible"
    }

    const attackEvent = (e) => {

        ////////DEALING THE DAMAGE

        // e.target.style.visibility = "hidden"
        let enemyP = {...enemyPokemon};
        let friendlyP = {...friendlySelectedPokemon};
        enemyP.stats[0].base_stat = enemyP.stats[0].base_stat - Math.floor(((((2/5+2)* friendlyP.stats[1].base_stat *100/ enemyP.stats[2].base_stat )/50)+2) * Math.floor( Math.random() * (255 - 217) + 217)/255)
        setEnemyPokemon(enemyP);

        friendlyP.stats[0].base_stat =  friendlyP.stats[0].base_stat - Math.floor(((((2/5+2)* enemyP.stats[1].base_stat *100/ friendlyP.stats[2].base_stat )/50)+2) * Math.floor( Math.random() * (255 - 217) + 217)/255);
        console.log("done")
        setFriendlySelectedPokemon(friendlyP)

        // setTimeout(() =>{
        //     friendlyP.stats[0].base_stat =  friendlyP.stats[0].base_stat - Math.floor(((((2/5+2)* enemyP.stats[1].base_stat *60/ friendlyP.stats[2].base_stat )/50)+2) * Math.floor( Math.random() * (255 - 217) + 217)/255);
        //     console.log("done")
        //     setFriendlySelectedPokemon(friendlyP)
        //     e.target.style.visibility = "visible"
        // },1500)

        ////////DEALING THE DAMAGE


        if(friendlySelectedPokemon.stats[0].base_stat <= 0){
            friendlySelectedPokemon.stats[0].base_stat = 0
          //  e.target.style.backgroundImage = `url(${Math.floor(Math.random() * bloodImg.length)})`
          let deadPokemon =  document.getElementById(JSON.stringify([...selectedPokemons].reduce( (acc,cur) => cur.name == friendlySelectedPokemon.name? cur : acc, selectedPokemons[0])))
          deadPokemon.style.backgroundImage = `url(${bloodImg[Math.floor(Math.random() * bloodImg.length)]})`
          deadPokemon.style.backgroundSize = "cover"
          deadPokemon.style.backgroundPosition= "center"
          deadPokemon.style.backgroundColor = "rgba(0,0,0,0.5)";
          deadPokemon.insertAdjacentHTML("beforeend","<div id=dead><div>")
          document.getElementById("attack").style.visibility = "hidden"

         deadPokemon.parentElement.querySelector(".front").remove()
         deadPokemon.nextSibling.classList.add("backClone")
         deadPokemon.nextSibling.classList.remove("back")

         setDead_Pokemons_Number( dead_Pokemons_Number + 1)
         
         console.log(dead_Pokemons_Number)
         if(dead_Pokemons_Number+1 == selectedPokemons.length){
            document.getElementById("backToMapButton").style.visibility = "visible";
            setWinOrLose(false)
            setShowDefeadVideo(true)
         }
        }
        
        if(enemyPokemon.stats[0].base_stat <= 0 ){
            setWinOrLose(true);
            setDeadEnemyPokemon(true)
            document.getElementById("backToMapButton").style.visibility = "visible"
            setShowWinnerVideo(true);
            setInterval(() =>{
                setShowWinnerVideo(false)
            },10000)
        }

       
    }

    const startBattleEvt = (e) => {
        if(friendlySelectedPokemon){
        setStartBattle(true)
        e.target.style.visibility = "hidden"
         document.getElementById("backToMapButton").style.visibility = "hidden"

         setShowFightVideo(true)
         setInterval(()=>{
            setShowFightVideo(false)
         },2300);
        }
    }

    


    return (
        <div id="battleGround">


            {enemyPokemon && startBattle && dead_Pokemons_Number != selectedPokemons.length && !deadEnemyPokemon &&
            <>
                <div id="enemyPokemonHolder">
                    <img id="enemyPokemonImage" src={enemyPokemon.sprites.other.home.front_default} />
                    <div id="enemyPokemonStats" className="battle-Pokemon-Stats">
                        <p>HP : {enemyPokemon.stats[0].base_stat}</p>
                        <p>ATTACK : {enemyPokemon.stats[1].base_stat}</p>
                    </div>
                </div>
                <button id="attack" onClick={attackEvent} >ATTACK</button>
             </>
            }

            { dead_Pokemons_Number != selectedPokemons.length && !deadEnemyPokemon && <div id="friendlyPokemonHolder">{[...selectedPokemons].map((pokemon) => 
                <FriendlyPokemonCard FriendlyPokemonCardEvent={FriendlyPokemonCardEvent} pokemon={pokemon} />
            )}
            </div>}

           {friendlySelectedPokemon && dead_Pokemons_Number != selectedPokemons.length && !deadEnemyPokemon && <div className="friendly_Pokemon_Fighter">
                <img id="friendly_Pokemon_Fighter_Image" src={friendlySelectedPokemon && friendlySelectedPokemon.sprites.other.home.front_default} />
                    <div id="friendly_Pokemon_Fighter_Stats" className="battle-Pokemon-Stats">
                    <p>HP : {friendlySelectedPokemon.stats[0].base_stat}</p>
                        <p>ATTACK : {friendlySelectedPokemon.stats[1].base_stat}</p>
                    </div>
            </div>}

            
             {dead_Pokemons_Number == selectedPokemons.length || deadEnemyPokemon ?
             <WinOrLoseMSG classWinOrLose={winOrLose? "Win" : "Lose"}/> : null
             }

             {showFightVideo && 
                <FightIntro/>
             }

             {
                showWinnerVideo &&
                <WinnerVideo/>
             }

             {
                showDefeadVideo &&
                <DefeadVideo/>
             }

            <button id="battleButton" onClick={startBattleEvt}>START BATTLE</button>
            <div id="backToMapButton" className="center"> <button onClick={props.backToMap}>BACK</button> </div>
        </div>
    )
}