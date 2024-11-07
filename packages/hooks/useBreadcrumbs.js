// packages/hooks/useBreadcrumbs.js
import { useLocation, useRouteMatch } from 'react-router-dom';

const useBreadcrumbs = () => {
  const location = useLocation();
  const match = useRouteMatch();

  const breadcrumbs = [];

  switch (location.pathname) {
    case '/':
      breadcrumbs.push({ label: 'Home' });
      break;
    case '/goals':
      breadcrumbs.push({ label: 'Home' });
      breadcrumbs.push({ label: 'Goals', href: '/goals' });
      break;
    case '/goals/:goalId':
      breadcrumbs.push({ label: 'Home' });
      breadcrumbs.push({ label: 'Goals', href: '/goals' });
      breadcrumbs.push({ label: 'Goal Details', href: location.pathname });
      break;
    default:
      break;
  }

  return breadcrumbs;
};

export default useBreadcrumbs;