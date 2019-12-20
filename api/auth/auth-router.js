const router = require("express").Router();
const bcrypt = require("bcryptjs");

const { signToken } = require("./auth-middleware.js");
const Users = require("../users/users-model.js");

router.post("/register", (req, res) => {
  // implement registration
  const newUser = req.body;
  const { username, password } = req.body;
  const hash = bcrypt.hashSync(newUser.password, 12);
  newUser.password = hash;
  
  if (!username || !password) {
    res.status(400).json({ message: "Please add an Username and Password" });
  } else {
    Users.addUser(newUser)
      .then(user => {
        res.status(201).json(user);
      })
      .catch(err => {
        console.log(err);
        res
          .status(500)
          .json({ message: "Server was unable to create new User" });
      });
  }
});

router.post("/login", (req, res) => {
  const { username, password } = req.body;
  // implement login
  Users.findUserBy({ username })
    .first()
    .then(user => {
      if (user && bcrypt.compareSync(password, user.password)) {
        const token = signToken(user);

        res
          .status(200)
          .json({ token, message: `Welcome ${user.username} to Dad Jokes` });
      } else {
        res.status(401).json({ message: "Invalid credentials" });
      }
    })
    .catch(err => {
      console.log(err);
      res.status(500).json({ message: "Server was unable to log you in" });
    });
});

module.exports = router;
