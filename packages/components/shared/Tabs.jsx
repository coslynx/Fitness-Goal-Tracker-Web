import React, { useState } from 'react';
import { Tabs, Tab, Typography, Box } from '@material-ui/core';
import { styled } from '@emotion/styled';
import PropTypes from 'prop-types';

const StyledTabs = styled(Tabs)`
  .MuiTabs-indicator {
    background-color: #007bff; /* Blue */
  }

  .MuiTab-root {
    color: #fff; /* White */
    text-transform: none; /* Remove default uppercase */

    &.Mui-selected {
      color: #fff; /* White */
      fontWeight: bold;
    }
  }
`;

const Tabs = ({ tabs, value, onChange, className, ...rest }) => {
  const [activeTab, setActiveTab] = useState(value);

  const handleChange = (event, newValue) => {
    setActiveTab(newValue);
    onChange && onChange(newValue);
  };

  return (
    <Box className={className} {...rest}>
      <StyledTabs value={activeTab} onChange={handleChange} variant="scrollable" scrollButtons="auto">
        {tabs.map((tab, index) => (
          <Tab key={index} label={tab.label} />
        ))}
      </StyledTabs>
      {tabs.map((tab, index) => (
        <Box key={index} role="tabpanel" hidden={activeTab !== index} id={`tab-${index}`}>
          {tab.content}
        </Box>
      ))}
    </Box>
  );
};

Tabs.propTypes = {
  tabs: PropTypes.arrayOf(
    PropTypes.shape({
      label: PropTypes.string.isRequired,
      content: PropTypes.node.isRequired,
    })
  ).isRequired,
  value: PropTypes.number,
  onChange: PropTypes.func,
  className: PropTypes.string,
};

export default Tabs;