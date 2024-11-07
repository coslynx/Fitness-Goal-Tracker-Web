import { useState } from 'react';
import { styled } from '@emotion/styled';
import Box from '@components/shared/Box.jsx'; 

const useBox = () => {
  const [boxProps, setBoxProps] = useState({
    width: 'auto', 
    height: 'auto',
    backgroundColor: 'transparent',
    padding: '0', 
    margin: '0', 
    borderRadius: '0', 
    boxShadow: 'none',
    display: 'block', 
    flexDirection: 'column',
    justifyContent: 'flex-start', 
    alignItems: 'flex-start',
  });

  const StyledBox = styled(Box)<{ theme: any; ... }>`
    width: ${props => props.boxProps.width};
    height: ${props => props.boxProps.height};
    background-color: ${props => props.boxProps.backgroundColor};
    padding: ${props => props.boxProps.padding};
    margin: ${props => props.boxProps.margin};
    border-radius: ${props => props.boxProps.borderRadius};
    box-shadow: ${props => props.boxProps.boxShadow};
    display: ${props => props.boxProps.display};
    flex-direction: ${props => props.boxProps.flexDirection};
    justify-content: ${props => props.boxProps.justifyContent};
    align-items: ${props => props.boxProps.alignItems};
  `;

  const updateProps = (newProps: any) => {
    setBoxProps((prevProps) => ({ ...prevProps, ...newProps }));
  }; 

  const resetProps = () => {
    setBoxProps({
      width: 'auto', 
      height: 'auto',
      backgroundColor: 'transparent',
      padding: '0', 
      margin: '0', 
      borderRadius: '0', 
      boxShadow: 'none',
      display: 'block', 
      flexDirection: 'column',
      justifyContent: 'flex-start', 
      alignItems: 'flex-start',
    });
  };

  return { StyledBox, updateProps, resetProps };
}; 

export default useBox;