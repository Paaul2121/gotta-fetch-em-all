import { useState, useEffect } from "react"


export default function AllPokemons() {
    const [allpokemons, setAllPokemons] = useState([])
    const [counter, setCounter] = useState(1)

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
        if (counter <= 20) {
            loader();
        }
    }, [counter]);

    const hideEvent = (e) => {
        document.getElementById("pokedexMenu").style.visibility = "hidden"
    }

    return (
        <div id="pokedexMenu">
            <div id="pokedexHeader">
                <button onClick={hideEvent} id="hideBtn">Hide</button>
                <div><label>Search for a Pokemon </label><input /></div>
            </div>

            <div id="pokedex">
                {allpokemons?.map(pokemon =>
                    <div className="pokemonCard">
                        <p>{pokemon.id}</p>
                        <div className="imgHolder center"><img src={`${pokemon.sprites.other.dream_world.front_default}`} /></div>
                    </div>
                )}

            </div>
        </div>
    )
}