import React, { useState, useEffect } from 'react';
import { Badge, Typography } from '@material-ui/core';
import { SvgIcon } from '@components/shared/SvgIcon.jsx';
import { Badge as BadgeComponent } from '@components/shared/Badge.jsx';

const useBadge = (goalType: string, progress: number, milestone: number) => {
  const [showBadge, setShowBadge] = useState(false);
  const [badgeIcon, setBadgeIcon] = useState(null);
  const [badgeMessage, setBadgeMessage] = useState(null);

  useEffect(() => {
    if (progress >= milestone) {
      setShowBadge(true);
      setBadgeIcon(<SvgIcon src="@assets/icons/AchievementIcon.svg" size={20} color="#007bff" />); 
      setBadgeMessage('Goal Achieved!');
    } else {
      setShowBadge(false);
    }
  }, [progress, milestone]); 

  return { showBadge, badgeIcon, badgeMessage };
};

export default useBadge;