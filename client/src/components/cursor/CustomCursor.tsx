import { useState, useEffect } from 'react';

const CustomCursor = () => {
  const [position, setPosition] = useState({ x: 0, y: 0 });
  const [hidden, setHidden] = useState(true);
  const [clicked, setClicked] = useState(false);
  const [linkHovered, setLinkHovered] = useState(false);

  useEffect(() => {
    const addEventListeners = () => {
      document.addEventListener('mousemove', onMouseMove);
      document.addEventListener('mouseenter', onMouseEnter);
      document.addEventListener('mouseleave', onMouseLeave);
      document.addEventListener('mousedown', onMouseDown);
      document.addEventListener('mouseup', onMouseUp);
    };

    const removeEventListeners = () => {
      document.removeEventListener('mousemove', onMouseMove);
      document.removeEventListener('mouseenter', onMouseEnter);
      document.removeEventListener('mouseleave', onMouseLeave);
      document.removeEventListener('mousedown', onMouseDown);
      document.removeEventListener('mouseup', onMouseUp);
    };

    const onMouseMove = (e: MouseEvent) => {
      setPosition({ x: e.clientX, y: e.clientY });
    };

    const onMouseEnter = () => {
      setHidden(false);
    };

    const onMouseLeave = () => {
      setHidden(true);
    };

    const onMouseDown = () => {
      setClicked(true);
    };

    const onMouseUp = () => {
      setClicked(false);
    };

    const handleLinkHoverEvents = () => {
      document.querySelectorAll('a, button, [role="button"], input[type="submit"], input[type="button"]').forEach(element => {
        element.addEventListener('mouseenter', () => setLinkHovered(true));
        element.addEventListener('mouseleave', () => setLinkHovered(false));
      });
    };

    addEventListeners();
    handleLinkHoverEvents();

    return () => {
      removeEventListeners();
    };
  }, []);

  // For touch devices, hide the custom cursor
  useEffect(() => {
    const isTouchDevice = 'ontouchstart' in window || navigator.maxTouchPoints > 0;
    if (isTouchDevice) {
      setHidden(true);
    }
  }, []);

  const cursorDotStyles = {
    left: `${position.x}px`,
    top: `${position.y}px`,
    opacity: hidden ? 0 : 1,
    transform: clicked ? 'scale(0.8)' : 'scale(1)'
  };

  const cursorOutlineStyles = {
    left: `${position.x - 12}px`,
    top: `${position.y - 12}px`,
    opacity: hidden ? 0 : 1,
    transform: clicked ? 'scale(1.2)' : (linkHovered ? 'scale(1.5)' : 'scale(1)')
  };

  return (
    <>
      <div 
        className={`cursor cursor-dot fixed z-[9999] pointer-events-none rounded-full bg-primary`} 
        style={cursorDotStyles} 
      />
      <div 
        className={`cursor cursor-outline fixed z-[9999] pointer-events-none rounded-full border-2 border-primary`} 
        style={cursorOutlineStyles} 
      />
    </>
  );
};

export default CustomCursor;
