export interface SendMessage{
    senderId: string;
    chatId: string;
    senderName: string;
    senderProfile: string;
    content: {
      type: "audio" | "video" | "text" | "image" | "doc";
      content: string;
    };
  }