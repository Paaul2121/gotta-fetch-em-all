import {useAtom, atom } from "jotai"


const state = {
 selectedPokemons: atom([]),
    playerExperience: atom(40),
 playerMoney: atom(0),
 playerPokemons: atom(null)
}

export default state;