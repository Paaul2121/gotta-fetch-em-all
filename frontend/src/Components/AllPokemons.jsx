import { useState, useEffect } from "react"
import PokemonCard from "./PokemonCard";




let SelectedPokemons = [];

export default function AllPokemons() {
    const [allpokemons, setAllPokemons] = useState(null)
    const [loading, setLoadig] = useState(false)
    const [filterInput, setFilterInput] = useState("")
    // const [counter, setCounter] = useState(1)
    // const [selectedPokemons, setSelectPokemons] = useState([])
    // const [maxSelectedPokemons, setMaxSelectedPokemons] = useState(0);


    // useEffect(() => {
    //     const loader = async () => {
    //         const req = await fetch(
    //             `https://pokeapi.co/api/v2/pokemon/${counter}`
    //         );
    //         if (req.ok) {
    //             const res = await req.json();
    //             setAllPokemons([...allpokemons, res]);
    //             setCounter(counter + 1);
    //         }
    //     };
    //     //649
    //     if (counter <= 20) {
    //         loader();
    //     }else{
    //         setLoadig(true)
    //     }
    // }, [counter]);

    useEffect(() => {
        let gatheringPokemons = [];

        for (let i = 1; i <30; i++) {
            fetch(`https://pokeapi.co/api/v2/pokemon/${i}`)
                .then(res => res.json())
                .then(res => gatheringPokemons.push(res))
        }

        setTimeout(() => {
        setAllPokemons(gatheringPokemons);
        console.log(gatheringPokemons);
        setLoadig(true)
        console.log(gatheringPokemons.length)
    }, 1000);
    }, [])

    

    const hideEvent = (e) => {
        document.getElementById("pokedexMenu").style.visibility = "hidden"
    }

    const filterInputEvent = (e) => {
        setFilterInput(e.target.value);
    }

    const pokemonCardEvent = (e) => {

        if (!e.target.nextSibling.classList.value.includes('selectedPokemon')) {

            if (SelectedPokemons.length < 3) {
                // e.target.nextSibling.classList.includes('selectedPokemon')
                // setSelectPokemons(prev => [...prev, JSON.parse(e.target.id)]);
                // setMaxSelectedPokemons(maxSelectedPokemons + 1);
                SelectedPokemons.push(JSON.parse(e.target.id));
                console.log(SelectedPokemons)
                console.log(e.target.nextSibling)
                e.target.nextSibling.classList.add("selectedPokemon")
                
            }

        } else {
            e.target.nextSibling.classList.remove("selectedPokemon")
            console.log(JSON.parse(e.target.id).name)
            SelectedPokemons = SelectedPokemons.filter( elem => elem.id != JSON.parse(e.target.id).id)
            console.log(SelectedPokemons)
            // setSelectPokemons((prev) => [...prev].filter(elem => elem.id != JSON.parse(e.target.id).id))
            // setMaxSelectedPokemons(maxSelectedPokemons - 1)
           
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
                    <PokemonCard key={index} pokemon={pokemon} pokemonCardEvent={pokemonCardEvent} SelectedPokemons={SelectedPokemons}/>
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
