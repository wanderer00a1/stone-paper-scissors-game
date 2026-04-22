import { useState } from "react";
import axios from "axios";

const moves = ["stone", "paper", "scissors"];

const getWinner = (p1, p2) => {
  if (p1 === p2) return "tie";
  if (
    (p1 === "stone" && p2 === "scissors") ||
    (p1 === "scissors" && p2 === "paper") ||
    (p1 === "paper" && p2 === "stone")
  )
    return "player1";
  return "player2";
};

export default function Game() {
  const [p1Draft, setP1Draft] = useState("");
  const [p2Draft, setP2Draft] = useState("");
  const [player1, setPlayer1] = useState("");
  const [player2, setPlayer2] = useState("");
  const [rounds, setRounds] = useState([]);
  const [currentRound, setCurrentRound] = useState(1);
  const [p1Move, setP1Move] = useState("");
  const [p2Move, setP2Move] = useState("");
  const [finished, setFinished] = useState(false);

  const handleStartGame = () => {
    if (p1Draft.trim() && p2Draft.trim()) {
      setPlayer1(p1Draft.trim());
      setPlayer2(p2Draft.trim());
    }
  };

  const handlePlay = () => {
    const winner = getWinner(p1Move, p2Move);
    const newRounds = [...rounds, { p1Move, p2Move, winner }];
    setRounds(newRounds);
    setP1Move("");
    setP2Move("");
    if (currentRound === 6) {
      setFinished(true);
      saveGame(newRounds);
    } else {
      setCurrentRound(currentRound + 1);
    }
  };

  const saveGame = async (roundsData) => {
    let p1Score = roundsData.filter((r) => r.winner === "player1").length;
    let p2Score = roundsData.filter((r) => r.winner === "player2").length;
    let finalWinner = "tie";
    if (p1Score > p2Score) finalWinner = player1;
    else if (p2Score > p1Score) finalWinner = player2;
    await axios.post("http://13.60.224.178:5000/api/games", {
      player1,
      player2,
      rounds: roundsData,
      finalWinner,
    });
  };

  return (
    <div>
      <h2>Stone Paper Scissors</h2>
      {!player1 ? (
        <>
          <input
            placeholder="Player 1"
            value={p1Draft}
            onChange={(e) => setP1Draft(e.target.value)}
          />
          <input
            placeholder="Player 2"
            value={p2Draft}
            onChange={(e) => setP2Draft(e.target.value)}
          />
          <button onClick={handleStartGame}>Start Game</button>
        </>
      ) : (
        <>
          <h3>Round {currentRound}/6</h3>
          <select value={p1Move} onChange={(e) => setP1Move(e.target.value)}>
            <option value="">P1 Move</option>
            {moves.map((m) => (
              <option key={m}>{m}</option>
            ))}
          </select>
          <select value={p2Move} onChange={(e) => setP2Move(e.target.value)}>
            <option value="">P2 Move</option>
            {moves.map((m) => (
              <option key={m}>{m}</option>
            ))}
          </select>
          <button onClick={handlePlay}>Play</button>
          {rounds.map((r, i) => (
            <p key={i}>
              Round {i + 1}: {r.p1Move} vs {r.p2Move} → {r.winner}
            </p>
          ))}
          {finished && <h2>Game Finished</h2>}
        </>
      )}
    </div>
  );
}
