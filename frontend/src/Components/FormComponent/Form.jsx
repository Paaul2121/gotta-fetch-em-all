import "./Form.css";
import { useAtom } from "jotai";
import state from "../AtomStates";
export default function Form({ setShowForm }) {
  const [playerExperience, setPlayerExperience] = useAtom(state.playerExperience);
  const [playerMoney, setPlayerMoney] = useAtom(state.playerMoney);
  const [playerPokemons, setplayerPokemons] = useAtom(state.playerPokemons);
const [playerUsername, setPlayerUsername] = useAtom(state.playerUsername);
  const onLogin = (e) => {
    e.preventDefault();

    const formData = new FormData(e.target);
    const entries = [...formData.entries()];

    const player = entries.reduce((acc, entry) => {
      const [k, v] = entry;
      acc[k] = v;
      return acc;
    }, {});

    return fetch("http://localhost:3001/login", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(player),
    })
      .then((res) => res.json())
      .then((res) => {
          res.response == "case1"
              ? (alert("You need to complete both imputs."),
                  document
                      .querySelector("#passwordLogin")
                      .setAttribute("placeholder", "Please enter your Password!"),
                  document
                      .querySelector("#passwordLogin")
                      .classList.add("passwordLogin"),
                  document
                      .querySelector("#usernameLogin")
                      .setAttribute("placeholder", "Please enter your Username!"),
                  document
                      .querySelector("#usernameLogin")
                      .classList.add("usernameLogin"))
              : res.response == "case2"
                  ? alert("Username not found.")
                  : res.response == "case3"
                      ? alert("Wrong password.")
                      : (
                          setPlayerUsername(res.username),
                          setShowForm(false),
                          setPlayerExperience(res.playerExperience),
                          setPlayerMoney(res.playerMoney),
                          setplayerPokemons(res.playerPokemons)
          );
      });

  };

  const onSubmit = (e) => {
    e.preventDefault();
    const formData = new FormData(e.target);
    const entries = [...formData];

    const player = entries.reduce((acc, entry) => {
      const [k, v] = entry;
      acc[k] = v;
      return acc;
    }, {});
    player.playerMoney = playerMoney;
    player.playerExperience = playerExperience;
    player.playerPokemons = playerPokemons;

    console.log(player);
    return fetch("http://localhost:3001/signup", {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify(player),
    }).then((res) =>  window.location.reload());
   
  };

  return (
    <div className="principalContainer">
      <div className="blackScreen">
        <div className="container">
          <input id="register_toggle" type="checkbox" />
          <div className="slider">
            <form className="form" onSubmit={onLogin}>
              <span className="title">Login</span>
              <div className="form_control">
                <input
                  required=""
                  className="input"
                  type="text"
                  name="username"
                  id="usernameLogin"
                  placeholder="Username..."
                />
                <label className="label" htmlFor="username">
                  Username
                </label>
              </div>
              <div className="form_control">
                <input
                  required=""
                  className="input"
                  type="password"
                  name="password"
                  id="passwordLogin"
                  placeholder="Password..."
                />
                <label className="label" htmlFor="password">
                  Password
                </label>
              </div>
              <button type="submit" id="loginSubmitt">
                Login
              </button>

              <span className="bottom_text">
                Don't have an account?{" "}
                <label className="swtich" htmlFor="register_toggle">
                  Sign Up
                </label>{" "}
              </span>
            </form>
            <form className="form" onSubmit={onSubmit}>
              <span className="title">Sign Up</span>
              <div className="form_control">
                <input
                  required=""
                  className="input"
                  type="text"
                  name="username"
                  id="username"
                  placeholder="Username..."
                />
                <label className="label" htmlFor="username">
                  Username
                </label>
              </div>
              <div className="form_control">
                <input
                  required=""
                  className="input"
                  type="email"
                  name="email"
                  id="email"
                  placeholder="Email..."
                />
                <label className="label" htmlFor="email">
                  Email
                </label>
              </div>
              <div className="form_control">
                <input
                  required=""
                  className="input"
                  type="password"
                  name="password"
                  id="password"
                  placeholder="Password..."
                />
                <label className="label" htmlFor="password">
                  Password
                </label>
              </div>
              <button>Sign Up</button>

              <span className="bottom_text">
                Already have an account?{" "}
                <label className="swtich" htmlFor="register_toggle">
                  Sign In
                </label>{" "}
              </span>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}
