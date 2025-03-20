
import React, { useState, useEffect } from 'react';
import AnimatedTransition from './AnimatedTransition';
import playSound from '../utils/audio';

interface NumberGameProps {
  onComplete: (score: number) => void;
}

const NumberGame: React.FC<NumberGameProps> = ({ onComplete }) => {
  const [currentPlanet, setCurrentPlanet] = useState<string>("");
  const [options, setOptions] = useState<string[]>([]);
  const [score, setScore] = useState<number>(0);
  const [attempts, setAttempts] = useState<number>(0);
  const [maxAttempts] = useState<number>(5);
  const [isCorrect, setIsCorrect] = useState<boolean | null>(null);
  const [selectedOption, setSelectedOption] = useState<string | null>(null);
  const [showCelebration, setShowCelebration] = useState<boolean>(false);

  // Define solar system planets and their images
  const planets = [
    { name: "Merkurius", image: "https://upload.wikimedia.org/wikipedia/commons/thumb/d/d9/Mercury_in_color_-_Prockter07-edit1.jpg/600px-Mercury_in_color_-_Prockter07-edit1.jpg" },
    { name: "Venus", image: "https://upload.wikimedia.org/wikipedia/commons/thumb/e/e5/Venus-real_color.jpg/600px-Venus-real_color.jpg" },
    { name: "Bumi", image: "https://upload.wikimedia.org/wikipedia/commons/thumb/c/cb/The_Blue_Marble_%28remastered%29.jpg/600px-The_Blue_Marble_%28remastered%29.jpg" },
    { name: "Mars", image: "https://upload.wikimedia.org/wikipedia/commons/thumb/0/02/OSIRIS_Mars_true_color.jpg/600px-OSIRIS_Mars_true_color.jpg" },
    { name: "Jupiter", image: "https://upload.wikimedia.org/wikipedia/commons/thumb/2/2b/Jupiter_and_its_shrunken_Great_Red_Spot.jpg/600px-Jupiter_and_its_shrunken_Great_Red_Spot.jpg" },
    { name: "Saturnus", image: "https://upload.wikimedia.org/wikipedia/commons/thumb/c/c7/Saturn_during_Equinox.jpg/600px-Saturn_during_Equinox.jpg" },
    { name: "Uranus", image: "https://upload.wikimedia.org/wikipedia/commons/thumb/3/3d/Uranus2.jpg/600px-Uranus2.jpg" },
    { name: "Neptunus", image: "https://upload.wikimedia.org/wikipedia/commons/thumb/6/63/Neptune_-_Voyager_2_%2829347980845%29_flatten_crop.jpg/600px-Neptune_-_Voyager_2_%2829347980845%29_flatten_crop.jpg" },
  ];

  // Get a random planet
  const getRandomPlanet = () => {
    const randomIndex = Math.floor(Math.random() * planets.length);
    return planets[randomIndex];
  };

  // Generate options including the correct answer
  const generateOptions = (correctPlanet: string) => {
    const optionsArray = [correctPlanet];
    const planetNames = planets.map(p => p.name);
    
    while (optionsArray.length < 3) {
      const randomPlanetName = planetNames[Math.floor(Math.random() * planetNames.length)];
      if (!optionsArray.includes(randomPlanetName)) {
        optionsArray.push(randomPlanetName);
      }
    }
    
    // Shuffle the options
    return optionsArray.sort(() => Math.random() - 0.5);
  };

  const startNewRound = () => {
    const newPlanet = getRandomPlanet();
    setCurrentPlanet(newPlanet.name);
    setOptions(generateOptions(newPlanet.name));
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
    const correct = option === currentPlanet;
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

  // Get the current planet's image
  const getCurrentPlanetImage = () => {
    const planet = planets.find(p => p.name === currentPlanet);
    return planet ? planet.image : "";
  };

  return (
    <div className="flex flex-col items-center">
      <AnimatedTransition show={true} type="fade">
        <div className="text-center mb-8">
          <span className="inline-block text-xs uppercase tracking-wider py-1 px-3 rounded-full bg-kid-blue/10 text-kid-blue font-semibold mb-2">
            Pertanyaan {attempts + 1} dari {maxAttempts}
          </span>
          <h2 className="text-2xl md:text-3xl font-bold">
            Planet apakah ini?
          </h2>
        </div>
      </AnimatedTransition>

      <AnimatedTransition show={true} type="fade">
        <div className="flex justify-center mb-10 relative">
          <div className={`w-48 h-48 md:w-56 md:h-56 flex items-center justify-center rounded-full overflow-hidden bg-gradient-to-br from-kid-blue to-kid-purple shadow-lg ${isCorrect === true ? 'animate-bounce-gentle' : ''}`}>
            <img 
              src={getCurrentPlanetImage()} 
              alt={`Planet ${currentPlanet}`} 
              className="w-full h-full object-cover"
            />
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
              className={`w-full py-4 rounded-xl text-lg font-bold transition-all duration-300 
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
              Jawaban yang benar adalah {currentPlanet}
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
