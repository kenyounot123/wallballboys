import { getUser } from "./actions";

export default async function Users() {
  const user = await getUser(1);
  return (
    <div className="text-white">
      <div>{JSON.stringify(user)}</div>
    </div>
  );
}
