import { useState } from 'react';
import { useGame } from './GameContext';

const Home = () => {
  const { createGame, joinGame } = useGame();
  const [mode, setMode] = useState(null); // null, 'create', 'join'
  const [name, setName] = useState('');
  const [code, setCode] = useState('');

  const handleCreateGame = () => {
    if (name.trim()) {
      createGame(name);
    }
  };

  const handleJoinGame = () => {
    if (name.trim() && code.trim()) {
      joinGame(code, name);
    }
  };

  if (mode === 'create') {
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-500 via-purple-500 to-pink-500 flex items-center justify-center p-4">
        <div className="bg-white rounded-2xl shadow-2xl p-8 max-w-md w-full">
          <button
            onClick={() => setMode(null)}
            className="text-gray-600 hover:text-gray-800 mb-4"
          >
            ← Back
          </button>
          <h2 className="text-3xl font-bold text-center mb-6 text-gray-800">
            Create Game
          </h2>
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Your Name
              </label>
              <input
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder="Enter your name"
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                onKeyPress={(e) => e.key === 'Enter' && handleCreateGame()}
              />
            </div>
            <button
              onClick={handleCreateGame}
              disabled={!name.trim()}
              className="w-full bg-gradient-to-r from-purple-600 to-pink-600 text-white py-3 rounded-lg font-semibold hover:from-purple-700 hover:to-pink-700 transition disabled:opacity-50 disabled:cursor-not-allowed"
            >
              Create Game
            </button>
          </div>
        </div>
      </div>
    );
  }

  if (mode === 'join') {
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-500 via-purple-500 to-pink-500 flex items-center justify-center p-4">
        <div className="bg-white rounded-2xl shadow-2xl p-8 max-w-md w-full">
          <button
            onClick={() => setMode(null)}
            className="text-gray-600 hover:text-gray-800 mb-4"
          >
            ← Back
          </button>
          <h2 className="text-3xl font-bold text-center mb-6 text-gray-800">
            Join Game
          </h2>
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Game Code
              </label>
              <input
                type="text"
                value={code}
                onChange={(e) => setCode(e.target.value.toUpperCase())}
                placeholder="Enter game code"
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent uppercase"
                maxLength="6"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Your Name
              </label>
              <input
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder="Enter your name"
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                onKeyPress={(e) => e.key === 'Enter' && handleJoinGame()}
              />
            </div>
            <button
              onClick={handleJoinGame}
              disabled={!name.trim() || !code.trim()}
              className="w-full bg-gradient-to-r from-purple-600 to-pink-600 text-white py-3 rounded-lg font-semibold hover:from-purple-700 hover:to-pink-700 transition disabled:opacity-50 disabled:cursor-not-allowed"
            >
              Join Game
            </button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-500 via-purple-500 to-pink-500 flex items-center justify-center p-4">
      <div className="bg-white rounded-2xl shadow-2xl p-8 max-w-md w-full">
        <div className="text-center mb-8">
          <h1 className="text-5xl font-bold mb-4 text-gray-800">
            🐑 Sheep Game
          </h1>
          <p className="text-gray-600">
            Think like the flock! The most popular answers win!
          </p>
        </div>
        
        <div className="space-y-4">
          <button
            onClick={() => setMode('create')}
            className="w-full bg-gradient-to-r from-purple-600 to-pink-600 text-white py-4 rounded-lg font-semibold text-lg hover:from-purple-700 hover:to-pink-700 transition shadow-lg"
          >
            Create Game
          </button>
          <button
            onClick={() => setMode('join')}
            className="w-full bg-white text-purple-600 py-4 rounded-lg font-semibold text-lg border-2 border-purple-600 hover:bg-purple-50 transition"
          >
            Join Game
          </button>
        </div>

        <div className="mt-8 p-4 bg-gray-50 rounded-lg">
          <h3 className="font-semibold text-gray-800 mb-2">How to Play:</h3>
          <ul className="text-sm text-gray-600 space-y-1">
            <li>• Host asks a question</li>
            <li>• Everyone submits their answer</li>
            <li>• More popular answers = more points</li>
            <li>• Unique answers = fewer points</li>
          </ul>
        </div>
      </div>
    </div>
  );
};

export default Home;
