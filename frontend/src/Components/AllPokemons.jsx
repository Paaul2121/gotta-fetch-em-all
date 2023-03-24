import { useState, useEffect } from "react"


export default function AllPokemons() {
    const [allpokemons, setAllPokemons] = useState([])
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
        if (counter <= 50) {
            loader();
            console.log(allpokemons)
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
                <div><label>Search for a Pokemon </label><input onInput={filterInputEvent} /></div>
            </div>



            <div id="pokedex">

            {filterInput == "" && allpokemons?.map(pokemon =>
                    <div className="pokemonCard">
                        <p>{pokemon.id}</p>
                        <div className="imgHolder center"><img src={`${pokemon.sprites.other.dream_world.front_default}`} /></div>
                    </div>
                )}

                {
                    filterInput != "" && allpokemons?.map(pokemon => {
                        if (pokemon.name.includes(filterInput)) {
                            return (
                                <div className="pokemonCard">
                                    <p>{pokemon.id}</p>
                                    <div className="imgHolder center"><img src={`${pokemon.sprites.other.dream_world.front_default}`} /></div>
                                </div>)
                        }
                    })

                }
              

            </div>
        </div>
    )
}