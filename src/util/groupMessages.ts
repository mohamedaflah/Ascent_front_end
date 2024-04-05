import { Message } from "@/types/types.messagereducer";
import { formatDateAndTime } from "./formateDate";

interface GroupedMessages {
  [key: string]: Message[];
}
export const groupMessagesByDate = (
  messages: Message[] | null
): GroupedMessages => {
  if (!messages) {
    return {};
  }
  return messages.reduce<GroupedMessages>((groups, message) => {
    // Convert message date to a readable string format, e.g., 'March 20, 2024'
    const date = formatDateAndTime(
      message.createdAt as string | number | Date
    ).date;

    // If the group for this date doesn't exist, create it
    if (!groups[date]) {
      groups[date] = [];
    }

    // Add the current message to the group
    groups[date].push(message);

    return groups;
  }, {});
};
