const router = require("express").Router();
const Game = require("../models/game");

// save game
router.post("/", async (req, res) => {
  const game = new Game(req.body);
  await game.save();
  res.json(game);
});

// get all games
router.get("/", async (req, res) => {
  const games = await Game.find().sort({ createdAt: -1 }); // to have most recent game at top
  res.json(games);
});

module.exports = router;
