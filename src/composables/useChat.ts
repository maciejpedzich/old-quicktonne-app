import { computed, reactive, ref } from 'vue';
import { useRoute } from 'vue-router';
import { User } from '@auth0/auth0-spa-js';

import useAuth0 from './useAuth0';

import UseChatState from '@/types/states/UseChat';
import ChatMessage from '@/types/models/ChatMessage';
import socket from '@/socket';

const state = reactive<UseChatState>({ messages: [] });

export default function useChat() {
  const route = useRoute();
  const { currentUser } = useAuth0();

  const messageContent = ref('');

  const messages = computed(() => state.messages);
  const messageLength = computed(() => messageContent.value.length);

  const addMessage = (message: ChatMessage) => state.messages.push(message);
  const clearMessages = () => (state.messages = []);

  const sendAndPushMessage = () => {
    if (messageContent.value.length > 0 && messageContent.value.length < 300) {
      const incomingChatMessage: ChatMessage = {
        dateCreated: Date.now(),
        author: currentUser.value as User,
        content: messageContent.value
      };

      addMessage(incomingChatMessage);
      socket.emit(
        'incomingChatMessage',
        route.params.roomId,
        incomingChatMessage
      );

      messageContent.value = '';
    }
  };

  const addNewMessagesListener = () => socket.on('newChatMessage', addMessage);

  return {
    messageContent,
    messageLength,
    messages,
    sendAndPushMessage,
    clearMessages,
    addNewMessagesListener
  };
}
