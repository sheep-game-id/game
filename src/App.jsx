import { GameProvider, useGame } from './GameContext';
import Home from './Home';
import Lobby from './Lobby';
import AnswerPhase from './AnswerPhase';
import Results from './Results';

function GameFlow() {
  const { gameState } = useGame();

  switch (gameState) {
    case 'lobby':
      return <Lobby />;
    case 'question':
      return <Lobby />;
    case 'answering':
      return <AnswerPhase />;
    case 'results':
      return <Results />;
    default:
      return <Home />;
  }
}

function App() {
  return (
    <GameProvider>
      <GameFlow />
    </GameProvider>
  );
}

export default App;
