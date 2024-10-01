import { Link } from "react-router-dom"
import React, { useEffect, useRef, useState } from 'react';

const Card = ({ movie, type }) => {
  const [isVisible, setIsVisible] = useState(false);
  const fadeInRef = useRef();

  // This effect will run when the component mounts to handle the scroll event listener
  useEffect(() => {
    const handleScroll = () => {
      const elementPosition = fadeInRef.current.getBoundingClientRect().top;
      const windowHeight = window.innerHeight;

      // Check if the element is in the viewport
      if (elementPosition <= windowHeight - 100) { // Extra offset for better timing
        setIsVisible(true);
      }
    };

    // Add event listener for scroll
    window.addEventListener('scroll', handleScroll);

    // Clean up the event listener on unmount
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  return (
    <div  
    ref={fadeInRef}
    className={`{fade-in-element ${isVisible ? 'visible' : ''} card bg-base-100 w-80 shadow-xl custom-card fade-in-element content`}>
      <figure>
        <img
          className="object-cover w-80"
          src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`}
          alt="movie" />
      </figure>
      <div className="card-body">
        <h2 className="card-title">{movie.title}</h2>
        <p>{`Release : ${type === "movie" ? movie.release_date : movie.first_air_date}`}</p>
        <div className="card-actions justify-begin">
          {type === 'movie' ? <Link to={`/movie/${movie.id}`} className="btn btn-primary">More Details</Link> :
            <Link to={`/serie/${movie.id}`} className="btn btn-primary">More Details</Link>}
        </div>
      </div>
    </div>
  )
}
export default Card