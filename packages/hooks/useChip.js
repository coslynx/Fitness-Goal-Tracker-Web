import { Chip } from '@material-ui/core';
import { styled } from '@emotion/styled';
import PropTypes from 'prop-types';

const StyledChip = styled(Chip)`
  &.MuiChip-root {
    // Add your custom styles here.
    // Ensure it matches the design and styling of your MVP.
    // For example:
    // backgroundColor: ${props => props.color || '#007bff'}; // Use a dynamic color
    // color: ${props => props.textColor || 'white'}; // Customize the text color
    // fontSize: '1rem'; // Set a custom font size 
    // padding: '0.5rem 1rem'; // Adjust the padding
  }
`;

const useChip = (props) => {
  const {
    label,
    onDelete,
    clickable,
    onClick,
    variant = 'default',
    color = 'primary',
    size = 'medium',
    ...rest
  } = props;

  return (
    <StyledChip
      label={label}
      onDelete={onDelete && ((event) => {
        event.stopPropagation();
        onDelete(event); // Trigger the onDelete callback
      })}
      clickable={clickable}
      onClick={clickable ? onClick : undefined} // Only trigger if clickable
      variant={variant}
      color={color}
      size={size}
      {...rest}
    />
  );
};

useChip.propTypes = {
  label: PropTypes.string.isRequired,
  onDelete: PropTypes.func,
  clickable: PropTypes.bool,
  onClick: PropTypes.func,
  variant: PropTypes.oneOf(['default', 'outlined', 'filled']),
  color: PropTypes.oneOf(['primary', 'secondary', 'default', 'error']),
  size: PropTypes.oneOf(['small', 'medium', 'large']),
};

export default useChip;