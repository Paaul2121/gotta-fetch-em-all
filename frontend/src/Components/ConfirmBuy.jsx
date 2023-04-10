export default function ConfirmBuy({setBuyPokemon}) {
    
  const cancelBuy = (e) => {
    // e.target.parentElement.parentElement.style.visibility = "hidden";
      setBuyPokemon([false,-1])
    };
    
    const buyPokemon = (e) => {
        console.log()
    }

  return (
    <div className="confirmBuy">
      <h1>Are you sure you want to buy this pokemon?</h1>
      <div
        style={{
          display: "flex",
          justifyContent: "space-around",
          top: "50%",
          position: "relative",
        }}
      >
        <button onClick={cancelBuy}>NO</button>
        <button onClick={buyPokemon}>YES</button>
      </div>
    </div>
  );
};
