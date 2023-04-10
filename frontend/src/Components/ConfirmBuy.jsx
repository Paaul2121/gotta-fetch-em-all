import { useAtom } from "jotai";
import state from "./AtomStates"

export default function ConfirmBuy({setBuyPokemon, allpokemons, whatPokemon}) {

  const [playerPokemons, setPlayerPokemons] = useAtom(state.playerPokemons)

  const cancelBuy = (e) => {
    // e.target.parentElement.parentElement.style.visibility = "hidden";
      setBuyPokemon([false,-1])
    };
    
    const buyPokemon = (e) => {
      let momentan = [...playerPokemons];
      momentan.push(JSON.parse(whatPokemon.target.id))
      console.log(momentan)
       setPlayerPokemons([...momentan]);
       setBuyPokemon([false,{}])
       whatPokemon.target.nextSibling.firstChild.remove()
       whatPokemon.target.remove()

      // console.log("Esti prost ")
      // setPlayerPokemons((prev) => [...prev, JSON.parse(whatPokemon.target.id)])
    }

  return (
    <div className="confirmBuy">
      <h1>Are you sure you want to buy this pokemon?</h1>
      <div
        style={{
          display: "flex",
          justifyContent: "space-around",
          top: "50%",
          position: "relative",
        }}
      >
        <button onClick={cancelBuy}>NO</button>
        <button onClick={buyPokemon}>YES</button>
      </div>
    </div>
  );
};
