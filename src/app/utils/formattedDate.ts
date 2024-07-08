export const formatDate = (date: Date | null) => {
  if (date) {
    const year = new Date(date).getFullYear();
    const month = new Date(date).getMonth();
    const day = new Date(date).getDate();
    return `${year}-${month}-${day}`;
  } else {
    return '';
  }
};

export const daysAfter = (startDate: Date, endDate: Date): number => {
  const millisecondsPerDay = 24 * 60 * 60 * 1000;

  const startMillis = startDate.getTime();
  const endMillis = endDate.getTime();

  const dayDifference = Math.round(
    (endMillis - startMillis) / millisecondsPerDay,
  );

  return dayDifference;
};
