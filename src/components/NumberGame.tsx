
import React, { useState, useEffect } from 'react';
import AnimatedTransition from './AnimatedTransition';

interface NumberGameProps {
  onComplete: (score: number) => void;
}

const NumberGame: React.FC<NumberGameProps> = ({ onComplete }) => {
  const [currentNumber, setCurrentNumber] = useState<number>(0);
  const [options, setOptions] = useState<number[]>([]);
  const [score, setScore] = useState<number>(0);
  const [attempts, setAttempts] = useState<number>(0);
  const [maxAttempts] = useState<number>(5);
  const [isCorrect, setIsCorrect] = useState<boolean | null>(null);
  const [selectedOption, setSelectedOption] = useState<number | null>(null);

  // Generate a random number between 1 and 10
  const generateRandomNumber = () => {
    return Math.floor(Math.random() * 10) + 1;
  };

  // Generate options including the correct answer
  const generateOptions = (correctAnswer: number) => {
    const optionsArray = [correctAnswer];
    
    while (optionsArray.length < 3) {
      const randomNum = generateRandomNumber();
      if (!optionsArray.includes(randomNum)) {
        optionsArray.push(randomNum);
      }
    }
    
    // Shuffle the options
    return optionsArray.sort(() => Math.random() - 0.5);
  };

  const startNewRound = () => {
    const newNumber = generateRandomNumber();
    setCurrentNumber(newNumber);
    setOptions(generateOptions(newNumber));
    setIsCorrect(null);
    setSelectedOption(null);
  };

  // Initialize the game
  useEffect(() => {
    startNewRound();
  }, []);

  const handleOptionClick = (option: number) => {
    if (selectedOption !== null) return; // Prevent multiple selections
    
    setSelectedOption(option);
    const correct = option === currentNumber;
    setIsCorrect(correct);
    
    if (correct) {
      setScore(prevScore => prevScore + 1);
    }
    
    setAttempts(prevAttempts => prevAttempts + 1);
    
    // Wait before moving to next question
    setTimeout(() => {
      if (attempts + 1 >= maxAttempts) {
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
          <span className="inline-block text-xs uppercase tracking-wider py-1 px-3 rounded-full bg-kid-blue/10 text-kid-blue font-semibold mb-2">
            Pertanyaan {attempts + 1} dari {maxAttempts}
          </span>
          <h2 className="text-2xl md:text-3xl font-bold">
            Temukan angka berapa ini?
          </h2>
        </div>
      </AnimatedTransition>

      <AnimatedTransition show={true} type="fade">
        <div className="flex justify-center mb-10">
          <div className="w-32 h-32 md:w-40 md:h-40 flex items-center justify-center rounded-2xl bg-gradient-to-br from-kid-blue to-kid-purple shadow-lg">
            <span className="text-6xl md:text-7xl font-bold text-white">
              {currentNumber}
            </span>
          </div>
        </div>
      </AnimatedTransition>

      <div className="grid grid-cols-3 gap-4 mb-8 w-full max-w-md">
        {options.map((option, index) => (
          <AnimatedTransition key={index} show={true} type="slide-up" duration={300 + index * 100}>
            <button
              className={`w-full py-4 rounded-xl text-2xl font-bold transition-all duration-300 
                ${selectedOption === option 
                  ? isCorrect 
                    ? 'bg-kid-green text-white correct-answer' 
                    : 'bg-kid-red text-white wrong-answer'
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
            <p className="text-kid-green font-bold text-xl">Benar sekali!</p>
          )}
          {isCorrect === false && (
            <p className="text-kid-red font-bold text-xl">
              Jawaban yang benar adalah {currentNumber}
            </p>
          )}
        </div>
      </AnimatedTransition>

      <div className="mt-6 flex items-center space-x-2">
        <div className="bg-gray-200 h-2 w-40 md:w-60 rounded-full overflow-hidden">
          <div 
            className="bg-kid-blue h-full transition-all duration-300 ease-out"
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

export default NumberGame;
