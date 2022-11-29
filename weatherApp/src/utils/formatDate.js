export const formatDate = (date) => {
  const monthDayYear = date.toTimeString().split(" ")[0];
  const monthDayYearArray = monthDayYear.split("-");
  const dateMonthDayYear = monthDayYearArray[0] + "-" + monthDayYearArray[1] + "-" + monthDayYearArray[2];
  return dateMonthDayYear;
};