import React from 'react';
import PropTypes from 'prop-types';
import { List, ListItem, ListItemText, ListItemIcon, Divider } from '@material-ui/core'; // Version 4.12.4
import { styled } from '@emotion/styled'; // Version 11.10.5

const CustomList = styled(List)`
  &.MuiList-root {
    // Customize list styles here, using emotion's syntax
  }
`;

const List = ({ items, dense, disablePadding, onItemClick, className, ...rest }) => {
  const handleItemClick = (itemId) => {
    onItemClick && onItemClick(itemId);
  };

  if (!Array.isArray(items)) {
    console.error('Error: "items" prop must be an array.');
    return null;
  }

  if (items.some((item) => !item.id || !item.label)) {
    console.error('Error: Each item in the "items" array must have "id" and "label" properties.');
    return null;
  }

  return (
    <CustomList dense={dense} disablePadding={disablePadding} className={className} {...rest}>
      {items.length > 0 && (
        items.map((item) => (
          <React.Fragment key={item.id}>
            <ListItem button onClick={() => handleItemClick(item.id)}>
              {item.icon && <ListItemIcon>{item.icon}</ListItemIcon>}
              <ListItemText primary={item.label} />
            </ListItem>
            <Divider />
          </React.Fragment>
        ))
      )}
    </CustomList>
  );
};

List.propTypes = {
  items: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.string.isRequired,
      label: PropTypes.string.isRequired,
      icon: PropTypes.element,
    })
  ).isRequired,
  dense: PropTypes.bool,
  disablePadding: PropTypes.bool,
  onItemClick: PropTypes.func,
  className: PropTypes.string,
};

List.defaultProps = {
  dense: false,
  disablePadding: false,
};

export default List;