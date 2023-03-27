import { useState } from "react";

export default function PokemonCard({pokemon, pokemonCardEvent, SelectedPokemons}) {

    return(
        <div  className="card">

  <div className="content">
          <div onClick={pokemonCardEvent} className='cardEventTaker' id={JSON.stringify(pokemon)}></div>  
    <div className={`back ${[...SelectedPokemons].reduce((acc,cur) => cur.name == pokemon.name? true: acc, false) ? "selectedPokemon": ""}`} >
    {/* ${[...SelectedPokemons].reduce((acc,cur) => cur.name == pokemon.name? true: acc, false) ? "selectedPokemon": ""} */}

      {/* event Taker */}
  {/* <div className='cardEventTaker' id={JSON.stringify(pokemon)}></div>   */}
      <div className="back-content">


        <svg stroke="#ffffff" xmlnsXlink="http://www.w3.org/1999/xlink" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 50 50" height="50px" width="50px" fill="#ffffff">
        <g strokeWidth="0" id="SVGRepo_bgCarrier"></g>
        <g strokeLinejoin="round" strokeLinecap="round" id="SVGRepo_tracerCarrier"></g>
        <g id="SVGRepo_iconCarrier">
        </g>
        </svg>
        <p className="pokemonName"> {pokemon && pokemon.name[0].toUpperCase()+pokemon.name.slice(1)} </p>
        <img className="pokemonImage" src= {pokemon && `${pokemon.sprites.other.home.front_default}` }/>
      </div>
    </div>
    <div className="front">
      
 {/* event Taker */}
 {/* <div onClick={pokemonCardEvent} className='cardEventTaker' id={JSON.stringify(pokemon)}></div>   */}

      <div className="img">
        <div className="circle">
          <img id="firstCircle" src="https://freepngimg.com/thumb/pokemon/20708-7-pokeball-hd.png" />
        </div>
        <div className="circle" id="right">
          <img id="secondCircle" src="https://freepngimg.com/thumb/pokemon/20708-7-pokeball-hd.png" />
        </div>
        <div className="circle" id="bottom">
          <img id="thirdCircle" src="https://freepngimg.com/thumb/pokemon/20708-7-pokeball-hd.png" />
        </div>
      </div>

      <div className="front-content">
        <div className="stats">
          {pokemon.stats[0].stat.name.slice(0,1).toUpperCase() + pokemon.stats[0].stat.name.slice(1)}:
          <div className="rightStats">{pokemon.stats[0].base_stat} p</div>
        </div>
        <div className="stats">{pokemon.stats[1].stat.name.slice(0,1).toUpperCase() + pokemon.stats[1].stat.name.slice(1)}:
          <div className="rightStats">{pokemon.stats[1].base_stat} p</div>
        </div>
        <div className="stats">{pokemon.stats[2].stat.name.slice(0,1).toUpperCase() + pokemon.stats[2].stat.name.slice(1)}:
          <div className="rightStats">{pokemon.stats[2].base_stat} p</div>
        </div>
        <div className="stats">{pokemon.stats[3].stat.name.slice(0,1).toUpperCase() + pokemon.stats[3].stat.name.slice(1)}:
          <div className="rightStats">{pokemon.stats[3].base_stat} p</div>
        </div>
        <div className="stats">{pokemon.stats[4].stat.name.slice(0,1).toUpperCase() + pokemon.stats[4].stat.name.slice(1)}:
          <div className="rightStats">{pokemon.stats[4].base_stat} p</div>
        </div>
        <div className="stats">{pokemon.stats[5].stat.name.slice(0,1).toUpperCase() + pokemon.stats[5].stat.name.slice(1)}:
          <div className="rightStats">{pokemon.stats[5].base_stat} p</div>
        </div>
      </div>
    </div>
  </div>
</div>
    )
}