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

        if (counter <= 649) {
            loader();
        }
    }, [counter]);

    return (
        <div>
           {allpokemons?.map( pokemon =>
             <div>
                <p>{ pokemon.id}</p>
                <img src={`${pokemon.sprites.other.dream_world.front_default}`} />
           </div>
           )}
        </div>
    )
}