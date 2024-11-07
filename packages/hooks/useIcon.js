// packages/hooks/useIcon.js

import { useState, useMemo } from 'react';
import SvgIcon from '@components/shared/SvgIcon.jsx';
import { COLORS } from '@constants/index.js';
import { iconMapping } from '@utils/icons.js'; // Adjust the path if needed

const useIcon = ({ name, size = 24, color = COLORS.PRIMARY, title, className }: { 
  name: string;
  size?: number | string;
  color?: string;
  title?: string;
  className?: string;
}) => {
  const [error, setError] = useState(null); 

  const iconSrc = iconMapping(name); // Get the icon path based on the name prop

  const svgElement = useMemo(() => {
    if (!iconSrc) {
      setError(new Error(`Icon with name "${name}" not found.`));
      return null; // Return null if the icon is not found
    }

    return (
      <SvgIcon src={iconSrc} size={size} color={color} title={title} className={className} />
    );
  }, [iconSrc, size, color, title, className]);

  const handleError = (event: any) => {
    setError(event);
    console.error("SVG Icon Error:", event);
  };

  return { SvgIcon: svgElement, error, handleError };
};

export default useIcon;