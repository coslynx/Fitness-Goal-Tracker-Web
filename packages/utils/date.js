import {
  format,
  parseISO,
  isBefore,
  isAfter,
  differenceInDays,
  differenceInHours,
  differenceInMinutes,
  differenceInMonths,
  differenceInSeconds,
} from 'date-fns';

export const formatDateString = (dateString, formatPattern = 'yyyy-MM-dd') => {
  if (!dateString) {
    return null;
  }
  const date = parseISO(dateString);
  if (isNaN(date.getTime())) {
    return null;
  }
  return format(date, formatPattern);
};

export const isDateBefore = (dateString1, dateString2) => {
  if (!dateString1 || !dateString2) {
    return false;
  }
  const date1 = parseISO(dateString1);
  const date2 = parseISO(dateString2);
  if (isNaN(date1.getTime()) || isNaN(date2.getTime())) {
    return false;
  }
  return isBefore(date1, date2);
};

export const isDateAfter = (dateString1, dateString2) => {
  if (!dateString1 || !dateString2) {
    return false;
  }
  const date1 = parseISO(dateString1);
  const date2 = parseISO(dateString2);
  if (isNaN(date1.getTime()) || isNaN(date2.getTime())) {
    return false;
  }
  return isAfter(date1, date2);
};

export const calculateTimeDifferenceInDays = (dateString1, dateString2) => {
  if (!dateString1 || !dateString2) {
    return 0;
  }
  const date1 = parseISO(dateString1);
  const date2 = parseISO(dateString2);
  if (isNaN(date1.getTime()) || isNaN(date2.getTime())) {
    return 0;
  }
  return differenceInDays(date2, date1); // Assuming we want the difference between date2 and date1
};

export const calculateTimeDifferenceInHours = (dateString1, dateString2) => {
  if (!dateString1 || !dateString2) {
    return 0;
  }
  const date1 = parseISO(dateString1);
  const date2 = parseISO(dateString2);
  if (isNaN(date1.getTime()) || isNaN(date2.getTime())) {
    return 0;
  }
  return differenceInHours(date2, date1);
};

export const calculateTimeDifferenceInMinutes = (dateString1, dateString2) => {
  if (!dateString1 || !dateString2) {
    return 0;
  }
  const date1 = parseISO(dateString1);
  const date2 = parseISO(dateString2);
  if (isNaN(date1.getTime()) || isNaN(date2.getTime())) {
    return 0;
  }
  return differenceInMinutes(date2, date1);
};

export const calculateTimeDifferenceInMonths = (dateString1, dateString2) => {
  if (!dateString1 || !dateString2) {
    return 0;
  }
  const date1 = parseISO(dateString1);
  const date2 = parseISO(dateString2);
  if (isNaN(date1.getTime()) || isNaN(date2.getTime())) {
    return 0;
  }
  return differenceInMonths(date2, date1);
};

export const calculateTimeDifferenceInSeconds = (dateString1, dateString2) => {
  if (!dateString1 || !dateString2) {
    return 0;
  }
  const date1 = parseISO(dateString1);
  const date2 = parseISO(dateString2);
  if (isNaN(date1.getTime()) || isNaN(date2.getTime())) {
    return 0;
  }
  return differenceInSeconds(date2, date1);
};