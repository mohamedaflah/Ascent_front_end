import { formatDateAndTime } from '@/util/formateDate';
import { useState, useEffect } from 'react';

export function useTimeAgo(timestamp: string | number | Date): string {
  const [timeAgo, setTimeAgo] = useState('');

  useEffect(() => {
    function update() {
      const date = new Date(timestamp);
      const now = new Date();
      const diffInSeconds = Math.round((now.getTime() - date.getTime()) / 1000);
      const minutes = Math.floor(diffInSeconds / 60);
      const hours = Math.floor(diffInSeconds / 3600);

      if (diffInSeconds < 60) {
        setTimeAgo('now');
      } else if (minutes < 60) {
        setTimeAgo(`${minutes} min${minutes > 1 ? 's' : ''} ago`);
      } else if (hours < 24) {
        setTimeAgo(`${hours} hour${hours > 1 ? 's' : ''} ago`);
      } else {
        // For simplicity, use the existing formatDateAndTime for dates beyond yesterday.
        // You might need to adjust it based on your needs.
        setTimeAgo(formatDateAndTime(date).time);
      }
    }

    update(); // Initial update
    const intervalId = setInterval(update, 60000); // Update every minute

    return () => clearInterval(intervalId); // Cleanup on unmount
  }, [timestamp]);

  return timeAgo;
}
