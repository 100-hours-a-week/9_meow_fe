export const calculateTimeLeft = (endTimestamp: Date) => {
  const now = new Date().getTime();
  const end = endTimestamp.getTime();
  const difference = end - now;

  if (difference <= 0) {
    return "00 : 00 : 00";
  }

  const hours = Math.floor(difference / (1000 * 60 * 60));
  const minutes = Math.floor((difference % (1000 * 60 * 60)) / (1000 * 60));
  const seconds = Math.floor((difference % (1000 * 60)) / 1000);

  const formattedHours = hours.toString().padStart(2, "0");
  const formattedMinutes = minutes.toString().padStart(2, "0");
  const formattedSeconds = seconds.toString().padStart(2, "0");

  return `${formattedHours} : ${formattedMinutes} : ${formattedSeconds}`;
};
