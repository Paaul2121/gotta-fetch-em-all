import { useState, useEffect } from "react"
import PokemonCard from "./PokemonCard";


export default function AllPokemons() {
    const [allpokemons, setAllPokemons] = useState([])
    const [loading, setLoadig] = useState(false)
    const [counter, setCounter] = useState(1)
    const [filterInput, setFilterInput] = useState("")

    useEffect(() => {
        const loader = async () => {
            const req = await fetch(
                `https://pokeapi.co/api/v2/pokemon/${counter}`
            );
            if (req.ok) {
                const res = await req.json();
                setAllPokemons([...allpokemons, res]);
                setCounter(counter + 1);
            }
        };
        //649
        if (counter <= 100) {
            loader();
            console.log(allpokemons)
        }else{
            setLoadig(true)
        }
    }, [counter]);

    const hideEvent = (e) => {
        document.getElementById("pokedexMenu").style.visibility = "hidden"
    }

    const filterInputEvent = (e) => {
        setFilterInput(e.target.value);
    }

    return (
        <div id="pokedexMenu">
            <div id="pokedexHeader">
                <button onClick={hideEvent} id="hideBtn">Hide</button>
                <div><label>Search for a Pokemon </label><input className="input" name="text" type="text" onInput={filterInputEvent} /></div>
            </div>


            <div id="pokedex">

            {filterInput == "" && allpokemons?.map(pokemon =>
                   <PokemonCard pokemon={pokemon} />
                )}
{/* 
                //loading pokemons by filter */}

                {
                    filterInput != "" && loading && allpokemons?.map(pokemon => {
                        if (pokemon.name.includes(filterInput)) {
                            return (
                                <PokemonCard pokemon={pokemon} />
                    )}
                    })

                }

                {/* //  loading screen */}

                { !loading && <div id="loadingScreen"><img src="../../public/images/B6F.gif"/></div>}
              

            </div>
        </div>
    )
}