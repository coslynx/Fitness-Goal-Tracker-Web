// packages/hooks/usePaper.js
import { useState, useMemo } from 'react';
import { Paper as MuiPaper } from '@material-ui/core';
import { styled } from '@emotion/styled';
import { COLORS } from '@constants'; 

const StyledPaper = styled(MuiPaper)`
  background-color: ${props => props.bgColor || COLORS.LIGHT_GRAY}; 
  padding: 1rem; 
  margin-bottom: 1rem; 
  border-radius: 4px;

  &:hover {
    box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
  }
`;

const usePaper = (props: { bgColor?: string, elevation?: number, padding?: string, className?: string }) => {
  const [open, setOpen] = useState(false); 

  const handleOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const styledPaper = useMemo(() => (
    <StyledPaper
      bgColor={props.bgColor}
      elevation={props.elevation}
      padding={props.padding}
      className={props.className}
    >
      {props.children}
    </StyledPaper>
  ), [props.bgColor, props.elevation, props.padding, props.className]);

  return {
    StyledPaper: styledPaper,
    open,
    handleOpen,
    handleClose,
  };
};

export default usePaper;