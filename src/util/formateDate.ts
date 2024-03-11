export function formatDateAndTime(dateInput: string | number | Date): { date: string; time: string } {
  const now = new Date();
  const date = new Date(dateInput);
  const timeDiffInSeconds = (now.getTime() - date.getTime()) / 1000;
  const minutesAgo = Math.floor(timeDiffInSeconds / 60);
  const hoursAgo = Math.floor(timeDiffInSeconds / 3600);

  // Handling the date part
  let formattedDate: string;
  if (date.toDateString() === now.toDateString()) {
      formattedDate = "Today";
  } else if (new Date(now.getTime() - 86400000).toDateString() === date.toDateString()) {
      formattedDate = "Yesterday";
  } else {
      formattedDate = new Intl.DateTimeFormat('en-IN', {
          day: '2-digit',
          month: '2-digit',
          year: 'numeric',
      }).format(date);
  }

  // Handling the time part
  let formattedTime: string;
  if (minutesAgo < 1) {
      formattedTime = "now";
  } else if (minutesAgo < 60) {
      formattedTime = `${minutesAgo} minute${minutesAgo > 1 ? "s" : ""} ago`;
  } else if (hoursAgo < 24) {
      formattedTime = `${hoursAgo} hour${hoursAgo > 1 ? "s" : ""} ago`;
  } else {
      // For time beyond yesterday, show the exact time
      formattedTime = new Intl.DateTimeFormat('en-IN', {
          hour: '2-digit',
          minute: '2-digit',
          hour12: true,
          timeZone: 'Asia/Kolkata',
      }).format(date);
  }

  return { date: formattedDate, time: formattedTime };
}


