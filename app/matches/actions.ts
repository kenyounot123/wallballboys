"use server";
import { createClient } from "@/utils/supabase/server";
import type { Database } from "@/database.types";
import type { InsertMatch } from "@/types/matches";
import type { InsertMatchParticipant } from "@/types/match_participants";
export async function createMatch(formData: FormData) {
  const supabase = await createClient<Database>();
  // const team1PlayerIds = formData.getAll("team1[]").map((p) => parseInt(p.toString()));
  // const team2PlayerIds = formData.getAll("team2[]").map((p) => parseInt(p.toString()));
  // const score1 = formData.get("score1")?.toString();
  // const score2 = formData.get("score2")?.toString();

  // TODO: remove this
  const team1PlayerIds = [1, 47]
  const team2PlayerIds = [48, 49]
  const score1 = 10
  const score2 = 20
  
  const matchType = determineMatchType(team1PlayerIds, team2PlayerIds);

  if (
    team1PlayerIds.length === 0 ||
    team2PlayerIds.length === 0 ||
    !score1 ||
    !score2
  ) {
    throw new Error("Missing required fields");
  }

  const match = {
    status: "invalidated",
    score: { team1: score1, team2: score2 },
    match_type: matchType,
  } as InsertMatch;

  try {
    const { data: matchData, error: matchError } = await supabase
      .from("matches")
      .insert(match)
      .select("id")
      .single();

    if (matchError) throw matchError;
    const matchId = matchData.id;

    console.log("Match created:", matchData);

    const participants = [
      ...team1PlayerIds.map(userId => ({ match_id: matchId, user_id: userId, team: 1 })),
      ...team2PlayerIds.map(userId => ({ match_id: matchId, user_id: userId, team: 2 })),
    ] as InsertMatchParticipant[];

    const { data, error } = await supabase
      .from("match_participants")
      .insert(participants)
      .select();

    if (error) throw error;
    console.log("Participants created:", data);
  } catch (error) {
    console.error("Error during match creation:", error);
    throw error;
  }
}

const determineMatchType = (team1PlayerIds: number[], team2PlayerIds: number[]) => {
  if (team1PlayerIds.length === 2 && team2PlayerIds.length === 2) {
    return "Doubles";
  }
  return "Singles";
}
