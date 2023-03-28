export default function FriendlyPokemonCard({pokemon, FriendlyPokemonCardEvent}) {
    return(
        <div  className="friendlyPokemonCard">

  <div className="content">
          <div onClick={FriendlyPokemonCardEvent} className='cardEventTaker' id={JSON.stringify(pokemon)}></div>  
    <div className="back" >
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
          {pokemon.stats[0].stat.name.slice(0,1).toUpperCase() + pokemon.stats[0].stat.name.slice(1)}
          <img id="friendlyHealthPhoto" src="https://cdn2.iconfinder.com/data/icons/game-1-2/512/Healing_potion_2-512.png" />
          <div className="friendlyRightStats">{pokemon.stats[0].base_stat} p</div>
        </div>
        <div className="stats">
          {pokemon.stats[1].stat.name.slice(0,1).toUpperCase() + pokemon.stats[1].stat.name.slice(1)}
          <img id="friendlyAttackPhoto" src="https://cdn3.iconfinder.com/data/icons/role-playing-game-5/340/ability_skill_swords_game_attack_knight-512.png" />
          <div className="friendlyRightStats">{pokemon.stats[1].base_stat} p</div>
        </div>
        <div className="stats">
          {pokemon.stats[2].stat.name.slice(0,1).toUpperCase() + pokemon.stats[2].stat.name.slice(1)}
          <img id="friendlyDefensePhoto" src="https://cdn4.iconfinder.com/data/icons/game-ui-2-flat-filled-line/64/shield_defense_security_game_safety_protection-512.png" />
          <div className="friendlyRightStats">{pokemon.stats[2].base_stat} p</div>
        </div>
        <div className="stats">
          {pokemon.stats[5].stat.name.slice(0,1).toUpperCase() + pokemon.stats[5].stat.name.slice(1)}
          <img id="friendlySpeedPhoto" src="https://cdn0.iconfinder.com/data/icons/crime-and-protection-icons/110/Lightning-512.png" />
          <div className="friendlyRightStats">{pokemon.stats[5].base_stat} p</div>
        </div>
      </div>
    </div>
  </div>
</div>
    )
}