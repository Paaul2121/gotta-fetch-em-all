const express = require("express");
const mongoose = require("mongoose");
const app = express();
const UserM = require("./Models/UserM");
require("dotenv").config();
const { MONGO_URL } = process.env;
if (!MONGO_URL) {
    console.error("CHEY ERROR")
    process.exit(1);
 }



const cors = require("cors");
const PORT = 3001;
app.use(cors())
app.use(express.json({ limit: "25mb" }));
app.use(express.urlencoded({ limit: "25mb" }));



const main = async () => {
    await mongoose.connect(MONGO_URL);

    app.listen(PORT, () => {
      console.log("App is listening on 3001");
      console.log(`http://localhost:3001/`);
    });

}
app.post("/login", async (req, res) => {
    const Users = await UserM.findOne({ username: `${req.body.username}` }).exec();
    const username = req.body.username;
    const password = req.body.password;
    console.log(Users);
    // if (Users != null) {
    //     res.json(Users);
    // } else {
    //     res.json(
    //         {
    //             ok: false
    //         }
    //     )
    
    // }
    // if (Users.password === req.body.password) {
    //     res.json("go")
    // } else {
        
    //     res.json("wrong password");
    // }
    
        (username == "" || password == "") ? res.json({ response: "case1" }) :
            Users ==null ? res.json({ response: "case2" }) :
                Users.password !== password ? res.json({ response: "case3" }) : null
    

    

    


})
 

app.post("/signup", (req, res) => {
  const username = req.body.username;
  const email = req.body.email;
  const password = req.body.password;
  const createdAt = Date.now();
  const playerPokemons = req.body.playerPokemons;
  const playerExperience = req.body.playerExperience;
  const playerMoney = req.body.playerMoney;
  const user = new UserM({
    username,
    email,
    password,
    createdAt,
    playerPokemons,
    playerMoney,
    playerExperience,
  });
  user
    .save()
    .then((user) => res.json(user))
    .catch((err) => res.status(400).json({ succes: false }));
});



main().catch(err => {
    console.error(err)
    process.exit(1);
})