export default function FriendlyHealthBar({enemyPokemon}) {
    return(
        <>
        <div id="enemyHealthPoints">
        {enemyPokemon.stats[0].base_stat} 
        <img id="friendlyHealthPointsImage" src="http://www.clker.com/cliparts/S/Y/6/s/E/e/blood-drop-md.png" />
        </div>
        <div id="enemyPokemonHealth">
            <div id="enemyShadowHP"></div>
            <div id="enemyHealthRemained"></div>
        </div>
        </>
    )
}