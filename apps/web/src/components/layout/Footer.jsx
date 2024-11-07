import React from 'react';
import { Typography, Link, Container } from '@material-ui/core';
import { useAuth } from '@hooks/useAuthContext';
import styles from './Footer.module.css';

const Footer = () => {
  const { user } = useAuth();

  return (
    <footer className={styles.footer}>
      <Container maxWidth="lg">
        <Typography variant="body2" align="center" color="textSecondary">
          &copy; {new Date().getFullYear()} Fitness Goal Tracker
        </Typography>
        <Typography variant="body2" align="center" color="textSecondary">
          <Link href="https://www.example.com/privacy-policy">Privacy Policy</Link>{' '}
          |{' '}
          <Link href="https://www.example.com/terms-of-service">Terms of Service</Link>
        </Typography>
      </Container>
    </footer>
  );
};

export default Footer;