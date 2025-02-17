import { ChevronDown, User, PlusCircle } from "lucide-react";
import { createMatch } from "@/app/matches/actions";

export default function MatchForm() {
  return (
    <form action={createMatch} className="min-h-screen p-4">
      <div className="max-w-4xl mx-auto">
        {/* Header */}
        <div className="flex justify-between items-center mb-4">
          <h1 className="text-2xl font-bold text-white">Add Matches</h1>
        </div>

        {/* Match Form Card */}
        <div className="bg-white rounded-lg p-6">
          <div className="flex justify-between items-center mb-6">
            <h2 className="text-xl font-semibold">Match 1</h2>
            <ChevronDown className="h-5 w-5 text-gray-400" />
          </div>

          {/* Team 1 */}
          <div className="mb-6">
            <label className="block text-sm font-medium mb-2">Team 1</label>
            <div className="relative mb-2">
              <User className="absolute left-3 top-2.5 h-5 w-5 text-gray-400" />
              <input
                type="text"
                placeholder="Search Player"
                className="w-full pl-10 pr-4 py-2 rounded-md border bg-gray-50"
              />
            </div>
            <div className="relative">
              <User className="absolute left-3 top-2.5 h-5 w-5 text-gray-400" />
              <input
                type="text"
                placeholder="Search Player"
                className="w-full pl-10 pr-4 py-2 rounded-md border bg-gray-50"
              />
            </div>
          </div>

          {/* Team 2 */}
          <div className="mb-6">
            <label className="block text-sm font-medium mb-2">Team 2</label>
            <div className="relative mb-2">
              <User className="absolute left-3 top-2.5 h-5 w-5 text-gray-400" />
              <input
                type="text"
                placeholder="Search Player"
                className="w-full pl-10 pr-4 py-2 rounded-md border bg-gray-50"
              />
            </div>
            <div className="relative">
              <User className="absolute left-3 top-2.5 h-5 w-5 text-gray-400" />
              <input
                type="text"
                placeholder="Search Player"
                className="w-full pl-10 pr-4 py-2 rounded-md border bg-gray-50"
              />
            </div>
          </div>

          <div className="flex items-center gap-4 justify-center">
            <div className="flex-1 max-w-[120px]">
              <label className="block text-sm text-gray-500 mb-1">Team 1</label>
              <input
                type="number"
                className="w-full px-3 py-2 rounded-md border bg-gray-50 text-center text-lg"
                placeholder="0"
              />
            </div>
            <span className="text-xl font-medium text-gray-400">vs</span>
            <div className="flex-1 max-w-[120px]">
              <label className="block text-sm text-gray-500 mb-1">Team 2</label>
              <input
                type="number"
                className="w-full px-3 py-2 rounded-md border bg-gray-50 text-center text-lg"
                placeholder="0"
              />
            </div>
          </div>
          <div className="flex justify-end">
            <button className="bg-blue-500 text-white px-4 py-2 rounded-md font-bold flex items-center">
              <PlusCircle className="h-5 w-5 mr-2" />
              Submit Match
            </button>
          </div>
        </div>
      </div>
    </form>
  );
}
