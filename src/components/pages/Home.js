import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import './Home.css';
import first_image from '../../images/homepage_background.jpg';
import second_image from '../../images/placeholder.jpg';
import third_image from '../../images/password.jpg';

// function Home() {
//   const navigate = useNavigate();
//   const handleStoryClick = () => {
//     navigate(`/play?story=1`);
//   };

//   const handleFreeplayClick = () => {
//     navigate(`/freeplay`);
//   };

//   const slides = [
//     {
//       title: "The MFA Simulator",
//       description: "Learn all about different authentication methods in the Library, then try them yourself in the Story Mode or make your own log in system in Freeplay!",
//       buttons: [
//         { text: "Try Story Mode", className: "primary-button", function: handleStoryClick },
//         { text: "Freeplay", className: "secondary-button", function: handleFreeplayClick }
//       ],
//       bgImage: first_image
//     },
//     {
//       title: "Story",
//       description: "Don't know where to start? Try our pre-made story mode here and learn the basics of logging in.",
//       buttons: [{ text: "Try Story Mode", className: "primary-button", function: handleStoryClick }],
//       imgSrc: second_image
//     },
//     {
//       title: "Freeplay",
//       description: "Ready to create your own adventure? Try selecting your own authentication methods and build you own story here!",
//       buttons: [{ text: "Freeplay", className: "primary-button", function: handleFreeplayClick }],
//       imgSrc: third_image
//     }
//   ];

//   const [currentIndex, setCurrentIndex] = useState(0);

//   const nextSlide = () => {
//     setCurrentIndex((prevIndex) => (prevIndex + 1) % slides.length);
//   };

//   const prevSlide = () => {
//     setCurrentIndex((prevIndex) => (prevIndex - 1 + slides.length) % slides.length);
//   };

//   const goToSlide = (index) => {
//     setCurrentIndex(index);
//   };

//   return (
//     <div className="carousel">
//       <div className="carousel-wrapper" style={{ transform: `translateX(-${currentIndex * 100}%)` }}>
//         {slides.map((slide, index) => (
//           <div key={index} className="carousel-slide"
//               style={index === 0 ? { backgroundImage: `url(${slide.bgImage})`, color: "white" } : {}}>
//             {slide.imgSrc ? (
//               <>
//                 <img src={slide.imgSrc} alt={slide.title} />
//               </>
//             ) : (
//               <>
//               </>
//             )}
//             <div className='home-text-section'>
//               <h2>{slide.title}</h2>
//               <p>{slide.description}</p>
//               <div className='home-btns'>
//               {slide.buttons.map((button, i) => (
//                 <button key={i} className={button.className} onClick={button.function}>{button.text}</button>
//               ))}
//               </div>
//             </div>
//           </div>
//         ))}
//       </div>

//       <div className="carousel-dots">
//         {slides.map((_, index) => (
//           <span
//             key={index}
//             className={`dot ${index === currentIndex ? "active" : ""}`}
//             onClick={() => goToSlide(index)}
//           />
//         ))}
//       </div>
//     </div>
//   );
// };

// export default Home;

function Home() {
  const navigate = useNavigate();
  const handleStoryClick = () => {
    navigate(`/play?story=1`);
  };

  const handleFreeplayClick = () => {
    navigate(`/freeplay`);
  };

  return (
    <div className='home-container'>
      <div className='home-mid-section'>
        <h1>
          The MFA Simulator
        </h1>
        <p>Learn all about different authentication methods in the Library, then try them yourself in the Story Mode or make your own log in system in Freeplay!</p>
        <div className='home-btns'>
          <button className="start-button primary-button" onClick={handleStoryClick}>
            Try Story Mode &#8594;
          </button>
          <button className='secondary-button freeplay-button' onClick={handleFreeplayClick}>
            Freeplay
          </button>
        </div>
      </div>
    </div>
  );
}

export default Home;
