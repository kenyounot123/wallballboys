import { getSession, signOut, signIn, getUsers } from "@/lib/actions";

export default async function Home() {
  const user = await getSession();
  // const sessionData = session.json()
  // const user = session?.user;
  // console.log("current session", user?.identities);
  const users = await getUsers()

  console.log(users)
  return (
    <div>
      <h1 className="text-4xl font-bold">Hello World</h1>
      {!user && (
        <form action={signIn}>
          <button
            type="submit"
            className="bg-blue-500 text-white px-4 py-2 rounded"
          >
            Sign In
          </button>
        </form>
      )}

      {user && (
        <div>
          <p>user data: {user.email}</p>
          <form action={signOut}>
            <button
              type="submit"
              className="bg-blue-500 text-white px-4 py-2 rounded"
            >
              Sign Out
            </button>
          </form>
        </div>
      )}
    </div>
  );
}
