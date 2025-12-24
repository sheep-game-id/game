import { useState, useEffect } from 'react';
import { useGame } from './GameContext';

const AnswerPhase = () => {
  const { currentQuestion, playerName, submitAnswer, players, answers, isHost, calculateScores } = useGame();
  const [answer, setAnswer] = useState('');
  const [submitted, setSubmitted] = useState(false);

  // Find current player's ID
  const currentPlayer = players.find(p => p.name === playerName);
  const playerId = currentPlayer?.id || 'unknown';

  useEffect(() => {
    setAnswer('');
    setSubmitted(false);
  }, [currentQuestion]);

  const handleSubmit = () => {
    if (answer.trim()) {
      submitAnswer(playerId, answer);
      setSubmitted(true);
    }
  };

  const handleCalculateScores = () => {
    calculateScores();
  };

  const answeredCount = Object.keys(answers).length;
  const totalPlayers = players.length;
  const allAnswered = answeredCount === totalPlayers;

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-400 via-blue-500 to-purple-600 flex items-center justify-center p-4">
      <div className="bg-white rounded-2xl shadow-2xl p-8 max-w-2xl w-full">
        <div className="text-center mb-6">
          <h2 className="text-2xl font-bold text-gray-800 mb-4">Question</h2>
          <div className="bg-gradient-to-r from-purple-100 to-pink-100 rounded-lg p-6">
            <p className="text-2xl font-semibold text-gray-800">
              {currentQuestion}
            </p>
          </div>
        </div>

        {!submitted ? (
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Your Answer
              </label>
              <input
                type="text"
                value={answer}
                onChange={(e) => setAnswer(e.target.value)}
                placeholder="Type your answer..."
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                onKeyPress={(e) => e.key === 'Enter' && handleSubmit()}
                autoFocus
              />
            </div>
            <button
              onClick={handleSubmit}
              disabled={!answer.trim()}
              className="w-full bg-gradient-to-r from-green-500 to-blue-500 text-white py-3 rounded-lg font-semibold hover:from-green-600 hover:to-blue-600 transition disabled:opacity-50 disabled:cursor-not-allowed"
            >
              Submit Answer
            </button>
          </div>
        ) : (
          <div className="text-center">
            <div className="bg-green-100 border border-green-400 rounded-lg p-4 mb-4">
              <p className="text-green-800 font-semibold">✓ Answer Submitted!</p>
              <p className="text-green-600 text-sm mt-1">
                Waiting for other players...
              </p>
            </div>
          </div>
        )}

        <div className="mt-6 p-4 bg-gray-50 rounded-lg">
          <div className="flex items-center justify-between">
            <span className="text-gray-700 font-medium">Progress</span>
            <span className="text-gray-600">{answeredCount} / {totalPlayers}</span>
          </div>
          <div className="mt-2 bg-gray-200 rounded-full h-3 overflow-hidden">
            <div 
              className="bg-gradient-to-r from-purple-500 to-pink-500 h-full transition-all duration-300"
              style={{ width: `${(answeredCount / totalPlayers) * 100}%` }}
            />
          </div>
        </div>

        {isHost && allAnswered && (
          <button
            onClick={handleCalculateScores}
            className="w-full mt-4 bg-gradient-to-r from-purple-600 to-pink-600 text-white py-3 rounded-lg font-semibold hover:from-purple-700 hover:to-pink-700 transition"
          >
            Show Results
          </button>
        )}

        {!isHost && allAnswered && (
          <div className="mt-4 text-center text-gray-600">
            <p>All answers submitted! Waiting for host to show results...</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default AnswerPhase;
