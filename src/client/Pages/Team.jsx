import React, { useState,useRef } from "react";
import Confetti from 'react-confetti'; // Import Confetti
import kabi from '../assets/team/kabi.png';
import karthi from '../assets/team/karthi.png';
import Navbar from "../Components/Navbar";
import Footer from "../Components/Footer";
import '../index.css';


const teamMembers = [
  {
    id: 1,
    image: "https://ramana2130.github.io/portfolio/assets/mypic-d662ba56.jpg",
    name: "RAMANA ",
    profession: "BackEnd Developer 🖥",
  },
  {
    id: 2,
    image: kabi,
    name: "Kabilash",
    profession: "FrontEnd Developer 🎯",
  },
  {
    id: 3,
    image: karthi,
    name: "Karthi Keyan",
    profession: "FrontEnd Developer 🎯",
  },
];

const Team = () => {
  const [confetti, setConfetti] = useState(false);

  const handleTeamSectionClick = () => {
    setConfetti(true);
    setTimeout(() => setConfetti(false), 2000); // Hide confetti after 3 seconds
  };
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
    <div className="py-2 bg">
      <Confetti
        width={window.innerWidth}
        height={window.innerHeight}
        numberOfPieces={confetti ? 800 : 0} // Trigger confetti only when `confetti` is true
      />
      <div className="container mx-auto">
        <Navbar />
        <div className="flex flex-col items-center justify-center px-5 py-8 text-slate-800 xl:px-10 xl:py-28 dark:text-slate-100">
          <div className="mb-16 text-center md:mb-32">
            <h2 className="mb-6 text-xl text-grey font-extrabold md:text-4xl lg:text-7xl">Our Team</h2>
            <p className="text-grey">
              We're fueled by a passion for our work and a belief in making a positive impact. Let our team's dedication and drive accelerate your success.
            </p>
          </div>
          <div className="flex flex-col md:ml-12 md:flex-row">
            {teamMembers.map((member) => (
              <div key={member.id}>
                <div
                  className="group relative -mb-6 -ml-0 flex justify-start rounded-full border-4 border-white transition-all duration-300 ease-in-out hover:-translate-x-20 md:-mb-0 md:-ml-12 md:justify-center md:hover:-translate-x-0 md:hover:-translate-y-6 xl:border-8"
                >
                  <div
                    className="absolute left-6 top-7 w-full text-left opacity-0 transition-all duration-300 ease-linear group-hover:translate-x-24 group-hover:opacity-100 md:-top-12 md:left-0 md:text-center md:group-hover:-translate-y-6 md:group-hover:translate-x-0"
                  >
                    <h3 className="text-base text-grey font-semibold xl:text-xl">{member.name}</h3>
                    <h4 className="text-nowrap text-grey text-sm xl:text-base">{member.profession}</h4>
                  </div>
                  <img
                    src={member.image}
                    className="size-28 rounded-full object-cover lg:size-32 xl:size-48 2xl:size-60"
                    alt="Team Member"
                  />
                </div>
              </div>
            ))}
          </div>
          <div className="flex justify-between items-start w-[600px] mt-10">
            <h2 className="mt-10 text-xl text-grey font-extrabold md:text-4xl lg:text-3xl">Inspired By</h2>
            <div >
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
      <div onClick={handleTeamSectionClick} className={`flip-card-front absolute left-0 top-0 border-grey border-8  flex h-full w-full items-center justify-center rounded-full bg-white transition-transform duration-500 ${isFlipped ? 'opacity-0' : 'opacity-100'}`}>
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
            </div>
          </div>
        </div>
        <Footer />
      </div>
    </div>
  );
};

export default Team;
