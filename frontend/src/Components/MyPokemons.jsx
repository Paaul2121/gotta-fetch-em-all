import { useAtom } from "jotai";
import state from "./AtomStates"
import PokemonCard from "./PokemonCard";

let SelectedPokemons = [];
export default function MyPokemons() {
    const [playerPokemons, setPlayerPokemons] = useAtom(state.playerPokemons);
    const [selectedPokemons, setSelectedPokemons] = useAtom(
      state.selectedPokemons
    );
    
    const hideTableEvent = () => {
        document.querySelector(".myPokemonsTable").style.visibility = "hidden";
        setSelectedPokemons(SelectedPokemons);
    }
 const myPokemonCardEvent = (e) => {
   if (!e.target.nextSibling.classList.value.includes("selectedPokemon")) {
     if (SelectedPokemons.length < 3) {
       SelectedPokemons.push(JSON.parse(e.target.id));
       e.target.nextSibling.classList.add("selectedPokemon");
     }
   } else {
     SelectedPokemons = SelectedPokemons.filter(
       (elem) => elem.id != JSON.parse(e.target.id).id
     );
     e.target.nextSibling.classList.remove("selectedPokemon");
   }
 };


    return (
      <div className="pokedexMenu myPokemonsTable">
        <div className="pokedexHeader">
          <button onClick={hideTableEvent} id="hideBtn" className="hideMyPkm">
            Hide
          </button>
        </div>
            <div className="pokedex">
                {playerPokemons.length >= 3 && [...playerPokemons.map((pokemon,index) => 
                    <PokemonCard key={index} pokemon={pokemon} myPokemonCardEvent={myPokemonCardEvent} SelectedPokemons={SelectedPokemons} forMyPokemons={false} />
                    )]}

        </div>
      </div>
    );
}