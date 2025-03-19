
import React, { useEffect, useState } from 'react';

interface AnimatedTransitionProps {
  children: React.ReactNode;
  show: boolean;
  type?: 'fade' | 'slide-up' | 'slide-right';
  duration?: number;
}

const AnimatedTransition: React.FC<AnimatedTransitionProps> = ({ 
  children, 
  show, 
  type = 'fade', 
  duration = 300 
}) => {
  const [shouldRender, setShouldRender] = useState(show);

  useEffect(() => {
    if (show) {
      setShouldRender(true);
    } else {
      const timer = setTimeout(() => {
        setShouldRender(false);
      }, duration);
      return () => clearTimeout(timer);
    }
  }, [show, duration]);

  const getAnimation = () => {
    switch (type) {
      case 'fade':
        return 'animate-fade-in';
      case 'slide-up':
        return 'animate-slide-up';
      case 'slide-right':
        return 'animate-slide-right';
      default:
        return 'animate-fade-in';
    }
  };

  const animationClass = getAnimation();

  if (!shouldRender) {
    return null;
  }

  return (
    <div
      className={`${show ? animationClass : 'opacity-0'}`}
      style={{ 
        transition: `opacity ${duration}ms, transform ${duration}ms`,
      }}
    >
      {children}
    </div>
  );
};

export default AnimatedTransition;
