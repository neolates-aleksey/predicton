export const formatTimeUntil = (timestamp: number): string => {
  const now = new Date();
  const utcTime = new Date(timestamp);

  const difference = utcTime.getTime() - now.getTime();

  if (difference < 0) {
    return "0:00";
  }

  const totalSeconds = Math.floor(difference / 1000);
  const minutes = Math.floor(totalSeconds / 60);
  const seconds = totalSeconds % 60;

  return `${minutes}:${String(seconds).padStart(2, "0")}`;
};
