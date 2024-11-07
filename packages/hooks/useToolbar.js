import { useState } from 'react';
import { Toolbar } from '@material-ui/core';
import { styled } from '@emotion/styled';
import { useAuthContext } from '../useAuthContext';
import { ToolbarStyles } from './ToolbarStyles';

const useToolbar = () => {
  const { isAuthenticated } = useAuthContext();
  const [activeSection, setActiveSection] = useState('Goals');
  const [showSearch, setShowSearch] = useState(false);
  const [showFilter, setShowFilter] = useState(false);

  const setActiveSection = (newSection) => {
    setActiveSection(newSection);
  };

  const toggleSearch = () => {
    setShowSearch(!showSearch);
  };

  const toggleFilter = () => {
    setShowFilter(!showFilter);
  };

  return { activeSection, setActiveSection, showSearch, toggleSearch, showFilter, toggleFilter };
};

export default useToolbar;