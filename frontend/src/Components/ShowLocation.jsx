import { useEffect, useState } from "react"
import { useAtom } from "jotai"
import state from "./AtomStates"
import FriendlyPokemonCard from "./FriendlyPokemonCard"
import FightIntro from "./WinLoseFight/FightIntro"
import WinnerVideo from "./WinLoseFight/WinnerVideo"
import DefeadVideo from "./WinLoseFight/DefeadVideo"
import fire from "./images/fire.png"
import fire2 from "./images/fire2.png"
import explosion from "./images/explosion.gif"
import explosion2 from "./images/explosion2.gif"
import projectile from "./images/projectile.mp3"
import explosionAudio from "./images/explosionAudio.mp3"

import FriendlyHealthBar from "./PokemonsHealthBars/FriendlyHealthBar"
import EnemyHealth from "./PokemonsHealthBars/EnemyHealth"

const bloodImg = ["https://o.remove.bg/downloads/ec99d8e8-3c55-492f-84f5-be5bf33079a1/png-transparent-blood-blood-miscellaneous-image-file-formats-text-thumbnail-removebg-preview.png", "https://o.remove.bg/downloads/6433ad2a-572c-4c79-a329-2f1f49809f25/png-transparent-blood-blood-miscellaneous-hand-photography-removebg-preview.png", "https://o.remove.bg/downloads/5a976ed4-737b-46b7-9990-6f83965fb212/png-transparent-splash-of-blood-bloodstain-pattern-analysis-blood-love-miscellaneous-text-removebg-preview.png", "https://o.remove.bg/downloads/5c968aa5-f88f-4b16-8d51-97ebb2bd5ff9/png-transparent-blood-splash-blood-splash-of-red-blood-miscellaneous-ink-color-splash-removebg-preview.png"];


