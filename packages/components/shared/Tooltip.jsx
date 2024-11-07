import React from 'react';
import PropTypes from 'prop-types';
import { Tooltip } from '@material-ui/core';
import { styled } from '@emotion/styled';

const StyledTooltip = styled(Tooltip)`
  &.MuiTooltip-tooltip {
    background-color: #fff;
    color: #000;
    padding: 1rem;
    border-radius: 4px;
    box-shadow: 0 2px 4px rgba(0, 0, 0, 0.2);
  }
`;

const Tooltip = ({ title, placement, arrow, children, className, ...rest }) => {
  if (!title) {
    console.warn('Tooltip requires a "title" prop to display content.');
    return null;
  }

  if (!placement || !['top', 'bottom', 'left', 'right'].includes(placement)) {
    console.warn('Tooltip requires a valid "placement" prop. Defaulting to "top".');
    placement = 'top';
  }

  if (!children) {
    console.warn('Tooltip requires a "children" prop to associate the tooltip with a target element.');
    return null;
  }

  return (
    <StyledTooltip
      title={title}
      placement={placement}
      arrow={arrow}
      className={className}
      {...rest}
    >
      {children}
    </StyledTooltip>
  );
};

Tooltip.propTypes = {
  title: PropTypes.string.isRequired,
  placement: PropTypes.oneOf(['top', 'bottom', 'left', 'right']),
  arrow: PropTypes.bool,
  children: PropTypes.element.isRequired,
  className: PropTypes.string,
};

Tooltip.defaultProps = {
  placement: 'top',
  arrow: true,
};

export default Tooltip;