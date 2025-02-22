"use client";

import { useState } from "react";

type User = {
  name: string;
  rank: number;
  hidden_mmr: number;
  email: string;
};

export default function UserMatches({ users }: { users: User[] }) {
  const [readyPlayers, setReadyPlayers] = useState<string[]>([]);
  const [score1, setScore1] = useState<number>(0);
  const [score2, setScore2] = useState<number>(0);

  const toggleReady = (email: string) => {
    setReadyPlayers((prev) => {
      if (prev.includes(email)) {
        return prev.filter((e) => e !== email); // Remove if already ready
      }
      if (prev.length < 2) {
        return [...prev, email]; // Add if under limit
      }
      return prev; // Ignore if already 2 ready
    });
  };
  function calculateEloWithMargin(
    ratingA: number,
    ratingB: number,
    scoreA: number,
    scoreB: number,
    kFactor: number = 32
  ): [number, number] {
    /**
     * Calculate the new Elo ratings for two players, adjusting for margin of victory.
     *
     * @param ratingA - Elo rating of Player A (winner)
     * @param ratingB - Elo rating of Player B (loser)
     * @param scoreA - Player A's score
     * @param scoreB - Player B's score
     * @param kFactor - K-factor, which determines how much the ratings change (default is 32)
     * @returns A tuple [newRatingA, newRatingB] with updated ratings
     */

    // Calculate expected score for Player A
    const expectedA = 1 / (1 + Math.pow(10, (ratingB - ratingA) / 400));

    // Adjusted score based on margin of victory
    const marginFactor = 1 - scoreB / scoreA;
    const adjustedScoreA = 1 - marginFactor; // Winner's effective score
    const adjustedScoreB = marginFactor; // Loser's effective score

    // Elo rating updates
    const newRatingA = ratingA + kFactor * (adjustedScoreA - expectedA);
    const newRatingB = ratingB + kFactor * (adjustedScoreB - (1 - expectedA));

    console.log(newRatingA, newRatingB)

    return [
      Math.round(newRatingA * 100) / 100,
      Math.round(newRatingB * 100) / 100,
    ];
  }

  const handlePlayMatch = () => {
    if (readyPlayers.length !== 2) {
      alert("You need exactly 2 players ready to start the match.");
      return;
    }

    const [player1, player2] = users.filter((user) =>
      readyPlayers.includes(user.email)
    );

    calculateEloWithMargin(player1.rank, player2.rank, score1, score2);
    setReadyPlayers([]); // Reset ready players after match
  };
  console.log(readyPlayers);

  return (
    <div>
      <div className="p-[40px] bg-slate-500 h-[100vh] overflow-auto border-1">
        {/* Score Inputs - Only show when exactly 2 players are ready */}
        <div className="flex gap-4">
        {/* {readyPlayers.length === 2 && ( */}
          <div className="flex justify-between p-4 bg-gray-700 text-white rounded w-[400px]">
            <h2 className="text-xl mb-2">Enter Scores</h2>
            <div className="flex gap-2">
              <input
                type="text"
                placeholder="Score for Player 1"
                value={score1 ?? ""}
                onChange={(e) => setScore1(Number(e.target.value))}
                className="p-2 border rounded text-black w-12"
              />
              <input
                type="text"
                placeholder="Score for Player 2"
                value={score2 ?? ""}
                onChange={(e) => setScore2(Number(e.target.value))}
                className="p-2 border rounded text-black w-12"
              />
            </div>
          </div>
        {/* )} */}

        {/* Play Match Button */}
        <button
          className="mt-4 p-3 bg-purple-500 text-white rounded disabled:opacity-50 h-[50px]"
          onClick={handlePlayMatch}
          disabled={
            readyPlayers.length !== 2 || score1 === null || score2 === null
          }
        >
          Play Match
        </button>
        </div>
        <div className="flex flex-wrap">
        {users &&
          users.map((user, idx) => {
            const { name, rank, hidden_mmr, email } = user;
            const isReady = readyPlayers.includes(email);

            return (
              <div
                key={idx}
                className={`w-[225px] border-2 p-2 m-2 ${isReady ? "bg-green-400" : ""}`}
              >
                <p>Name: {name}</p>
                <p>Rank: {rank}</p>
                <p>Hidden Rank: {hidden_mmr}</p>
                <p>Email: {email}</p>
                <button
                  className={`mt-2 px-4 py-2 rounded ${
                    isReady ? "bg-red-500" : "bg-blue-500"
                  } text-white`}
                  onClick={() => toggleReady(email)}
                >
                  {isReady ? "Not Ready" : "Ready"}
                </button>
              </div>
            );
          })}
        </div>

      </div>
    </div>
  );
}
