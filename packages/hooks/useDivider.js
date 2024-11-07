// packages/hooks/useDivider.js
import { Divider } from '@material-ui/core'; // Version 4.12.4 - Material-UI's core Divider component
import { styled } from '@emotion/styled'; // Version 11.10.5 - For CSS-in-JS styling

const StyledDivider = styled(Divider)`
  &.MuiDivider-root {
    background-color: #e0e0e0; 
    margin: 2rem 0;
  }
`;

const useDivider = (style: object) => {
  if (style && typeof style !== 'object') {
    console.warn('Invalid style prop provided to useDivider. Expected an object.');
  }
  return <StyledDivider style={style} />; 
};

export default useDivider;