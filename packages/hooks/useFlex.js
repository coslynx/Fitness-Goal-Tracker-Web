import { styled } from '@emotion/styled';
import { Box } from '@material-ui/core';

const useFlex = (props) => {
  const {
    direction = 'row',
    justifyContent = 'flex-start',
    alignItems = 'flex-start',
    gap = 1,
    className,
    children,
  } = props;

  // Validation
  if (!['row', 'column'].includes(direction)) {
    console.warn(
      `Invalid "direction" prop value for Flex component. Defaulting to "row".`
    );
  }

  if (
    !['flex-start', 'center', 'flex-end', 'space-between', 'space-around', 'space-evenly'].includes(
      justifyContent
    )
  ) {
    console.warn(
      `Invalid "justifyContent" prop value for Flex component. Defaulting to "flex-start".`
    );
  }

  if (
    !['flex-start', 'center', 'flex-end', 'stretch', 'baseline'].includes(
      alignItems
    )
  ) {
    console.warn(
      `Invalid "alignItems" prop value for Flex component. Defaulting to "flex-start".`
    );
  }

  if (typeof gap !== 'number' || gap < 0) {
    console.warn(
      `Invalid "gap" prop value for Flex component. Must be a non-negative number. Defaulting to "1".`
    );
  }

  const StyledFlex = styled('div')`
    display: flex;
    flex-direction: ${direction};
    justify-content: ${justifyContent};
    align-items: ${alignItems};
    gap: ${gap}rem;
  `;

  return (
    <StyledFlex className={className}>
      <Box>{children}</Box>
    </StyledFlex>
  );
};

export default useFlex;