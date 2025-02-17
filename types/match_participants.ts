import { Tables, TablesInsert } from "../database.types";

export type MatchParticipant = Tables<"match_participants">;
export type InsertMatchParticipant = TablesInsert<"match_participants">;
