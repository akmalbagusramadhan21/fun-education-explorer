
import React, { useState, useEffect } from 'react';
import AnimatedTransition from './AnimatedTransition';

interface ShapeGameProps {
  onComplete: (score: number) => void;
}

interface Shape {
  name: string;
  svg: React.ReactNode;
}

const ShapeGame: React.FC<ShapeGameProps> = ({ onComplete }) => {
  const [currentShape, setCurrentShape] = useState<Shape | null>(null);
  const [options, setOptions] = useState<string[]>([]);
  const [score, setScore] = useState<number>(0);
  const [attempts, setAttempts] = useState<number>(0);
  const [maxAttempts] = useState<number>(5);
  const [isCorrect, setIsCorrect] = useState<boolean | null>(null);
  const [selectedOption, setSelectedOption] = useState<string | null>(null);

  // Define shapes
  const shapes: Shape[] = [
    {
      name: 'Lingkaran',
      svg: (
        <div className="w-full h-full flex items-center justify-center">
          <div className="w-20 h-20 rounded-full bg-kid-green"></div>
        </div>
      ),
    },
    {
      name: 'Persegi',
      svg: (
        <div className="w-full h-full flex items-center justify-center">
          <div className="w-20 h-20 bg-kid-blue"></div>
        </div>
      ),
    },
    {
      name: 'Segitiga',
      svg: (
        <div className="w-full h-full flex items-center justify-center">
          <div 
            className="w-0 h-0 border-l-[40px] border-r-[40px] border-b-[70px] border-l-transparent border-r-transparent border-b-kid-yellow"
          ></div>
        </div>
      ),
    },
    {
      name: 'Bintang',
      svg: (
        <div className="w-full h-full flex items-center justify-center">
          <svg width="70" height="70" viewBox="0 0 24 24" fill="none">
            <path 
              d="M12 2L15.09 8.26L22 9.27L17 14.14L18.18 21.02L12 17.77L5.82 21.02L7 14.14L2 9.27L8.91 8.26L12 2Z" 
              fill="#FFB347"
            />
          </svg>
        </div>
      ),
    },
  ];

  // Generate a random shape
  const generateRandomShape = () => {
    return shapes[Math.floor(Math.random() * shapes.length)];
  };

  // Generate options including the correct answer
  const generateOptions = (correctAnswer: string) => {
    const optionsArray = [correctAnswer];
    
    while (optionsArray.length < 3) {
      const randomShape = generateRandomShape();
      if (!optionsArray.includes(randomShape.name)) {
        optionsArray.push(randomShape.name);
      }
    }
    
    // Shuffle the options
    return optionsArray.sort(() => Math.random() - 0.5);
  };

  const startNewRound = () => {
    const newShape = generateRandomShape();
    setCurrentShape(newShape);
    setOptions(generateOptions(newShape.name));
    setIsCorrect(null);
    setSelectedOption(null);
  };

  // Initialize the game
  useEffect(() => {
    startNewRound();
  }, []);

  const handleOptionClick = (option: string) => {
    if (selectedOption !== null || !currentShape) return; // Prevent multiple selections
    
    setSelectedOption(option);
    const correct = option === currentShape.name;
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

  if (!currentShape) return null;

  return (
    <div className="flex flex-col items-center">
      <AnimatedTransition show={true} type="fade">
        <div className="text-center mb-8">
          <span className="inline-block text-xs uppercase tracking-wider py-1 px-3 rounded-full bg-kid-green/10 text-kid-green font-semibold mb-2">
            Pertanyaan {attempts + 1} dari {maxAttempts}
          </span>
          <h2 className="text-2xl md:text-3xl font-bold">
            Bentuk apa ini?
          </h2>
        </div>
      </AnimatedTransition>

      <AnimatedTransition show={true} type="fade">
        <div className="flex justify-center mb-10">
          <div className="w-32 h-32 md:w-40 md:h-40 flex items-center justify-center rounded-2xl bg-white shadow-lg">
            {currentShape.svg}
          </div>
        </div>
      </AnimatedTransition>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-8 w-full max-w-md">
        {options.map((option, index) => (
          <AnimatedTransition key={index} show={true} type="slide-up" duration={300 + index * 100}>
            <button
              className={`w-full py-4 px-6 rounded-xl text-lg font-bold transition-all duration-300 
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
              Jawaban yang benar adalah {currentShape.name}
            </p>
          )}
        </div>
      </AnimatedTransition>

      <div className="mt-6 flex items-center space-x-2">
        <div className="bg-gray-200 h-2 w-40 md:w-60 rounded-full overflow-hidden">
          <div 
            className="bg-kid-green h-full transition-all duration-300 ease-out"
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

export default ShapeGame;
