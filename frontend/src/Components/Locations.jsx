import {useAtom} from "jotai"
import state from "./AtomStates"
import {useState} from "react"

export default function Locations(props) {
    const [selectedPokemons, setSelectedPokemons] = useAtom(state.selectedPokemons)
    const [warningVisible, setWarningVisible] = useState(false);

    const warningEvent = () =>{
        setWarningVisible(true);
        setTimeout( () =>{
            setWarningVisible(false);
        }, 2000)
    }
    
    return (
        <div>
           {selectedPokemons &&  <button className="locBtn mapButton" onClick={ selectedPokemons.length != 0 ? props.locationHandler : warningEvent} id={"loc-" + props.id}>{props.location.name}</button>}
           { warningVisible && <div className="warningMissingPokemon"><p>!!! SELECT A POKEMON BEFORE ENTERING A BATTLE !!!</p></div>}
        </div>
        )
    }


