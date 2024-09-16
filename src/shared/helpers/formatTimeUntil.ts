export const formatTimeUntil = (timestamp: number): string => {
  // Получаем текущее время в миллисекундах
  const now = new Date();
  const utcTime = new Date(timestamp);

  // Вычисляем разницу между текущим временем и переданным timestamp
  const difference = utcTime.getTime() - now.getTime();

  //   console.log(difference);

  // Если разница меньше 0, возвращаем 0:00, так как время уже прошло
  if (difference < 0) {
    return "0:00";
  }

  // Вычисляем минуты и секунды до указанного времени
  const totalSeconds = Math.floor(difference / 1000);
  const minutes = Math.floor(totalSeconds / 60);
  const seconds = totalSeconds % 60;

  // Форматируем строку, добавляя ноль перед единичными значениями, если нужно
  return `${minutes}:${String(seconds).padStart(2, "0")}`;
};
