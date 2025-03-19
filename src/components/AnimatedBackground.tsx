
import React from 'react';

const AnimatedBackground: React.FC = () => {
  return (
    <div className="fixed inset-0 -z-10 overflow-hidden pointer-events-none">
      {/* Animated Bubbles */}
      <div 
        className="bubble bg-kid-blue animate-float" 
        style={{ 
          width: '80px', 
          height: '80px', 
          left: '10%', 
          top: '15%', 
          '--duration': '8', 
          '--opacity': '0.2' 
        } as React.CSSProperties}
      />
      <div 
        className="bubble bg-kid-pink animate-float" 
        style={{ 
          width: '60px', 
          height: '60px', 
          left: '75%', 
          top: '20%', 
          '--duration': '10', 
          '--opacity': '0.15' 
        } as React.CSSProperties}
      />
      <div 
        className="bubble bg-kid-yellow animate-float" 
        style={{ 
          width: '100px', 
          height: '100px', 
          left: '50%', 
          top: '75%', 
          '--duration': '12', 
          '--opacity': '0.1' 
        } as React.CSSProperties}
      />
      <div 
        className="bubble bg-kid-green animate-float" 
        style={{ 
          width: '50px', 
          height: '50px', 
          left: '20%', 
          top: '60%', 
          '--duration': '9', 
          '--opacity': '0.2' 
        } as React.CSSProperties}
      />
      <div 
        className="bubble bg-kid-purple animate-float" 
        style={{ 
          width: '70px', 
          height: '70px', 
          left: '85%', 
          top: '65%', 
          '--duration': '11', 
          '--opacity': '0.15' 
        } as React.CSSProperties}
      />
      
      {/* Decorative elements */}
      <div 
        className="floating-object animate-bounce-gentle" 
        style={{ 
          left: '5%', 
          top: '30%', 
          '--duration': '4',
        } as React.CSSProperties}
      >
        <div className="w-8 h-8 rounded-full bg-kid-orange opacity-20"></div>
      </div>
      <div 
        className="floating-object animate-rotate-slow" 
        style={{ 
          right: '8%', 
          bottom: '15%', 
          '--duration': '20',
        } as React.CSSProperties}
      >
        <div className="w-16 h-16 rounded-lg bg-kid-blue rotate-45 opacity-10"></div>
      </div>
    </div>
  );
};

export default AnimatedBackground;
