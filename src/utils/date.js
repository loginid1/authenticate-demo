const dateFormatter = (options) => {
  const formatter = new Intl.DateTimeFormat("en", options);
  return formatter.format(new Date());
};

export const currentDay = () => {
  return dateFormatter({
    month: "short",
    day: "numeric",
    year: "numeric",
  });
};

export const currentTime = () => {
  return dateFormatter({
    hour: "numeric",
    minute: "numeric",
  });
};

export const dayOfWeek = () => {
  return dateFormatter({
    weekday: "short",
  });
};

export const fullCurrentDay = () => {
  return `${dayOfWeek()} ${currentDay()} - ${currentTime()}`;
};
