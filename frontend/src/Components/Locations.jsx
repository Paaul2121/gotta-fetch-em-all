import {useAtom} from "jotai"
import state from "./AtomStates"
import {useState} from "react"

export default function Locations(props) {
    let locationArr = props.location.name.split("-");
    let locationFirstName = locationArr[0].slice(0,1).toUpperCase() + locationArr[0].slice(1);
    let locationSecondName = locationArr[1].slice(0,1).toUpperCase() + locationArr[1].slice(1);
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
           {selectedPokemons &&  <button className="locBtn mapButton mapButtons" onClick={ selectedPokemons.length != 0 ? props.locationHandler : warningEvent} id={"loc-" + props.id}>
            {locationFirstName + "-" + locationSecondName}  
            </button>}
            
           { warningVisible && <div className="warningMissingPokemon"><p>!!! SELECT A POKEMON BEFORE ENTERING A BATTLE !!!</p></div>}
        </div>
        )
    }


