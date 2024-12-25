module.exports = (date) => {
  const currentDate = new Date(date);
  const now = new Date();

  currentDate.setHours(
    now.getHours(),
    now.getMinutes(),
    now.getSeconds(),
    now.getMilliseconds()
  );

  return currentDate;
};
