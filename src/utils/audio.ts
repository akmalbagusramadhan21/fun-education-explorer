
// Simple utility to play sound effects for correct and incorrect answers
const playSound = (type: 'correct' | 'incorrect' | 'complete' | 'yes-correct') => {
  let soundUrl = '';
  
  switch (type) {
    case 'correct':
      soundUrl = 'https://assets.mixkit.co/active_storage/sfx/2005/2005.wav'; // Cheerful bell sound
      break;
    case 'incorrect':
      soundUrl = 'https://assets.mixkit.co/active_storage/sfx/270/270.wav'; // Soft error tone
      break;
    case 'complete':
      soundUrl = 'https://assets.mixkit.co/active_storage/sfx/1493/1493.wav'; // Celebration sound
      break;
    case 'yes-correct':
      soundUrl = 'https://assets.mixkit.co/active_storage/sfx/2691/2691.wav'; // "Yes" voice sound
      break;
    default:
      return;
  }
  
  const audio = new Audio(soundUrl);
  audio.volume = 0.5; // Set volume to 50%
  audio.play().catch(err => console.error('Error playing sound:', err));
};

export default playSound;
