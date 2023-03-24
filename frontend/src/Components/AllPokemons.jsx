import { useState, useEffect } from "react"
import PokemonCard from "./PokemonCard";


export default function AllPokemons() {
    const [allpokemons, setAllPokemons] = useState([])
    const [loading, setLoadig] = useState(false)
    const [counter, setCounter] = useState(1)
    const [filterInput, setFilterInput] = useState("")
    const [selectedPokemons, setSelectPokemons] = useState([])
    const [maxSelectedPokemons, setMaxSelectedPokemons] = useState(0);

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

    const pokemonCardEvent = (e) =>{
        { selectedPokemons.length == 3 && console.log(selectedPokemons);} 

        if(!e.target.nextSibling.classList.value.includes('selectedPokemon')){

            if(maxSelectedPokemons < 3){
                // e.target.nextSibling.classList.includes('selectedPokemon')
            setSelectPokemons( prev => [...prev,JSON.parse(e.target.id) ] );
            setMaxSelectedPokemons( maxSelectedPokemons + 1);
            console.log(e.target.nextSibling)
            e.target.nextSibling.classList.add("selectedPokemon")
            }
            
        }else{
            e.target.nextSibling.classList.remove("selectedPokemon")
            console.log(JSON.parse(e.target.id).name)
            setSelectPokemons((prev) => [...prev].filter( elem => elem.id != JSON.parse(e.target.id).id))
            console.log(selectedPokemons)
            setMaxSelectedPokemons( maxSelectedPokemons - 1)
        }
    }

    return (
        <div id="pokedexMenu">
            <div id="pokedexHeader">
                <button onClick={hideEvent} id="hideBtn">Hide</button>
                <div><label>Search for a Pokemon </label><input className="input" name="text" type="text" onInput={filterInputEvent} /></div>
            </div>


            <div id="pokedex">

            {filterInput == "" && loading && allpokemons?.map((pokemon,index) =>
                   <PokemonCard key={index} pokemon={pokemon} pokemonCardEvent={pokemonCardEvent} />
                )}
{/* 
                //loading pokemons by filter */}

                {
                    filterInput != "" && loading && allpokemons?.map((pokemon,index) => {
                        if (pokemon.name.includes(filterInput)) {
                            return (
                                <PokemonCard key={index} pokemon={pokemon} />
                    )}
                    })

                }

                {/* //  loading screen */}

                { !loading && <div id="loadingScreen"><img src="../../public/images/B6F.gif"/></div>}
              

            </div>
        </div>
    )
}