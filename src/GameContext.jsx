import { createContext, useContext, useState, useCallback } from 'react';

const GameContext = createContext();

export const useGame = () => {
  const context = useContext(GameContext);
  if (!context) {
    throw new Error('useGame must be used within GameProvider');
  }
  return context;
};

export const GameProvider = ({ children }) => {
  const [gameState, setGameState] = useState(null); // null=home, lobby, question, answering, scoring, results
  const [isHost, setIsHost] = useState(false);
  const [playerName, setPlayerName] = useState('');
  const [gameCode, setGameCode] = useState('');
  const [players, setPlayers] = useState([]);
  const [currentQuestion, setCurrentQuestion] = useState('');
  const [answers, setAnswers] = useState({});
  const [scores, setScores] = useState({});
  const [questionHistory, setQuestionHistory] = useState([]);

  const createGame = useCallback((hostName) => {
    const code = Math.random().toString(36).substring(2, 8).toUpperCase();
    setGameCode(code);
    setIsHost(true);
    setPlayerName(hostName);
    setPlayers([{ name: hostName, id: 'host', score: 0 }]);
    setGameState('lobby');
    setScores({ host: 0 });
  }, []);

  const joinGame = useCallback((code, name) => {
    setGameCode(code);
    setPlayerName(name);
    setIsHost(false);
    const playerId = Math.random().toString(36).substring(2, 11);
    const newPlayer = { name, id: playerId, score: 0 };
    setPlayers(prev => [...prev, newPlayer]);
    setScores(prev => ({ ...prev, [playerId]: 0 }));
    setGameState('lobby');
  }, []);

  const startQuestion = useCallback((question) => {
    setCurrentQuestion(question);
    setAnswers({});
    setGameState('answering');
  }, []);

  const submitAnswer = useCallback((playerId, answer) => {
    setAnswers(prev => ({
      ...prev,
      [playerId]: answer.toLowerCase().trim()
    }));
  }, []);

  const calculateScores = useCallback(() => {
    const answerCounts = {};
    const playerAnswers = {};

    // Count occurrences of each answer
    Object.entries(answers).forEach(([playerId, answer]) => {
      playerAnswers[playerId] = answer;
      answerCounts[answer] = (answerCounts[answer] || 0) + 1;
    });

    // Calculate scores based on similarity count
    const newScores = { ...scores };
    Object.entries(playerAnswers).forEach(([playerId, answer]) => {
      const count = answerCounts[answer];
      newScores[playerId] = (newScores[playerId] || 0) + count;
    });

    setScores(newScores);
    
    // Update player scores
    setPlayers(prev => prev.map(player => ({
      ...player,
      score: newScores[player.id] || 0
    })));

    // Add to history
    setQuestionHistory(prev => [...prev, {
      question: currentQuestion,
      answers: playerAnswers,
      scores: answerCounts
    }]);

    setGameState('results');
  }, [answers, scores, currentQuestion]);

  const nextQuestion = useCallback(() => {
    setGameState('question');
    setCurrentQuestion('');
    setAnswers({});
  }, []);

  const resetGame = useCallback(() => {
    setGameState('lobby');
    setCurrentQuestion('');
    setAnswers({});
    setQuestionHistory([]);
    setPlayers(prev => prev.map(p => ({ ...p, score: 0 })));
    const resetScores = {};
    players.forEach(p => { resetScores[p.id] = 0; });
    setScores(resetScores);
  }, [players]);

  return (
    <GameContext.Provider value={{
      gameState,
      isHost,
      playerName,
      gameCode,
      players,
      currentQuestion,
      answers,
      scores,
      questionHistory,
      createGame,
      joinGame,
      startQuestion,
      submitAnswer,
      calculateScores,
      nextQuestion,
      resetGame,
      setGameState
    }}>
      {children}
    </GameContext.Provider>
  );
};
