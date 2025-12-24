# 🐑 Sheep Game

A fun multiplayer party game built with React where players try to think alike! The most popular answers win points.

## About the Game

Sheep Game is a social party game where:
- A host creates questions for all participants
- Players submit their answers simultaneously
- Scoring is based on similarity - the more people who give the same answer, the more points that answer is worth
- Unique answers get fewer points, popular answers get more points
- The goal is to "think like the flock" and give popular answers!

## Features

- 🎨 Modern React UI with state-of-the-art hooks and context
- 💅 Styled with Tailwind CSS for a beautiful, responsive design
- 🎮 Host and participant modes
- 📊 Real-time scoring based on answer similarity
- 🏆 Leaderboard tracking across multiple rounds
- 🎯 Easy-to-use interface with game codes for joining

## Tech Stack

- **React 19** - Latest React with modern hooks
- **Vite** - Fast build tool and dev server
- **Tailwind CSS 3** - Utility-first CSS framework
- **Context API** - State management across components

## Getting Started

### Prerequisites

- Node.js 18+ and npm

### Installation

1. Clone the repository:
```bash
git clone https://github.com/sheep-game-id/game.git
cd game
```

2. Install dependencies:
```bash
npm install
```

3. Start the development server:
```bash
npm run dev
```

4. Open your browser and navigate to `http://localhost:5173`

## How to Play

### Creating a Game (Host)
1. Click "Create Game" on the home screen
2. Enter your name
3. Share the generated game code with other players
4. Enter a question in the text area
5. Click "Start Question" when ready
6. Wait for all players to submit answers
7. Click "Show Results" to reveal scores

### Joining a Game (Participant)
1. Click "Join Game" on the home screen
2. Enter the game code provided by the host
3. Enter your name
4. Wait in the lobby for the host to start
5. Answer the question when it appears
6. View results and see how your answer compared!

### Scoring System
- Each answer gets points equal to the number of players who gave the same answer
- Example: If 3 players answer "Blue", each gets 3 points
- Unique answers get only 1 point
- The goal is to match what others are thinking!

## Building for Production

```bash
npm run build
```

The built files will be in the `dist` directory.

## Development

### Project Structure

```
src/
├── GameContext.jsx    # Game state management
├── Home.jsx          # Home screen with create/join options
├── Lobby.jsx         # Waiting room and question entry
├── AnswerPhase.jsx   # Answer submission screen
├── Results.jsx       # Results and leaderboard
├── App.jsx           # Main app component
└── main.jsx          # Entry point
```

### Available Scripts

- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm run preview` - Preview production build
- `npm run lint` - Run ESLint

## Future Enhancements

Potential features for future development:
- WebSocket integration for real multiplayer sync
- Backend server for persistent games
- Timer for answering questions
- Categories and pre-made question packs
- Mobile app version
- User accounts and statistics

## License

This project is open source and available under the MIT License.

## Contributing

Contributions are welcome! Feel free to submit issues and pull requests.
