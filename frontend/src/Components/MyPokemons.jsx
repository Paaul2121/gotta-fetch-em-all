export default function MyPokemons() {
    

    const hideTableEvent = () => {
        document.querySelector(".myPokemonsTable").style.visibility = "hidden";
    }



    return (
      <div className="pokedexMenu myPokemonsTable">
        <div className="pokedexHeader">
          <button onClick={hideTableEvent} id="hideBtn" className="hideMyPkm">
            Hide
          </button>
        </div>
        <div className="pokedex"></div>
      </div>
    );
}