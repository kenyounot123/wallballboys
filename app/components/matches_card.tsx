import { ChevronDown, Share2 } from "lucide-react"
import type { Match, MatchScore } from "@/types/matches";
// TODO: Take in match details and render it dynamically.
export default function MatchCard({matchData}: {matchData: Match}) {

  return (
    <div className="w-full max-w-md rounded-lg border bg-white shadow-sm">
      <div className="p-6">
        {/* Header with Win status and score */}
        <div className="flex items-center justify-between mb-2">
          <div className="flex items-center gap-1">
            <span className={`font-medium ${
              (matchData.score as MatchScore)?.team1 > (matchData.score as MatchScore)?.team2 
                ? "text-emerald-500" 
                : "text-rose-500"
            }`}>
              {(matchData.score as MatchScore)?.team1 > (matchData.score as MatchScore)?.team2 ? "Win" : "Loss"}
            </span>
          </div>
          <span className="text-emerald-500 font-medium">+.138</span>
        </div>

        {/* Location and date */}
        <div className="text-sm text-gray-500 mb-4">
          {new Date(matchData.created_at).toLocaleDateString('en-US', {
            month: 'short',
            day: 'numeric',
            year: 'numeric',
            hour: 'numeric',
            minute: 'numeric'
          })}
        </div>

        {/* Players section */}
        <div className="space-y-4">
          {/* First player */}
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <div className="w-6 h-6 rounded-full bg-gray-100 flex items-center justify-center text-xs font-medium text-gray-600">
                DK
              </div>
              <span className="font-medium text-black"></span>
              <span className="text-rose-500">+3.215</span>
            </div>
            <div className="flex items-center gap-2">
              <span className="text-sm">{(matchData.score as MatchScore)?.team1}</span>
            </div>
          </div>

          {/* Second player */}
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <div className="w-6 h-6 rounded-full bg-gray-100 flex items-center justify-center text-xs font-medium text-gray-600">
                KL
              </div>
              <span className="font-medium text-black"></span>
              <span className="text-emerald-500">3.785</span>
            </div>
            <div className="flex items-center gap-2">
              <span className="text-sm">{(matchData.score as MatchScore)?.team2}</span>
            </div>
          </div>
        </div>
      </div>

      {/* Footer */}
      <div className="px-6 py-4 border-t">
        <div className="flex items-center justify-between w-full">
          <span className="text-sm text-gray-500">ID: QPEMDR2RN</span>
          <button className="inline-flex items-center gap-2 rounded-md border bg-white px-3 py-1.5 text-sm font-medium text-gray-700 shadow-sm hover:bg-gray-50 transition-colors">
            <Share2 className="h-4 w-4" />
            Share To Feed
          </button>
        </div>
      </div>
    </div>
  )
}

