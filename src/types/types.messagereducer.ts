export interface MessageReducerInitial {
  loading: boolean;
  err: boolean | string;
  message: Message | null;
  messages: Message[] | null;
}

interface IMessageContentSubcontent {
  type: "audio" | "video" | "text" | "image" | "doc";
  content: string;
}

interface IMessageContent {
  type: "audio" | "video" | "text" | "image" | "doc";
  content: string;
  subcontent: IMessageContentSubcontent;
  isReply?: boolean;
  repliedMessage?: string;
}

export interface Message {
  senderId: string;
  content: IMessageContent;
  status: "read" | "unread";
  createdAt?: Date;
  updatedAt?: Date;
  _id?: string;
  senderName?: string;
  senderProfile?: string;
  ChatId?: string;
}

export interface CreateMessagePayload {
  message: Message;
}