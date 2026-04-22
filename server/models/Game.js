const mongoose = require("mongoose");

const gameSchema = new mongoose.Schema({
  player1: String,
  player2: String,
  rounds: [
    {
      p1Move: String,
      p2Move: String,
      winner: String
    }
  ],
  finalWinner: String,
  createdAt: {
    type: Date,
    default: Date.now
  }
});

module.exports = mongoose.model("Game", gameSchema);