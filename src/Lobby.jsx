import { useState } from 'react';
import { useGame } from './GameContext';

const Lobby = () => {
  const { gameCode, players, isHost, startQuestion } = useGame();
  const [question, setQuestion] = useState('');

  const handleStartQuestion = () => {
    if (question.trim()) {
      startQuestion(question);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-500 via-pink-500 to-red-500 flex items-center justify-center p-4">
      <div className="bg-white rounded-2xl shadow-2xl p-8 max-w-2xl w-full">
        <h1 className="text-4xl font-bold text-center mb-6 text-gray-800">
          🐑 Sheep Game
        </h1>
        
        <div className="bg-gray-100 rounded-lg p-4 mb-6 text-center">
          <p className="text-sm text-gray-600 mb-1">Game Code</p>
          <p className="text-3xl font-bold text-purple-600">{gameCode}</p>
        </div>

        <div className="mb-6">
          <h2 className="text-xl font-semibold mb-3 text-gray-700">
            Players ({players.length})
          </h2>
          <div className="space-y-2">
            {players.map((player, index) => (
              <div 
                key={player.id} 
                className="bg-gray-50 rounded-lg p-3 flex items-center justify-between"
              >
                <div className="flex items-center">
                  <span className="text-2xl mr-3">
                    {index === 0 ? '👑' : '👤'}
                  </span>
                  <span className="font-medium text-gray-800">{player.name}</span>
                </div>
                <span className="text-gray-500 text-sm">
                  Score: {player.score}
                </span>
              </div>
            ))}
          </div>
        </div>

        {isHost && (
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Enter Question
              </label>
              <textarea
                value={question}
                onChange={(e) => setQuestion(e.target.value)}
                placeholder="What is your favorite color?"
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent resize-none"
                rows="3"
              />
            </div>
            <button
              onClick={handleStartQuestion}
              disabled={!question.trim()}
              className="w-full bg-gradient-to-r from-purple-600 to-pink-600 text-white py-3 rounded-lg font-semibold hover:from-purple-700 hover:to-pink-700 transition disabled:opacity-50 disabled:cursor-not-allowed"
            >
              Start Question
            </button>
          </div>
        )}

        {!isHost && (
          <div className="text-center text-gray-600">
            <p>Waiting for host to start the question...</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default Lobby;