let friendlyCurrentHP, fullHPfriendly, enemyCurrentHP, fullHPenemy;;
export default function ShowLocation(props) {

    const [enemyPokemon, setEnemyPokemon] = useState(null)
    const [startBattle, setStartBattle] = useState(false)
    const [selectedPokemons, setSelectedPokemons] = useAtom(state.selectedPokemons)
    const [playerExperience, setPlayerExperience] = useAtom(state.playerExperience)
    const [playerMoney, setPlayerMoney] = useAtom(state.playerMoney)
    const [dead_Pokemons_Number, setDead_Pokemons_Number] = useState(0)
    const [friendlySelectedPokemon, setFriendlySelectedPokemon] = useState(null);
    const [winOrLose, setWinOrLose] = useState(null)
    const [deadEnemyPokemon, setDeadEnemyPokemon] = useState(false);
    const [showFightVideo, setShowFightVideo] = useState(false);
    const [showWinnerVideo, setShowWinnerVideo] = useState(false);
    const [showDefeadVideo, setShowDefeadVideo] = useState(false);
const [playerPokemons, setPlayerPokemons] = useAtom(state.playerPokemons);

const [playerUsername, setPlayerUsername] = useAtom(state.playerUsername);


    useEffect(() => {
        fetch(`${props.location.results[props.locationIndex.split("-")[1]].url}`)
            .then(result => result.json())
            .then(selectedLocation => {
                fetch(`https://pokeapi.co/api/v2/location-area/${selectedLocation.id}/`)
                    .then(result => result.json())
                    .then(area => {
                        let randomPokemon = area.pokemon_encounters[Math.floor(Math.random() * area.pokemon_encounters.length)];

                        fetch(`${randomPokemon.pokemon.url}`)
                            .then(result => result.json())
                            .then(pokemon => {
                                setEnemyPokemon(pokemon)

                            })
                    })
            })

    }, [])


    const FriendlyPokemonCardEvent = (e) => {
        document.getElementById("friendlyPokemonHolder").style.visibility = "hidden";
        setFriendlySelectedPokemon(JSON.parse(e.target.id));
        if (document.getElementById("attack")) {
            document.getElementById("attack").style.visibility = "visible"
        }
        friendlyCurrentHP = 100;
        fullHPfriendly = JSON.parse(e.target.id).stats[0].base_stat;

        document.getElementById("friendlyHealthRemained").style.width = `${friendlyCurrentHP}%`
        document.getElementById("friendlyShadowHP").style.width = `${friendlyCurrentHP}%`
    }

    const attackEvent = (e) => {

        document.getElementById("projectile").play();
        document.getElementById("fire").style.animationName = "fire";
        document.getElementById("fire").style.visibility = "visible";

        ////////DEALING THE DAMAGE
        // e.target.style.visibility = "hidden"
        let enemyP = { ...enemyPokemon };
        let friendlyP = { ...friendlySelectedPokemon };

        enemyP.stats[0].base_stat = enemyP.stats[0].base_stat - Math.floor(((((2 / 5 + 2) * friendlyP.stats[1].base_stat * 100 / enemyP.stats[2].base_stat) / 50) + 2) * Math.floor(Math.random() * (255 - 217) + 217) / 255);
        enemyCurrentHP -= (Math.floor(((((2 / 5 + 2) * enemyP.stats[1].base_stat * 100 / enemyP.stats[2].base_stat) / 50) + 2) * Math.floor(Math.random() * (255 - 217) + 217) / 255) / fullHPenemy) * 100;
        document.getElementById("enemyHealthRemained").style.width = `${enemyCurrentHP}%`
        setEnemyPokemon(enemyP);

        if (friendlySelectedPokemon.stats[0].base_stat <= 0) {
            document.getElementById("friendlyHealthRemained").style.width = `${0}%`
            document.getElementById("friendlyShadowHP").style.width = `${0}%`;
        } else {

            setTimeout(() => {
                document.getElementById("projectile").pause();
                document.getElementById("explosionAudio").play();
                document.getElementById("fire").style.visibility = "hidden";
                document.getElementById("explosion").style.visibility = "visible";
            }, 700)

            setTimeout(() => {
                document.getElementById("explosion").style.visibility = "visible";
            }, 1400)

            setTimeout(() => {
                friendlyCurrentHP -= (Math.floor(((((2 / 5 + 2) * enemyP.stats[1].base_stat * 100 / friendlyP.stats[2].base_stat) / 50) + 2) * Math.floor(Math.random() * (255 - 217) + 217) / 255) / fullHPfriendly) * 100;
                document.getElementById("friendlyHealthRemained").style.width = `${friendlyCurrentHP}%`
                document.getElementById("fire").style.animationName = "";
                document.getElementById("fire").style.visibility = "hidden";
                document.getElementById("fire").style.animationName = "fire2";
                document.getElementById("fire").style.visibility = "visible";
                document.getElementById("projectile").play();
            }, 1500)
        }

        setTimeout(() => {
                document.getElementById("explosion").style.visibility = "hidden";
                document.getElementById("explosionAudio").pause();
                document.getElementById("explosionAudio").currentTime = 0;
        }, 1800)

        setTimeout(() => {
            document.getElementById("fire").style.animationName = "";
            document.getElementById("fire").style.visibility = "hidden";
            document.getElementById("explosion2").style.visibility = "visible";
            document.getElementById("projectile").pause();
            document.getElementById("explosionAudio").play();
        }, 2200)

        setTimeout(() => {
            document.getElementById("explosion2").style.visibility = "hidden";
            document.getElementById("explosionAudio").pause();
            document.getElementById("explosionAudio").currentTime = 0;
        }, 3300)


        if (document.getElementById("enemyShadowHP")) {
            let main = setTimeout(() => {
                document.getElementById("enemyShadowHP").style.width = `${enemyCurrentHP}%`;
                // clearInterval(main);
            }, 700)
        }

        document.getElementById("attack").style.visibility = "hidden"
        setTimeout(() => {
            setTimeout(() => {
                if (friendlySelectedPokemon.stats[0].base_stat <= 0) {
                    document.getElementById("attack").style.visibility = "hidden";
                }

                friendlyP.stats[0].base_stat = friendlyP.stats[0].base_stat - Math.floor(((((2 / 5 + 2) * enemyP.stats[1].base_stat * 100 / friendlyP.stats[2].base_stat) / 50) + 2) * Math.floor(Math.random() * (255 - 217) + 217) / 255);
                if (document.getElementById("friendlyShadowHP")) {

                    let main = setTimeout(() => {
                        document.getElementById("friendlyShadowHP").style.width = `${friendlyCurrentHP}%`;
                        // clearInterval(main);
                    }, 700)
                }
                document.getElementById("attack").style.visibility = "visible";
            }, 500)
        }, 1500)


        setFriendlySelectedPokemon(friendlyP)


        ////////DEALING THE DAMAGE


        if (friendlySelectedPokemon.stats[0].base_stat <= 0) {
            document.getElementById("attack").style.visibility = "hidden";
            friendlySelectedPokemon.stats[0].base_stat = 0
            document.getElementById("friendlyPokemonHolder").style.visibility = "visible";
            //  e.target.style.backgroundImage = `url(${Math.floor(Math.random() * bloodImg.length)})`
            let deadPokemon = document.getElementById(JSON.stringify([...selectedPokemons].reduce((acc, cur) => cur.name == friendlySelectedPokemon.name ? cur : acc, selectedPokemons[0])))
            deadPokemon.style.backgroundImage = `url(${bloodImg[Math.floor(Math.random() * bloodImg.length)]})`
            deadPokemon.style.backgroundSize = "cover"
            deadPokemon.style.backgroundPosition = "center"
            deadPokemon.style.backgroundColor = "rgba(0,0,0,0.5)";
            deadPokemon.insertAdjacentHTML("beforeend", "<div id=dead><div>")
            document.getElementById("attack").style.visibility = "hidden"

            deadPokemon.parentElement.querySelector(".front").remove()
            deadPokemon.nextSibling.classList.add("backClone")
            deadPokemon.nextSibling.classList.remove("back")

            setDead_Pokemons_Number(dead_Pokemons_Number + 1)

            console.log(dead_Pokemons_Number)
            if (dead_Pokemons_Number + 1 == selectedPokemons.length) {
                document.getElementById("backToMapButton").style.visibility = "visible";
                setShowDefeadVideo(true)

            }
        }

        if (enemyPokemon.stats[0].base_stat <= 0) {
            setDeadEnemyPokemon(true)
            document.getElementById("backToMapButton").style.visibility = "visible";

            setShowWinnerVideo(true);

            setPlayerExperience(playerExperience + Math.floor(enemyPokemon.base_experience / 2))
            setPlayerMoney(playerMoney + Math.floor(enemyPokemon.base_experience / 2))
            
            return fetch("http://localhost:3001/update", {
              method: "PATCH",
              headers: {
                "Content-Type": "application/json",
              },
              body: JSON.stringify({
                username: playerUsername,
                playerPokemons: playerPokemons,
                playerMoney:
                  playerMoney + Math.floor(enemyPokemon.base_experience / 2),
                playerExperience:
                  playerExperience +
                  Math.floor(enemyPokemon.base_experience / 2),
              }),
            }).then((res) => res.json());
        }


    }

    const startBattleEvt = (e) => {
        if (friendlySelectedPokemon) {
            setStartBattle(true)
            e.target.style.visibility = "hidden";
            document.getElementById("friendlyPokemonHolder").style.visibility = "hidden";
            e.target.style.visibility = "hidden"
            document.getElementById("backToMapButton").style.visibility = "hidden"

            setShowFightVideo(true)
            setInterval(() => {
                setShowFightVideo(false)
            }, 2300);
            enemyCurrentHP = 100;
            fullHPenemy = enemyPokemon.stats[0].base_stat;

            document.getElementById("enemyHealthRemained").style.width = `${enemyCurrentHP}%`
            document.getElementById("enemyShadowHP").style.width = `${enemyCurrentHP}%`
        }
    }




    return (
        <div id="battleGround">


            {enemyPokemon && startBattle && dead_Pokemons_Number != selectedPokemons.length && !deadEnemyPokemon &&
            <>
                <div id="enemyPokemonHolder">
                <img id="enemyPokemonImage" src={enemyPokemon.sprites.other.home.front_default} />
                <EnemyHealth enemyPokemon={enemyPokemon}/>
                </div>
                <button id="attack" onClick={attackEvent} >ATTACK</button>  
                <img id="fire" src={fire} />
                <img id="fire2" src={fire2} />
                <img id="explosion" src={explosion} />
                <img id="explosion2" src={explosion2} />
                <audio id="projectile" controls hidden>
                    <source src={projectile} type="audio/ogg" />
                </audio>
                <audio id="explosionAudio" controls hidden>
                    <source src={explosionAudio} type="audio/ogg" />
                </audio>
             </>
            }

            {
                dead_Pokemons_Number != selectedPokemons.length && !deadEnemyPokemon &&
                <div id="friendlyPokemonHolder">
                    {[...selectedPokemons].map((pokemon) =>
                        <FriendlyPokemonCard FriendlyPokemonCardEvent={FriendlyPokemonCardEvent} pokemon={pokemon} />
                    )}

                </div>
            }

            {friendlySelectedPokemon && dead_Pokemons_Number != selectedPokemons.length && !deadEnemyPokemon &&
                <div className="friendly_Pokemon_Fighter">
                    <img id="friendly_Pokemon_Fighter_Image" src={friendlySelectedPokemon && friendlySelectedPokemon.sprites.other.home.front_default} />
                    <FriendlyHealthBar friendlySelectedPokemon={friendlySelectedPokemon}/>
                </div>
            }

            {showFightVideo &&
                <FightIntro />
            }

            {
                showWinnerVideo &&
                <WinnerVideo xp={enemyPokemon.base_experience / 2} />
            }

            {
                showDefeadVideo &&
                <DefeadVideo />
            }

            <button id="battleButton" onClick={startBattleEvt}>START BATTLE</button>
            <div id="backToMapButton" className="center"> <button id="backToMapBtn" onClick={props.backToMap}>BACK</button> </div>
        </div>
    )
}