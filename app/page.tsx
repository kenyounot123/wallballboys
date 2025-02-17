import MatchesForm from "./components/matches_form";

export default async function Home() {
  return (
    <div>
      <h1>Wallball Boys</h1>
      <div className="p-4 border-b">
        <MatchesForm />
      </div>
    </div>
  );
}
