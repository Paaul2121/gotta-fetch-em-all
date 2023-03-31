import {useAtom, atom } from "jotai"


const state = {
 selectedPokemons: atom([]),
 playerExperience: atom(40)
}

export default state;