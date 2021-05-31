export const currentDay = () => {
  const formatter = new Intl.DateTimeFormat("en", {
    month: "short",
    day: "numeric",
    year: "numeric",
  });

  return formatter.format(new Date());
};
