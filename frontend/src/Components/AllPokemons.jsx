import { useState, useEffect } from "react"
import PokemonCard from "./PokemonCard";
import { useAtom } from "jotai"
import state from "./AtomStates";

let SelectedPokemons = [];

export default function AllPokemons() {
    const [allpokemons, setAllPokemons] = useState(null)
    const [loading, setLoadig] = useState(false)
    const [filterInput, setFilterInput] = useState("")
    const [selectedPokemons, setSelectedPokemons] = useAtom(state.selectedPokemons)


    // const [selectedPokemons, setSelectPokemons] = useState([])





    useEffect(() => {
        let gatheringPokemons = [];

        for (let i = 1; i <30; i++) {
            fetch(`https://pokeapi.co/api/v2/pokemon/${i}`)
                .then(res => res.json())
                .then(res => gatheringPokemons.push(res))
        }

        setTimeout(() => {
            setAllPokemons(gatheringPokemons);
            setLoadig(true)
            console.log(gatheringPokemons.length)
        }, 1000);
    }, [])



    const hideEvent = (e) => {
        document.querySelector("#pokedexMenu").style.visibility = "hidden";
        console.log("working");
        setSelectedPokemons(SelectedPokemons)
    }

    const filterInputEvent = (e) => {
        setFilterInput(e.target.value);
    }

    const pokemonCardEvent = (e) => {

        if (!e.target.nextSibling.classList.value.includes('selectedPokemon')) {

            if (SelectedPokemons.length < 3) {
                SelectedPokemons.push(JSON.parse(e.target.id));
                e.target.nextSibling.classList.add("selectedPokemon")
                console.log(SelectedPokemons)
                //setSelectedPokemons(prev => [...prev, JSON.parse(e.target.id)]);
            }
        } else {
            SelectedPokemons = SelectedPokemons.filter( elem => elem.id != JSON.parse(e.target.id).id)
            e.target.nextSibling.classList.remove("selectedPokemon")
            console.log(SelectedPokemons);

           // setSelectedPokemons((prev) => [...prev].filter(elem => elem.id != JSON.parse(e.target.id).id))
           

        }
    }

    return (
        <div id="pokedexMenu">
            <div id="pokedexHeader">
                <button onClick={hideEvent} id="hideBtn">Hide</button>
                <div><label>Search for a Pokemon </label><input className="input" name="text" type="text" onInput={filterInputEvent} /></div>
            </div>


            <div id="pokedex">

                {filterInput == "" && loading && [...allpokemons].map((pokemon, index) =>
                    <PokemonCard key={index} pokemon={pokemon} pokemonCardEvent={pokemonCardEvent} SelectedPokemons={SelectedPokemons} />
                )}
                {/* 
                //loading pokemons by filter */}

                {
                    filterInput != "" && loading && allpokemons?.map((pokemon, index) => {
                        if (pokemon.name.includes(filterInput)) {
                            return (
                                <PokemonCard key={index} pokemon={pokemon} pokemonCardEvent={pokemonCardEvent} SelectedPokemons={SelectedPokemons} />
                            )
                        }
                    })

                }

                {/* //  loading screen */}

                {!loading && <div id="loadingScreen"><img src="../../public/images/B6F.gif" /></div>}


            </div>
        </div>
    )
}
