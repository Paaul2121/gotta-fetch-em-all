import { useAtom } from "jotai";
import state from "./AtomStates"

export default function ConfirmBuy({setBuyPokemon,choosenPokemonCard}) {

  const [playerPokemons, setPlayerPokemons] = useAtom(state.playerPokemons)
  const [playerMoney, setPlayerMoney] = useAtom(state.playerMoney)
  const currentPokemon = JSON.parse(choosenPokemonCard.target.id)
  const [playerUsername, setPlayerUsername] = useAtom(state.playerUsername);
  const[playerExperience, setPlayerExperience] = useAtom(state.playerExperience)
  

  const cancelBuy = () => {
      setBuyPokemon([false,-1])
    };
    
    const buyPokemon = (e) => {
      if (playerMoney >= currentPokemon.base_experience) {

        let pokemonArrayForUpdate = [...playerPokemons];
        pokemonArrayForUpdate.push(currentPokemon)
        let moneyForUpdate = playerMoney - currentPokemon.base_experience

      setPlayerPokemons((prev) => [...prev,currentPokemon])
       setBuyPokemon([false,{}])
      //  choosenPokemonCard.target.nextSibling.firstChild.remove()
      //  choosenPokemonCard.target.remove()
        setPlayerMoney(playerMoney - currentPokemon.base_experience)


        return fetch("http://localhost:3001/update", {
          method: "PATCH",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            username: playerUsername,
            playerExeperience: playerExperience,
            playerPokemons: pokemonArrayForUpdate,
            playerMoney: moneyForUpdate
          }),
        })
          .then((res) => res.json())
        
        
      }else{
       e.target.parentElement.parentElement.querySelector(".notEnoughMoney").style.visibility = "visible"
      }
    }

  return (
    <div className="confirmBuy">
      <h1>Are you sure you want to buy this pokemon?</h1>
      <h1 className="notEnoughMoney" style={{visibility:"hidden"}}>You need another {currentPokemon.base_experience - playerMoney} coins</h1>
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
