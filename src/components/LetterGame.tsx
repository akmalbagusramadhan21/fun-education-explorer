
import React, { useState, useEffect } from 'react';
import AnimatedTransition from './AnimatedTransition';
import playSound from '../utils/audio';

interface LetterGameProps {
  onComplete: (score: number) => void;
}

const LetterGame: React.FC<LetterGameProps> = ({ onComplete }) => {
  const [currentLetter, setCurrentLetter] = useState<string>('');
  const [options, setOptions] = useState<string[]>([]);
  const [score, setScore] = useState<number>(0);
  const [attempts, setAttempts] = useState<number>(0);
  const [maxAttempts] = useState<number>(5);
  const [isCorrect, setIsCorrect] = useState<boolean | null>(null);
  const [selectedOption, setSelectedOption] = useState<string | null>(null);
  const [showCelebration, setShowCelebration] = useState<boolean>(false);

  // List of common vowels and consonants for kindergarten
  const letters = ['A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'I', 'J', 'K', 'L', 'M'];

  // Generate a random letter
  const generateRandomLetter = () => {
    return letters[Math.floor(Math.random() * letters.length)];
  };

  // Generate options including the correct answer
  const generateOptions = (correctAnswer: string) => {
    const optionsArray = [correctAnswer];
    
    while (optionsArray.length < 3) {
      const randomLetter = generateRandomLetter();
      if (!optionsArray.includes(randomLetter)) {
        optionsArray.push(randomLetter);
      }
    }
    
    // Shuffle the options
    return optionsArray.sort(() => Math.random() - 0.5);
  };

  const startNewRound = () => {
    const newLetter = generateRandomLetter();
    setCurrentLetter(newLetter);
    setOptions(generateOptions(newLetter));
    setIsCorrect(null);
    setSelectedOption(null);
    setShowCelebration(false);
  };

  // Initialize the game
  useEffect(() => {
    startNewRound();
  }, []);

  const handleOptionClick = (option: string) => {
    if (selectedOption !== null) return; // Prevent multiple selections
    
    setSelectedOption(option);
    const correct = option === currentLetter;
    setIsCorrect(correct);
    
    if (correct) {
      // Play both sounds for correct answer
      playSound('correct');
      // Add a slight delay for the voice sound
      setTimeout(() => {
        playSound('yes-correct');
      }, 300);
      setScore(prevScore => prevScore + 1);
      setShowCelebration(true);
    } else {
      playSound('incorrect');
    }
    
    setAttempts(prevAttempts => prevAttempts + 1);
    
    // Wait before moving to next question
    setTimeout(() => {
      if (attempts + 1 >= maxAttempts) {
        playSound('complete');
        onComplete(score + (correct ? 1 : 0));
      } else {
        startNewRound();
      }
    }, 1500);
  };

  return (
    <div className="flex flex-col items-center">
      <AnimatedTransition show={true} type="fade">
        <div className="text-center mb-8">
          <span className="inline-block text-xs uppercase tracking-wider py-1 px-3 rounded-full bg-kid-pink/10 text-kid-pink font-semibold mb-2">
            Pertanyaan {attempts + 1} dari {maxAttempts}
          </span>
          <h2 className="text-2xl md:text-3xl font-bold">
            Temukan huruf apa ini?
          </h2>
        </div>
      </AnimatedTransition>

      <AnimatedTransition show={true} type="fade">
        <div className="flex justify-center mb-10 relative">
          <div className={`w-32 h-32 md:w-40 md:h-40 flex items-center justify-center rounded-2xl bg-gradient-to-br from-kid-pink to-kid-purple shadow-lg ${isCorrect === true ? 'animate-bounce-gentle' : ''}`}>
            <span className="text-6xl md:text-7xl font-bold text-white">
              {currentLetter}
            </span>
          </div>
          
          {/* Celebration particles when correct */}
          {showCelebration && (
            <div className="absolute inset-0 pointer-events-none">
              <div className="absolute top-0 left-1/4 animate-float-fast">
                <div className="w-6 h-6 bg-kid-yellow rounded-full opacity-80" />
              </div>
              <div className="absolute top-1/4 right-1/4 animate-float-delayed">
                <div className="w-4 h-4 bg-kid-green rounded-full opacity-80" />
              </div>
              <div className="absolute bottom-1/4 left-1/3 animate-float-fast">
                <div className="w-5 h-5 bg-kid-orange rounded-full opacity-80" />
              </div>
              <div className="absolute bottom-0 right-1/3 animate-float-delayed">
                <div className="w-7 h-7 bg-kid-pink rounded-full opacity-80" />
              </div>
            </div>
          )}
        </div>
      </AnimatedTransition>

      <div className="grid grid-cols-3 gap-4 mb-8 w-full max-w-md">
        {options.map((option, index) => (
          <AnimatedTransition key={index} show={true} type="slide-up" duration={300 + index * 100}>
            <button
              className={`w-full py-4 rounded-xl text-2xl font-bold transition-all duration-300 
                ${selectedOption === option 
                  ? isCorrect 
                    ? 'bg-kid-green text-white correct-answer animate-pulse' 
                    : 'bg-kid-red text-white wrong-answer animate-shake'
                  : 'bg-white shadow-md hover:shadow-lg hover:-translate-y-1'
                }`}
              onClick={() => handleOptionClick(option)}
              disabled={selectedOption !== null}
            >
              {option}
            </button>
          </AnimatedTransition>
        ))}
      </div>

      <AnimatedTransition show={isCorrect !== null} type="slide-up">
        <div className="text-center">
          {isCorrect === true && (
            <p className="text-kid-green font-bold text-xl animate-bounce-gentle">Benar sekali!</p>
          )}
          {isCorrect === false && (
            <p className="text-kid-red font-bold text-xl">
              Jawaban yang benar adalah {currentLetter}
            </p>
          )}
        </div>
      </AnimatedTransition>

      <div className="mt-6 flex items-center space-x-2">
        <div className="bg-gray-200 h-2 w-40 md:w-60 rounded-full overflow-hidden">
          <div 
            className="bg-kid-pink h-full transition-all duration-300 ease-out"
            style={{ width: `${(attempts / maxAttempts) * 100}%` }}
          />
        </div>
        <span className="text-sm text-muted-foreground">
          {attempts}/{maxAttempts}
        </span>
      </div>
    </div>
  );
};

export default LetterGame;
