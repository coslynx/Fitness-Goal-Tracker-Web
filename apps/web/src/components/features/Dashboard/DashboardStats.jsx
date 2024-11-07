import { Grid, Typography, Box, CircularProgress } from '@material-ui/core';
import { Chart as ChartJS, CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend } from 'chart.js';
import { Bar } from 'react-chartjs-2';
import { format } from 'date-fns';
import { GOAL_TYPE } from '@constants';
import styles from './DashboardStats.module.css';

const DashboardStats = ({ goals, type }) => {
  const filteredGoals = goals.filter((goal) => goal.type === type);

  const chartData = {
    labels: filteredGoals.map((goal) => goal.title),
    datasets: [
      {
        label: `Progress for ${GOAL_TYPE[type]} Goals`,
        data: filteredGoals.map((goal) => goal.progress),
        backgroundColor: 'rgba(54, 162, 235, 0.2)',
        borderColor: 'rgba(54, 162, 235, 1)',
        borderWidth: 1,
      },
    ],
  };

  const chartOptions = {
    responsive: true,
    plugins: {
      legend: {
        position: 'top',
      },
      title: {
        display: true,
        text: `Progress for ${GOAL_TYPE[type]} Goals`,
      },
    },
  };

  ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend);

  return (
    <Grid container spacing={2} className={styles.statsContainer}>
      <Grid item xs={12}>
        <Typography variant="h6" gutterBottom>
          {GOAL_TYPE[type]} Goals
        </Typography>
      </Grid>
      <Grid item xs={12}>
        <Bar data={chartData} options={chartOptions} />
      </Grid>
    </Grid>
  );
};

export default DashboardStats;