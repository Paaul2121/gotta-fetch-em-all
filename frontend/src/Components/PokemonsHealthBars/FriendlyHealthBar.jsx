export default function FriendlyHealthBar({friendlySelectedPokemon}) {
    return(
        <>
        <div id="friendlyHealthPoints">
            {friendlySelectedPokemon.stats[0].base_stat}
        <img id="friendlyHealthPointsImage" src="http://www.clker.com/cliparts/S/Y/6/s/E/e/blood-drop-md.png" />
        </div>
        <div id="friendlyPokemonHealth">
            <div id="friendlyShadowHP"></div>
            <div id="friendlyHealthRemained"></div>
        </div>
        </>
    )
}