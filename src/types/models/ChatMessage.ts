import { User } from '@auth0/auth0-spa-js';

type ChatMessage = {
  dateCreated: number;
  author: User;
  content: string;
};

export default ChatMessage;
