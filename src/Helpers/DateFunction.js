import dateFormat, { masks } from "dateformat";

export const formatDate = (timestamp) => {
  const now = new Date();
  const date = new Date(timestamp);

  const isToday = date.toDateString() === now.toDateString();
  const isYesterday =
    new Date(
      now.getFullYear(),
      now.getMonth(),
      now.getDate() - 1
    ).toDateString() === date.toDateString();
  const daysAgo = Math.floor((now - date) / (1000 * 60 * 60 * 24));

  if (isToday) {
    return dateFormat(date, "h:MM TT");
  } else if (isYesterday) {
    return "Yesterday";
  } else if (daysAgo < 7) {
    return dateFormat(date, "dddd");
  } else {
    return dateFormat(date, "dd-mm-yyyy");
  }
};