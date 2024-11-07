import { useState, useEffect } from 'react';
import { styled } from '@emotion/styled';
import { Container, Box, Grid } from '@material-ui/core';
import Typography from '@components/shared/Typography';

interface ContainerProps {
  width?: string;
  height?: string;
  backgroundColor?: string;
  padding?: string;
  margin?: string;
  borderRadius?: string;
  boxShadow?: string;
  display?: string;
  flexDirection?: string;
  justifyContent?: string;
  alignItems?: string;
  [key: string]: any; // Allow for custom styles
}

const StyledContainer = styled(Box)<ContainerProps>`
  width: ${({ width }) => width || 'auto'};
  height: ${({ height }) => height || 'auto'};
  background-color: ${({ backgroundColor }) => backgroundColor || 'transparent'};
  padding: ${({ padding }) => padding || '0'};
  margin: ${({ margin }) => margin || '0'};
  border-radius: ${({ borderRadius }) => borderRadius || '0'};
  box-shadow: ${({ boxShadow }) => boxShadow || 'none'};
  display: ${({ display }) => display || 'block'};
  flex-direction: ${({ flexDirection }) => flexDirection || 'column'};
  justify-content: ${({ justifyContent }) => justifyContent || 'flex-start'};
  align-items: ${({ alignItems }) => alignItems || 'flex-start'};

  ${({ theme, ...props }) =>
    Object.entries(props).reduce(
      (acc, [key, value]) =>
        typeof value === 'string' ? `${acc} ${key}: ${value};` : acc,
      ''
    )}
`;

const useContainer = (initialProps: ContainerProps) => {
  const [containerProps, setContainerProps] = useState<ContainerProps>(initialProps);

  const updateContainerProps = (newProps: ContainerProps) => {
    setContainerProps((prevProps) => ({ ...prevProps, ...newProps }));
  };

  const getContainerProps = () => containerProps;

  const resetContainerProps = () => setContainerProps(initialProps);

  return { containerProps, updateContainerProps, getContainerProps, resetContainerProps };
};

export default useContainer;