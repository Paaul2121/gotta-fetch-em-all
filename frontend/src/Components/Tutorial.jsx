import { useState, useEffect } from "react"







export default function Tutorial() {
    const [nextPannelTutorial, setnextPannelTutorial]= useState(0)
    
   const nextPannelEvent = () => {
       setnextPannelTutorial(nextPannelTutorial + 1);
    }
    const skipper = () => {
      setnextPannelTutorial(nextPannelTutorial  +7);
    };



    return (
        <>
     {nextPannelTutorial<7 && <div className="tutorial">
            <img src="../public/images/LogoTutorial.png"></img>
        <div className="dialogueBox">
          <div className="textHolder">
                    {nextPannelTutorial == 0 && (
                        <>
                        <img className="tutorialPic" src="../public/images/pikaTutorial.png"></img>
                        <p className="tutorialText">WELCOME TRAVELER.</p>
                        </>
            )}
                    {nextPannelTutorial == 1 && (
                        <>
                        <img className="tutorialPic2" src="../public/images/pikaTutorial2.png"></img>
              <p className="tutorialText">Please follow the instructions.</p>
                            </>
            )}
                    {nextPannelTutorial == 2 && (
                        <>
                        <img className="tutorialPic2" src="../public/images/pikaTutorial2.png"></img>
              <p className="tutorialText">
                You can move your character using W A S D.
              </p>
                            </>
            )}
                    {nextPannelTutorial == 3 && (
                        <>
                        <img className="tutorialPic" src="../public/images/pikaTutorial.png"></img>
              <p className="tutorialText">
                To look arround you can use your mouse.
              </p>
                            </>
            )}
                    {nextPannelTutorial == 4 && (
                        <>
                        <img className="tutorialPic2" src="../public/images/pikaTutorial2.png"></img>
              <p className="tutorialText">
                To exit the camera mode you can press ESCAPE.
              </p>
                            </>
            )}
                    {nextPannelTutorial == 5 && (
                        <>
                        <img className="tutorialPic" src="../public/images/pikaTutorial.png"></img>
              <p className="tutorialText">
                To acess your pokedex go to the cabbin to the right.
              </p>
                            </>
            )}
                    {nextPannelTutorial == 6 && (
                        <>
                        <img className="tutorialPic2" src="../public/images/pikaTutorial2.png"></img>
              <p className="tutorialText">
                After you select yout first three pokemons you can go to the
                map.
              </p>
                            </>
            )}
                    {nextPannelTutorial == 7 && (
                        <>
                        <img className="tutorialPic" src="../public/images/pikaTutorial.png"></img>
              <p className="tutorialText">
                You can go to a location and start a fight.
              </p>
                            </>
                        )}
                        
                    </div>
                    <button id="skipButton" onClick={skipper}> SKIP</button>
          <img className="nextEvent" src="../public/images/nextButton.png" onClick={nextPannelEvent}></img>
        </div>
      </div>}
        </>
    );
}
