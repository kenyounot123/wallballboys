import { Database, Tables, TablesInsert } from "../database.types";

// Use the generated type from your Supabase database
export type Match = Tables<"matches">;
export type InsertMatch = TablesInsert<"matches">;
export type MatchScore = {
  team1: number;
  team2: number;
};
