import { useState } from "react";

export default function PokemonCard({pokemon, pokemonCardEvent}) {

    return(
        <div  className="card">

  <div className="content">
          <div onClick={pokemonCardEvent} className='cardEventTaker' id={JSON.stringify(pokemon)}></div>  
    <div className="back">

      {/* event Taker */}
  {/* <div className='cardEventTaker' id={JSON.stringify(pokemon)}></div>   */}
      <div className="back-content">


        <svg stroke="#ffffff" xmlnsXlink="http://www.w3.org/1999/xlink" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 50 50" height="50px" width="50px" fill="#ffffff">
        <g strokeWidth="0" id="SVGRepo_bgCarrier"></g>
        <g strokeLinejoin="round" strokeLinecap="round" id="SVGRepo_tracerCarrier"></g>
        <g id="SVGRepo_iconCarrier">
        </g>
        </svg>
        <p className="pokemonName"> {pokemon && pokemon.name} </p>
        <img className="pokemonImage" src= {pokemon && `${pokemon.sprites.other.home.front_default}` }/>
      </div>
    </div>
    <div className="front">
      
 {/* event Taker */}
 {/* <div onClick={pokemonCardEvent} className='cardEventTaker' id={JSON.stringify(pokemon)}></div>   */}

      <div className="img">
        <div className="circle">
        </div>
        <div className="circle" id="right">
        </div>
        <div className="circle" id="bottom">
        </div>
      </div>

      <div className="front-content">
        <small className="badge">Pasta</small>
        <div className="description">
          <div className="title">
            <p className="title">
              <strong>Spaguetti Bolognese</strong>
            </p>
            <svg fillRule="nonzero" height="15px" width="15px" viewBox="0,0,256,256" xmlnsXlink="http://www.w3.org/1999/xlink" xmlns="http://www.w3.org/2000/svg"><g textAnchor="none" fontSize="none" fontWeight="none" fontFamily="none" strokeDashoffset="0" strokeDasharray="" strokeMiterlimit="10" strokeLinejoin="miter" strokeLinecap="butt" strokeWidth="1" stroke="none" fillRule="nonzero" fill="#20c997"><g transform="scale(8,8)"><path d="M25,27l-9,-6.75l-9,6.75v-23h18z"></path></g></g></svg>
          </div>
          <p className="card-footer">
            30 Mins &nbsp; | &nbsp; 1 Serving
          </p>
        </div>
      </div>
    </div>
  </div>
</div>
    )
}