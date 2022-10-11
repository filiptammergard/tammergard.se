import { useEffect, useState } from "react";

export const useWeeksAgo = (date: Date) => {
  const [now, setNow] = useState(new Date());

  useEffect(() => {
    const id = setInterval(() => {
      setNow(new Date());
    }, 500);
    return () => clearInterval(id);
  }, []);

  const getWeeksDiff = (start: Date, end: Date) => {
    const days = getDaysDiff(start, end);
    const weeks = days / 7;
    return weeks;
  };

  const getDaysDiff = (start: Date, end: Date) => {
    const hours = getHoursDiff(start, end);
    const days = hours / 24;
    return days;
  };

  const getHoursDiff = (start: Date, end: Date) => {
    const minutes = getMinutesDiff(start, end);
    const hours = minutes / 60;
    return hours;
  };

  const getMinutesDiff = (start: Date, end: Date) => {
    const seconds = getSecondsDiff(start, end);
    const minutes = seconds / 60;
    return minutes;
  };

  const getSecondsDiff = (start: Date, end: Date) => {
    const milliseconds = getMillisecondsDiff(start, end);
    const seconds = milliseconds / 1000;
    return seconds;
  };

  const getMillisecondsDiff = (start: Date, end: Date) => {
    return end.getTime() - start.getTime();
  };

  return getWeeksDiff(date, now).toFixed(9);
};
