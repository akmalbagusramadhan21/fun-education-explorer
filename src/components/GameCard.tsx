
import React from 'react';
import { Link } from 'react-router-dom';
import AnimatedTransition from './AnimatedTransition';

interface GameCardProps {
  title: string;
  description: string;
  icon: React.ReactNode;
  color: string;
  delay?: number;
  active?: boolean;
  onClick?: () => void;
}

const GameCard: React.FC<GameCardProps> = ({
  title,
  description,
  icon,
  color,
  delay = 0,
  active = false,
  onClick,
}) => {
  const [isVisible, setIsVisible] = React.useState(false);

  React.useEffect(() => {
    const timer = setTimeout(() => {
      setIsVisible(true);
    }, delay);
    
    return () => clearTimeout(timer);
  }, [delay]);

  const getBgClass = () => {
    switch (color) {
      case 'blue':
        return 'bg-kid-blue/10 border-kid-blue/30 hover:bg-kid-blue/20';
      case 'pink':
        return 'bg-kid-pink/10 border-kid-pink/30 hover:bg-kid-pink/20';
      case 'green':
        return 'bg-kid-green/10 border-kid-green/30 hover:bg-kid-green/20';
      default:
        return 'bg-white/80 border-gray-200 hover:bg-white';
    }
  };

  return (
    <AnimatedTransition show={isVisible} type="slide-up">
      <div
        className={`game-tile p-6 md:p-8 rounded-2xl border ${getBgClass()} backdrop-blur-sm shadow-sm transition-all duration-300 cursor-pointer ${
          active ? 'ring-2 ring-kid-blue/40 scale-[1.02]' : ''
        }`}
        onClick={onClick}
      >
        <div className="flex flex-col items-center text-center">
          <div className="mb-4 transform transition-transform duration-300 group-hover:scale-110">
            {icon}
          </div>
          <h3 className="text-xl md:text-2xl font-bold mb-2">{title}</h3>
          <p className="text-muted-foreground text-sm md:text-base">
            {description}
          </p>
        </div>
      </div>
    </AnimatedTransition>
  );
};

export default GameCard;
