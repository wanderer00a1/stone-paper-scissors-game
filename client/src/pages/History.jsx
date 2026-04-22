import { useEffect, useState } from "react";
import axios from "axios";

export default function History() {
  const [games, setGames] = useState([]);

  useEffect(() => {
    axios
      .get("http://13.60.224.178:5000/api/games")
      .then((res) => setGames(res.data))
      .catch((err) => console.log(err));
  }, []);

  return (
    <div>
      <h2>Game History</h2>

      {games.map((g, i) => (
        <div key={i}>
          <h4>
            {g.player1} vs {g.player2}
          </h4>
          <p>Winner: {g.finalWinner}</p>
        </div>
      ))}
    </div>
  );
}
