import { useAtom, atom } from "jotai"
let first3pokemon = [];
let signedUp = false;
if (!signedUp) {
  signedUp = true;
  fetch("https://pokeapi.co/api/v2/pokemon/pikachu")
    .then(response => response.json())
    .then(data => { first3pokemon.push(data) });
  fetch("https://pokeapi.co/api/v2/pokemon/meowth")
    .then((response) => response.json())
    .then((data) => {
      first3pokemon.push(data);
    });
  fetch("https://pokeapi.co/api/v2/pokemon/clefairy")
    .then((response) => response.json())
    .then((data) => {
      first3pokemon.push(data);
    });
}
const state = {
  selectedPokemons: atom([]),
  playerExperience: atom(40),
  playerMoney: atom(0),
  playerPokemons: atom(first3pokemon),
  playerUsername: atom("")
}


export default state;