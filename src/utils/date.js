const dateFormatter = (options, date = new Date()) => {
  const formatter = new Intl.DateTimeFormat("en", options);
  return formatter.format(date);
};

export const getDay = (date) => {
  return dateFormatter(
    {
      month: "short",
      day: "numeric",
      year: "numeric",
    },
    date
  );
};

export const getTime = (date) => {
  return dateFormatter(
    {
      hour: "numeric",
      minute: "numeric",
    },
    date
  );
};

export const getDayOfWeek = (date) => {
  return dateFormatter(
    {
      weekday: "short",
    },
    date
  );
};

export const fullDay = (date) => {
  return `${getDayOfWeek(date)} ${getDay(date)} - ${getTime(date)}`;
};
