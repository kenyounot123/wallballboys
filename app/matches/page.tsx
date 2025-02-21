import MatchCard from "@/app/components/matches_card";
import Link from "next/link";
import { getMatches } from "./actions";
import { getUser, getUsers } from "../users/actions";
export default async function Matches() {
  const user = await getUser(1);
  const matchData = await getMatches(user.id);
  const users = await getUsers(matchData.map((match) => match.match_participants.map((participant) => participant.user_id)));

  return (
    <div className="w-[50%] mx-auto py-24">
      <div className="flex justify-between">
        <h2 className="text-2xl font-bold text-white">All matches</h2>
        <Link
          href="/matches/new"
          className="bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600 transition-colors"
        >
          Add match
        </Link>
      </div>
      {matchData && matchData.map((match) => (
        <MatchCard key={match.id} matchData={match} />
      ))}
    </div>
  );
}
