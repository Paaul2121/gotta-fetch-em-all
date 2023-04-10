export default function MyPokemons(){
    return (
      <div id="pokedexMenu">
        <div id="pokedexHeader">
          <button onClick={hideEvent} id="hideBtn">
            Hide
          </button>
        </div>

        <div id="pokedex"></div>
      </div>
    );
}