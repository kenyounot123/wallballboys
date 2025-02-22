import UserMatches from "../components/usermatches";
import { getAllUsers } from "./actions";

export default async function TestPlayers() {
  const users = await getAllUsers();

  return (
    <div>
      <UserMatches users={users} />
    </div>
  );
}
