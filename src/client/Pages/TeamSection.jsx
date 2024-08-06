import React, { useRef, useState } from 'react';
import '../index.css';

const FlipCard = () => {
  const flipContainerRef = useRef(null);
  const [isFlipped, setIsFlipped] = useState(false);

  // Handle mouse movement to rotate the card
  const handleMouseMove = (event) => {
    if (flipContainerRef.current) {
      const rect = flipContainerRef.current.getBoundingClientRect();
      const mouseX = event.clientX - rect.left;
      const mouseY = event.clientY - rect.top;
      const rotateX = (mouseY / rect.height - 0.5) * 20;
      const rotateY = -(mouseX / rect.width - 0.5) * 20;
      flipContainerRef.current.style.transform = `rotateX(${rotateX}deg) rotateY(${rotateY}deg)`;
    }
  };

  // Reset the rotation when the mouse leaves the area
  const resetRotation = () => {
    if (flipContainerRef.current) {
      flipContainerRef.current.style.transform = "";
    }
  };

  // Toggle the flip state
  const handleFlip = () => {
    setIsFlipped(prev => !prev);
  };

  // Trigger the flip action on pressing 'Enter' key
  const handleKeyDown = (event) => {
    if (event.key === 'Enter') {
      handleFlip();
    }
  };

  return (
    <div
      ref={flipContainerRef}
      onMouseMove={handleMouseMove}
      onMouseLeave={resetRotation}
      onClick={handleFlip}
      onKeyDown={handleKeyDown}
      tabIndex="0"
      className={`flip-container  relative size-64 rounded-full mt-24 cursor-pointer  transition-transform duration-500 ${isFlipped ? 'is-flipped' : ''}`}
    >
      {/* Front Side Of Card */}
      <div className={`flip-card-front absolute left-0 top-0 border-grey border-8  flex h-full w-full items-center justify-center rounded-full bg-white transition-transform duration-500 ${isFlipped ? 'opacity-0' : 'opacity-100'}`}>
        <div className='text-center'>
          {/* <h1 className='text-2xl font-bold text-grey'>Secret</h1> */}
          <h1 className='text-7xl font-bold text-grey'>☠️</h1>

        </div>
      </div>
      {/* Back Side Of Card */}
      <figcaption className={`flip-card-back absolute left-0 top-0 flex h-full w-full flex-col items-center justify-center gap-3 rounded-full bg-slate-950 bg-[url('https://blank-09.github.io/assets/img/linkedin-profile-image.jpg')] bg-cover bg-center p-4 text-slate-100 transition-transform duration-500 ${isFlipped ? 'opacity-100' : 'opacity-0'}`}>
        <div className='text-center absolute text-grey -left-60'>
          <h2 className="mb-2 text-2xl font-bold">Priyanshu</h2>
          <h3 className="text-base">Founder of Aspire Coders 👑</h3>
        </div>
      </figcaption>
    </div>
  );
};

export default FlipCard;
