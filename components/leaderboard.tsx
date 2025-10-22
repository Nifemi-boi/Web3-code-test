interface Score {
  score: number
  totalQuestions?: number
  percentage?: number
  date: string
}

interface LeaderboardProps {
  scores: Score[]
  currentScore: number
}

export default function Leaderboard({ scores, currentScore }: LeaderboardProps) {
  const topScores = scores.slice(0, 10)
  const currentRank = scores.findIndex((s) => s.score === currentScore) + 1

  return (
    <div className="bg-white rounded-2xl shadow-2xl p-8">
      <h2 className="text-3xl font-bold text-gray-900 mb-6 text-center">Top Scores</h2>

      <div className="space-y-3 mb-6">
        {topScores.map((score, index) => (
          <div
            key={index}
            className={`flex items-center justify-between p-4 rounded-lg ${
              score.score === currentScore
                ? "bg-blue-100 border-2 border-blue-500"
                : "bg-gray-50 border-2 border-gray-200"
            }`}
          >
            <div className="flex items-center gap-4 flex-1">
              <div
                className={`w-10 h-10 rounded-full flex items-center justify-center font-bold text-white ${
                  index === 0
                    ? "bg-yellow-500"
                    : index === 1
                      ? "bg-gray-400"
                      : index === 2
                        ? "bg-orange-600"
                        : "bg-blue-500"
                }`}
              >
                {index + 1}
              </div>
              <div>
                <div className="font-semibold text-gray-900">
                  {score.score === currentScore ? "You" : `Player ${index + 1}`}
                </div>
                <div className="text-sm text-gray-600">{score.date}</div>
              </div>
            </div>
            <div className="text-right">
              <div className="text-2xl font-bold text-blue-600">{score.score}</div>
              {score.percentage !== undefined && <div className="text-sm text-gray-600">{score.percentage}%</div>}
            </div>
          </div>
        ))}
      </div>

      {scores.length === 0 && (
        <div className="text-center py-8 text-gray-600">
          <p>No scores yet. Complete a quiz to see the leaderboard!</p>
        </div>
      )}

      <div className="bg-blue-50 rounded-lg p-4 text-center border-2 border-blue-200">
        <div className="text-sm text-gray-600 mb-1">Your Current Rank</div>
        <div className="text-3xl font-bold text-blue-600">#{currentRank}</div>
      </div>
    </div>
  )
}
