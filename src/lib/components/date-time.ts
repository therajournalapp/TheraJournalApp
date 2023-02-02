const monthNames = [
  "January",
  "February",
  "March",
  "April",
  "May",
  "June",
  "July",
  "August",
  "September",
  "October",
  "November",
  "December"
];
const monthDays = [31, 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31];
const isLeapYear = (year: number) => year % 4 === 0;
const getEmptyRows = () => {
  return Array.from({ length: 42 }).map(() => []);
};
const getMonthDays = (index: number, year: number) => {
  return index !== 1 ? monthDays[index] : isLeapYear(year) ? 29 : 28;
};

const getMonthStats = (monthIndex: number, year: number) => {
  const today = new Date(year, monthIndex, 1);
  const index: any = today.getMonth();
  return {
    name: index[index],
    days: getMonthDays(index, year)
  };
};

export const getMonthName = (index: number) => monthNames[index];

export const getDateRows = (monthIndex: number, year: number) => {
  const { days } = getMonthStats(monthIndex, year);
  const rows: any = getEmptyRows();
  const startIndex = new Date(year, monthIndex, 1).getDay();
  Array.from({ length: days }).forEach((_, i) => {
    const index = startIndex + i;
    rows[index] = i + 1;
  });
  const filled = rows.map((i: number) => (Array.isArray(i) ? undefined : i));

  return filled[35] ? filled : filled.slice(0, -7);
};

export const noop = () => {};

export const uuid = (() => {
  let id = 1;
  return () => {
    return ++id;
  };
})();
