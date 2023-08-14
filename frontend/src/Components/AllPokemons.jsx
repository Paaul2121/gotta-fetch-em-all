import { useState, useEffect } from "react"
import PokemonCard from "./PokemonCard";
import { useAtom } from "jotai"
import state from "./AtomStates";
import ConfirmBuy from "./ConfirmBuy";


let SelectedPokemons = [];

export default function AllPokemons() {
    const [allpokemons, setAllPokemons] = useState(null)
    const [loading, setLoadig] = useState(false)
    const [filterInput, setFilterInput] = useState("")
    const [selectedPokemons, setSelectedPokemons] = useAtom(state.selectedPokemons)
    const [showUnloked, setShowUnloked] = useState(false);
    const [playerExperience, setPlayerExperience] = useAtom(state.playerExperience)
    const [playerMoney, setPlayerMoney] = useAtom(state.playerMoney)
    const [[wannaBuy,whatPokemon], setBuyPokemon] = useState([false,{}])


    useEffect(() => {
        let gatheringPokemons = [];

        for (let i = 1; i <20; i++) {
            fetch(`https://pokeapi.co/api/v2/pokemon/${i}`)
                .then(res => res.json())
                .then(res => gatheringPokemons.push(res))
        }

        setTimeout(() => {
            setAllPokemons(gatheringPokemons);
            setLoadig(true)
        }, 1000);
    }, [])



    const hideEvent = (e) => {
        document.querySelector(".allPkm").style.visibility = "hidden";
        console.log("working");
        
    }

    const filterInputEvent = (e) => {
        setFilterInput(e.target.value);
    }


    const pokemonCardEvent = (e) => {
        setBuyPokemon([true,e]);
    }

    const showUnlokedPokemons = (e) =>{
        showUnloked? (
            e.target.innerText = "SHOW UNLOKED",
            setShowUnloked(false)
            ):(
            e.target.innerText = "SHOW ALL",
            setShowUnloked(true)
        )
    }

    return (
        <div className="pokedexMenu allPkm">
            <div className="pokedexHeader">
                <button onClick={hideEvent} id="hideBtn">Hide</button>
                <div><label>Search for a Pokemon </label><input className="input" name="text" type="text" onInput={filterInputEvent} /></div>
                {/* <button id="showUnlockedButton" onClick={showUnlokedPokemons}>SHOW UNLOCKED</button> */}
                <div id="showXpInPokedex" >XP : {playerExperience - 40}</div>
                <div id="showMoneyInPokedex" >Money : {playerMoney}</div>
            </div>


            <div className="pokedex">

                {filterInput == "" && loading && !showUnloked && [...allpokemons].map((pokemon, index) =>
                    <PokemonCard key={index} pokemon={pokemon} pokemonCardEvent={pokemonCardEvent} SelectedPokemons={SelectedPokemons} forMyPokemons={true} />
                )}

                {
                    filterInput != "" && loading && !showUnloked && allpokemons?.map((pokemon, index) => {
                        if (pokemon.name.includes(filterInput)) {
                            return (
                                <PokemonCard key={index} pokemon={pokemon} pokemonCardEvent={pokemonCardEvent} SelectedPokemons={SelectedPokemons} forMyPokemons={true} />
                            )
                        }
                    })

                }


                {showUnloked && [...allpokemons].map((pokemon,index) =>{
                    if(playerExperience >= pokemon.base_experience){
                        return (
                            <PokemonCard key={index} pokemon={pokemon} pokemonCardEvent={pokemonCardEvent} SelectedPokemons={SelectedPokemons} forMyPokemons={true} />
                        )
                    }
                })}


            </div>

            {wannaBuy == true && <ConfirmBuy setBuyPokemon={setBuyPokemon} choosenPokemonCard={whatPokemon} />}
        </div>
    )
}
