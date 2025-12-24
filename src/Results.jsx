import { useGame } from './GameContext';

const Results = () => {
  const { players, questionHistory, isHost, nextQuestion, resetGame } = useGame();

  const lastRound = questionHistory[questionHistory.length - 1];
  
  // Group answers by their value
  const answerGroups = {};
  if (lastRound) {
    Object.entries(lastRound.answers).forEach(([playerId, answer]) => {
      if (!answerGroups[answer]) {
        answerGroups[answer] = [];
      }
      const player = players.find(p => p.id === playerId);
      if (player) {
        answerGroups[answer].push(player.name);
      }
    });
  }

  // Sort answers by count (most popular first)
  const sortedAnswers = Object.entries(answerGroups).sort((a, b) => 
    b[1].length - a[1].length
  );

  // Sort players by total score
  const sortedPlayers = [...players].sort((a, b) => b.score - a.score);

  return (
    <div className="min-h-screen bg-gradient-to-br from-yellow-400 via-orange-500 to-red-500 flex items-center justify-center p-4">
      <div className="bg-white rounded-2xl shadow-2xl p-8 max-w-4xl w-full">
        <h2 className="text-3xl font-bold text-center mb-6 text-gray-800">
          📊 Results
        </h2>

        {lastRound && (
          <div className="mb-6">
            <div className="bg-gray-100 rounded-lg p-4 mb-4">
              <p className="text-sm text-gray-600 mb-1">Question</p>
              <p className="text-lg font-semibold text-gray-800">
                {lastRound.question}
              </p>
            </div>

            <h3 className="text-xl font-semibold mb-3 text-gray-700">
              Answers by Popularity
            </h3>
            <div className="space-y-3">
              {sortedAnswers.map(([answer, playerNames], index) => (
                <div 
                  key={answer}
                  className="bg-gradient-to-r from-purple-50 to-pink-50 rounded-lg p-4 border-2 border-purple-200"
                >
                  <div className="flex items-center justify-between mb-2">
                    <div className="flex items-center">
                      <span className="text-2xl mr-3">
                        {index === 0 ? '🏆' : index === 1 ? '🥈' : index === 2 ? '🥉' : '💭'}
                      </span>
                      <span className="font-bold text-lg text-gray-800">
                        {answer}
                      </span>
                    </div>
                    <div className="bg-purple-600 text-white px-3 py-1 rounded-full text-sm font-semibold">
                      {playerNames.length} {playerNames.length === 1 ? 'point' : 'points'}
                    </div>
                  </div>
                  <div className="flex flex-wrap gap-2">
                    {playerNames.map(name => (
                      <span 
                        key={name}
                        className="bg-white px-3 py-1 rounded-full text-sm text-gray-700 border border-gray-200"
                      >
                        {name}
                      </span>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        <div className="mb-6">
          <h3 className="text-xl font-semibold mb-3 text-gray-700">
            Leaderboard
          </h3>
          <div className="space-y-2">
            {sortedPlayers.map((player, index) => (
              <div 
                key={player.id}
                className={`rounded-lg p-4 flex items-center justify-between ${
                  index === 0 
                    ? 'bg-gradient-to-r from-yellow-400 to-orange-400 text-white' 
                    : 'bg-gray-50'
                }`}
              >
                <div className="flex items-center">
                  <span className="text-2xl mr-3 w-8">
                    {index === 0 ? '🥇' : index === 1 ? '🥈' : index === 2 ? '🥉' : `${index + 1}.`}
                  </span>
                  <span className={`font-semibold ${index === 0 ? 'text-white' : 'text-gray-800'}`}>
                    {player.name}
                  </span>
                </div>
                <span className={`text-xl font-bold ${index === 0 ? 'text-white' : 'text-purple-600'}`}>
                  {player.score}
                </span>
              </div>
            ))}
          </div>
        </div>

        {isHost && (
          <div className="flex gap-4">
            <button
              onClick={nextQuestion}
              className="flex-1 bg-gradient-to-r from-green-500 to-blue-500 text-white py-3 rounded-lg font-semibold hover:from-green-600 hover:to-blue-600 transition"
            >
              Next Question
            </button>
            <button
              onClick={resetGame}
              className="flex-1 bg-gradient-to-r from-gray-500 to-gray-600 text-white py-3 rounded-lg font-semibold hover:from-gray-600 hover:to-gray-700 transition"
            >
              Reset Game
            </button>
          </div>
        )}

        {!isHost && (
          <div className="text-center text-gray-600">
            <p>Waiting for host to continue...</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default Results;
