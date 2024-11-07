import { useState } from 'react';

/**
 * @param initialTabIndex The initial index of the active tab (default 0).
 * @param allTabs An array of objects defining the tabs, each with a label and content.
 * @returns An object containing the active tab index and a function to set the active tab.
 */
const useTabs = (initialTabIndex: number, allTabs: { label: string, content: React.ReactNode }[]) => { 
    const [activeTabIndex, setActiveTabIndex] = useState(initialTabIndex);

    const setActiveTab = (tabIndex: number) => {
        setActiveTabIndex(tabIndex);
    };

    return { activeTabIndex, setActiveTab };
};

export default useTabs;