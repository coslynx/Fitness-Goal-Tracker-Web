// packages/hooks/useAccordion.js

import { useState } from 'react';
import { Accordion, AccordionSummary, AccordionDetails, Typography } from '@material-ui/core';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';

const useAccordion = (sections: { header: string, content: React.ReactNode }[]) => {
  if (!Array.isArray(sections)) {
    throw new Error('Invalid sections prop. Expected an array of objects.');
  }

  const [expanded, setExpanded] = useState<number[]>([]);

  const toggleSection = (index: number) => {
    if (index < 0 || index >= sections.length) {
      throw new Error('Invalid section index provided to toggleSection.');
    }

    setExpanded((prevExpanded) => {
      if (prevExpanded.includes(index)) {
        return prevExpanded.filter((i) => i !== index);
      } else {
        return [...prevExpanded, index];
      }
    });
  };

  const isSectionExpanded = (index: number) => {
    if (index < 0 || index >= sections.length) {
      throw new Error('Invalid section index provided to isSectionExpanded.');
    }
    return expanded.includes(index);
  };

  return { expanded, toggleSection, isSectionExpanded };
};

export default useAccordion;