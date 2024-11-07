import React from 'react';
import PropTypes from 'prop-types';
import { Breadcrumbs, Link, Typography } from '@material-ui/core';
import styled from '@emotion/styled';

const StyledBreadcrumbs = styled(Breadcrumbs)`
  &.MuiBreadcrumbs-root {
    /* Add custom styles for the Breadcrumbs component here. */
  }
`;

const Breadcrumbs = ({ items, separator, className }) => {
  if (!Array.isArray(items) || items.length === 0) {
    // Handle invalid input gracefully (e.g., display a warning message)
    return null;
  }

  return (
    <StyledBreadcrumbs aria-label="breadcrumb" className={className} separator={separator}>
      {items.map((item, index) => (
        item.href ? (
          <Link href={item.href} key={index}>
            {item.label}
          </Link>
        ) : (
          <Typography key={index}>{item.label}</Typography>
        )
      ))}
    </StyledBreadcrumbs>
  );
};

Breadcrumbs.propTypes = {
  items: PropTypes.arrayOf(
    PropTypes.shape({
      label: PropTypes.string.isRequired,
      href: PropTypes.string,
    })
  ).isRequired,
  separator: PropTypes.string,
  className: PropTypes.string,
};

Breadcrumbs.defaultProps = {
  separator: '/',
};

export default Breadcrumbs;