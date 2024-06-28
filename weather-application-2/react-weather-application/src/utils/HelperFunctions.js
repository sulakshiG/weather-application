
import { useState, useEffect } from 'react';

export function DateFormatter(timestamp){
    const formattedDate = new Date( timestamp * 1000 ).toLocaleDateString('en-US', { 
        month: 'short', 
        day: 'numeric' });
    return formattedDate; 
}

export function TimeFormatter(timestamp){
    const formattedTime = new Date( timestamp * 1000 ).toLocaleTimeString('en-US', {
        hour: 'numeric',
        minute: 'numeric',
        hour12: true }).toLowerCase();
    return formattedTime; 
}

export const getRandomPastelColor = () => {
    const hue = Math.floor(Math.random() * 360); // Random hue between 0 and 360
    const saturation = Math.floor(Math.random() * 30) + 45; // Saturation between 45% and 75%
    const lightness = Math.floor(Math.random() * 20) + 45; // Lightness between 45% and 65%
  
    return `hsl(${hue}, ${saturation}%, ${lightness}%)`;
  };


export const useResponsiveStyles = (size) => {

    const getStyles = (width, size) => {
        if (width < 768) {
            return {
                width: size === "enlarged" ? '75vw' : '70vw',
                padding: size === "enlarged" ? "1.5rem" : ".5rem",
            };
        }
        
        else if (width < 1200) {
          return {
            width: size === "enlarged" ? '75vw' : '50vw',
            padding: size === "enlarged" ? "1.5rem" : ".5rem",
          };
        } 
        else{
          return {
            width: size === "enlarged" ? '55vw' : '30vw',
            padding: size === "enlarged" ? "1.5rem" : ".5rem",
            }
        }
      };
  const [styles, setStyles] = useState(getStyles(window.innerWidth, size));

  useEffect(() => {
    const handleResize = () => {
      setStyles(getStyles(window.innerWidth, size));
    };

    window.addEventListener('resize', handleResize);

    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, [size]);


  return styles;
};
