import React from 'react';

interface PlaceholderImageProps {
  width?: number | string;
  height?: number | string;
  text?: string;
  className?: string;
  color?: string;
  bgColor?: string;
}

const PlaceholderImage: React.FC<PlaceholderImageProps> = ({
  width = '100%',
  height = '200px',
  text = 'Image Placeholder',
  className = '',
  color = 'hsl(var(--primary))',
  bgColor = 'hsl(var(--card))',
}) => {
  const styles = {
    container: {
      width,
      height,
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      flexDirection: 'column' as const,
      backgroundColor: bgColor,
      color,
      borderLeft: `2px solid ${color}`,
      padding: '16px',
      position: 'relative' as const,
      overflow: 'hidden'
    },
    grid: {
      position: 'absolute' as const,
      top: 0,
      left: 0,
      right: 0,
      bottom: 0,
      backgroundImage: 
        `linear-gradient(${color}10 1px, transparent 1px),
        linear-gradient(90deg, ${color}10 1px, transparent 1px)`,
      backgroundSize: '20px 20px',
      opacity: 0.3,
      zIndex: 0
    },
    content: {
      position: 'relative' as const,
      zIndex: 1,
      textAlign: 'center' as const
    },
    identifier: {
      fontSize: '0.75rem',
      opacity: 0.7,
      marginTop: '8px'
    }
  };

  // Generate a unique-ish identifier for each placeholder
  const identifier = Math.floor(Math.random() * 1000000).toString(16).toUpperCase();

  return (
    <div style={styles.container} className={className}>
      <div style={styles.grid}></div>
      <div style={styles.content}>
        <svg width="48" height="48" viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="1.5">
          <rect x="3" y="3" width="18" height="18" rx="2" />
          <circle cx="8.5" cy="8.5" r="1.5" />
          <path d="M20 15l-5-5L5 20" />
        </svg>
        <div>{text}</div>
        <div style={styles.identifier}>[ID: {identifier}]</div>
      </div>
    </div>
  );
};

export default PlaceholderImage;