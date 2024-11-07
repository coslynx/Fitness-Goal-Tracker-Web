import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { Accordion, AccordionSummary, AccordionDetails } from '@material-ui/core';
import { styled } from '@emotion/styled';
import { Typography } from '@components/shared/Typography';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';

const StyledAccordion = styled(Accordion)`
  &.MuiAccordion-root {
    border: 1px solid rgba(0, 0, 0, 0.12);
    boxShadow: none;
    margin-bottom: 1rem;
  }

  &.Mui-expanded {
    margin-bottom: 1rem;
  }

  &.MuiAccordion-root:last-child {
    margin-bottom: 0;
  }

  &.MuiAccordionSummary-root {
    background-color: #f5f5f5;
    padding: 1rem;
  }
`;

const Accordion = ({ sections, expandedIndex, className, ...rest }) => {
  const [expanded, setExpanded] = useState(expandedIndex || null);

  return (
    <StyledAccordion className={className} {...rest}>
      {sections.map((section, index) => (
        <React.Fragment key={index}>
          <AccordionSummary
            expandIcon={<ExpandMoreIcon />}
            aria-controls={`panel${index}`}
            id={`panel${index}header`}
            onClick={() => setExpanded(expanded === index ? null : index)}
            expanded={expanded === index}
          >
            <Typography variant="h6">{section.header}</Typography>
          </AccordionSummary>
          <AccordionDetails>
            <Typography variant="body1">{section.content}</Typography>
          </AccordionDetails>
        </React.Fragment>
      ))}
    </StyledAccordion>
  );
};

Accordion.propTypes = {
  sections: PropTypes.arrayOf(
    PropTypes.shape({
      header: PropTypes.string.isRequired,
      content: PropTypes.node.isRequired,
    })
  ).isRequired,
  expandedIndex: PropTypes.number,
  className: PropTypes.string,
};

export default Accordion;