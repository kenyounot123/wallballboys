import { createClient } from "@/utils/supabase/server";
import type { Database } from "@/database.types";

// K-factor is the maximum possible rating change
// Scale factor determines how rating differences determine win probability (400 is standard)
const K_FACTOR = 32;
const DEFAULT_RATING = 1500;
const DEFAULT_HIDDEN_MMR = 0;
const SCALE_FACTOR = 400;
const SCORE_MULTIPLIER_THRESHOLD = 15;
const SCORE_MULTIPLIER_MAX = 1.2;

type Team = { 
  playerIds: number[];
  score: number;
}

export async function calculateRatingChanges({ team1, team2 }: { team1: Team, team2: Team }): Promise<{ team1: Record<number, number>, team2: Record<number, number> }> {
  const supabase = await createClient<Database>();
  
  // Fetch current ratings for all players
  const allPlayerIds = [...team1.playerIds, ...team2.playerIds];
  const { data: users } = await supabase
    .from('users')
    .select('id, rating, hidden_mmr')
    .in('id', allPlayerIds);

  const getPlayerRating = (id: number) => 
      users?.find(p => p.id === id)?.rating ?? DEFAULT_RATING;

  const getPlayerHiddenMmr = (id: number) => 
      users?.find(p => p.id === id)?.hidden_mmr ?? DEFAULT_HIDDEN_MMR;

  // Calculate score multiplier
  const scoreDifference = Math.abs(team1.score - team2.score);
  const scoreMultiplier = calculateScoreMultiplier(scoreDifference);

  // Calculate ratings
  const team1Rating = team1.playerIds.reduce((sum: number, id: number) => sum + getPlayerRating(id), 0) / team1.playerIds.length;
  const team2Rating = team2.playerIds.reduce((sum: number, id: number) => sum + getPlayerRating(id), 0) / team2.playerIds.length;

  // Calculate expected win probability
  const expectedScore = 1 / (1 + Math.pow(10, (team2Rating - team1Rating) / SCALE_FACTOR));
  let actualScore;
  if (team1.score > team2.score) {
    actualScore = 1;
  } else if (team1.score === team2.score) {
    actualScore = 0.5;
  } else {
    actualScore = 0;
  };

  const baseRatingChange = K_FACTOR * (actualScore - expectedScore);
  // Apply multiplier only to winning team's rating change
  const team1RatingChange = baseRatingChange * (baseRatingChange > 0 ? scoreMultiplier : 1);
  const team2RatingChange = -baseRatingChange * (baseRatingChange < 0 ? scoreMultiplier : 1);

  return {
    team1: Object.fromEntries(team1.playerIds.map(id => [id, team1RatingChange])),
    team2: Object.fromEntries(team2.playerIds.map(id => [id, team2RatingChange]))
  };
}

function calculateScoreMultiplier(scoreDifference: number) {
  if (scoreDifference > SCORE_MULTIPLIER_THRESHOLD) {
    return SCORE_MULTIPLIER_MAX;
  } else {
    return 1;
  }
}