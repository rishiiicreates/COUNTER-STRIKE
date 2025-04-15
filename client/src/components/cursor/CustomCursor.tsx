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

  // Square target indicator coordinates
  const targetSize = linkHovered ? 15 : 8;
  const targetStyles = {
    left: `${position.x - targetSize / 2}px`,
    top: `${position.y - targetSize / 2}px`,
    width: `${targetSize}px`,
    height: `${targetSize}px`,
    opacity: hidden ? 0 : 1,
    transform: clicked ? 'rotate(45deg) scale(0.8)' : 'rotate(45deg) scale(1)'
  };

  // Crosshair lines
  const lineLength = 16; 
  const lineWidth = 1;
  const horizontalLineStyles = {
    left: `${position.x - lineLength / 2}px`,
    top: `${position.y - lineWidth / 2}px`,
    width: `${lineLength}px`,
    height: `${lineWidth}px`,
    opacity: hidden ? 0 : (linkHovered ? 0 : 0.6)
  };

  const verticalLineStyles = {
    left: `${position.x - lineWidth / 2}px`,
    top: `${position.y - lineLength / 2}px`,
    width: `${lineWidth}px`,
    height: `${lineLength}px`,
    opacity: hidden ? 0 : (linkHovered ? 0 : 0.6)
  };

  return (
    <>
      {/* Square targeting element */}
      <div 
        className="cursor fixed z-[9999] pointer-events-none border border-primary"
        style={targetStyles} 
      />
      
      {/* Crosshair lines */}
      <div 
        className="cursor fixed z-[9998] pointer-events-none bg-primary"
        style={horizontalLineStyles} 
      />
      <div 
        className="cursor fixed z-[9998] pointer-events-none bg-primary"
        style={verticalLineStyles} 
      />
      
      {/* Coordinates display */}
      {!linkHovered && (
        <div 
          className="cursor fixed z-[9997] pointer-events-none font-mono text-[8px] text-primary opacity-60"
          style={{
            left: `${position.x + 16}px`,
            top: `${position.y + 16}px`,
            opacity: hidden ? 0 : 1
          }}
        >
          X:{Math.round(position.x)} Y:{Math.round(position.y)}
        </div>
      )}
    </>
  );
};

export default CustomCursor;
