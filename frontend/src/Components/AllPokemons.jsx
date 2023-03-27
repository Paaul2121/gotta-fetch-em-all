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

        for (let i = 1; i < 20; i++) {
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
        document.getElementById("pokedexMenu").style.visibility = "hidden"
        setSelectedPokemons(SelectedPokemons)
    }

    const filterInputEvent = (e) => {
        setFilterInput(e.target.value);
    }

    const pokemonCardEvent = (e) => {

        if (!e.target.nextSibling.classList.value.includes('selectedPokemon')) {

            if (SelectedPokemons.length < 3) {
                // e.target.nextSibling.classList.includes('selectedPokemon')
                //setSelectedPokemons(prev => [...prev, JSON.parse(e.target.id)]);
                 SelectedPokemons.push(JSON.parse(e.target.id));
                console.log(SelectedPokemons)
                console.log(e.target.nextSibling)
                e.target.nextSibling.classList.add("selectedPokemon")

            }

        } else {
            e.target.nextSibling.classList.remove("selectedPokemon")
            console.log(JSON.parse(e.target.id).name)
            SelectedPokemons = SelectedPokemons.filter( elem => elem.id != JSON.parse(e.target.id).id)
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
                    <PokemonCard key={index} pokemon={pokemon} pokemonCardEvent={pokemonCardEvent} SelectedPokemons={selectedPokemons} />
                )}
                {/* 
                //loading pokemons by filter */}

                {
                    filterInput != "" && loading && allpokemons?.map((pokemon, index) => {
                        if (pokemon.name.includes(filterInput)) {
                            return (
                                <PokemonCard key={index} pokemon={pokemon} pokemonCardEvent={pokemonCardEvent} SelectedPokemons={selectedPokemons} />
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
