
import React, { useState } from 'react';
import Header from '../components/Header';
import AnimatedBackground from '../components/AnimatedBackground';
import GameCard from '../components/GameCard';
import NumberIcon from '../assets/icons/NumberIcon';
import LetterIcon from '../assets/icons/LetterIcon';
import ShapeIcon from '../assets/icons/ShapeIcon';
import NumberGame from '../components/NumberGame';
import LetterGame from '../components/LetterGame';
import ShapeGame from '../components/ShapeGame';
import AnimatedTransition from '../components/AnimatedTransition';

// Define new animation styles in a style tag
const animationStyles = `
  @keyframes shake {
    0%, 100% { transform: translateX(0); }
    25% { transform: translateX(-5px); }
    75% { transform: translateX(5px); }
  }

  @keyframes float-fast {
    0%, 100% { transform: translateY(0); }
    50% { transform: translateY(-15px); }
  }

  @keyframes float-delayed {
    0% { transform: translateY(0); }
    50% { transform: translateY(-15px); }
    100% { transform: translateY(0); }
  }

  .animate-shake {
    animation: shake 0.5s ease-in-out;
  }

  .animate-float-fast {
    animation: float-fast 2s ease-in-out infinite;
  }

  .animate-float-delayed {
    animation: float-delayed 3s ease-in-out infinite;
    animation-delay: 0.5s;
  }
`;

type GameType = 'number' | 'letter' | 'shape' | null;

const Index = () => {
  const [activeGame, setActiveGame] = useState<GameType>(null);
  const [gameComplete, setGameComplete] = useState(false);
  const [score, setScore] = useState(0);

  const handleStartGame = (game: GameType) => {
    setActiveGame(game);
    setGameComplete(false);
  };

  const handleGameComplete = (finalScore: number) => {
    setScore(finalScore);
    setGameComplete(true);
  };

  const handleBackToHome = () => {
    setActiveGame(null);
    setGameComplete(false);
  };

  // Determine which game component to show
  const renderGameContent = () => {
    if (!activeGame) return null;

    if (gameComplete) {
      return (
        <AnimatedTransition show={true} type="fade">
          <div className="text-center">
            <div className="w-40 h-40 mx-auto mb-6 flex items-center justify-center">
              <div className="w-32 h-32 rounded-full bg-gradient-to-r from-kid-yellow to-kid-orange flex items-center justify-center animate-bounce-gentle">
                <span className="text-5xl font-bold text-white">{score}</span>
              </div>
            </div>
            
            <h2 className="text-3xl font-bold mb-4">
              {score === 5 
                ? 'Hebat Sekali!' 
                : score >= 3 
                  ? 'Bagus!' 
                  : 'Coba Lagi!'}
            </h2>
            
            <p className="text-lg mb-8">
              Kamu mendapatkan nilai {score} dari 5!
            </p>
            
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <button 
                onClick={() => {
                  setGameComplete(false);
                }}
                className="px-8 py-3 rounded-full bg-white border border-kid-blue shadow-sm hover:shadow-md transition-all duration-300 text-kid-blue font-medium"
              >
                Main Lagi
              </button>
              
              <button 
                onClick={handleBackToHome}
                className="px-8 py-3 rounded-full bg-gradient-to-r from-kid-blue to-kid-purple text-white shadow-md hover:shadow-lg transition-all duration-300 font-medium"
              >
                Pilih Game Lain
              </button>
            </div>
          </div>
        </AnimatedTransition>
      );
    }

    switch (activeGame) {
      case 'number':
        return <NumberGame onComplete={handleGameComplete} />;
      case 'letter':
        return <LetterGame onComplete={handleGameComplete} />;
      case 'shape':
        return <ShapeGame onComplete={handleGameComplete} />;
      default:
        return null;
    }
  };

  return (
    <div className="min-h-screen">
      {/* Add the animation styles */}
      <style>{animationStyles}</style>
      
      <AnimatedBackground />
      <Header />
      
      <main className="container mx-auto px-4 py-8 relative">
        {!activeGame ? (
          <AnimatedTransition show={true} type="fade">
            <div className="text-center mb-12">
              <span className="inline-block text-xs uppercase tracking-wider py-1 px-3 rounded-full bg-kid-yellow/20 text-kid-orange font-semibold mb-4">
                Game Edukasi
              </span>
              <h1 className="text-4xl md:text-5xl font-bold mb-4">
                Bermain dan Belajar!
              </h1>
              <p className="text-lg md:text-xl text-muted-foreground max-w-2xl mx-auto">
                Pilih permainan edukatif yang menyenangkan untuk anak-anak TK
              </p>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-5xl mx-auto">
              <GameCard
                title="Tata Surya"
                description="Mengenal planet-planet di tata surya kita"
                icon={<NumberIcon className="w-16 h-16" />}
                color="blue"
                delay={100}
                onClick={() => handleStartGame('number')}
              />
              
              <GameCard
                title="Belajar Huruf"
                description="Mengenal huruf-huruf abjad dengan interaktif"
                icon={<LetterIcon className="w-16 h-16" />}
                color="pink"
                delay={200}
                onClick={() => handleStartGame('letter')}
              />
              
              <GameCard
                title="Belajar Bentuk"
                description="Mengenal berbagai bentuk dasar dengan cara seru"
                icon={<ShapeIcon className="w-16 h-16" />}
                color="green"
                delay={300}
                onClick={() => handleStartGame('shape')}
              />
            </div>
          </AnimatedTransition>
        ) : (
          <div className="max-w-3xl mx-auto">
            <div className="flex items-center mb-8">
              <button
                onClick={handleBackToHome}
                className="flex items-center space-x-2 text-kid-blue hover:text-kid-purple transition-colors"
              >
                <svg
                  width="24"
                  height="24"
                  viewBox="0 0 24 24"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M15 19L8 12L15 5"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
                <span>Kembali</span>
              </button>
            </div>
            
            <div className="bg-white/80 backdrop-blur-md rounded-3xl p-8 shadow-lg">
              {renderGameContent()}
            </div>
          </div>
        )}
      </main>
      
      <footer className="container mx-auto px-4 py-6 text-center text-sm text-muted-foreground">
        <p>© 2023 KidLearn - Akmal Bagus</p>
      </footer>
    </div>
  );
};

export default Index;
