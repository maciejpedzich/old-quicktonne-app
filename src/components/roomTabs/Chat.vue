<template>
  <p class="mx-5 pb-2 text-center border-bottom-1 border-200">
    No mic? No problem - drop a message here!
  </p>
  <div class="flex ml-3 mt-4" v-for="(message, index) of messages" :key="index">
    <Avatar shape="circle" size="large" :image="message.author.picture" />
    <div class="flex-1 mx-3">
      <div class="mb-2">
        <span class="font-bold text-lg">{{ message.author.nickname }}</span>
        <span class="ml-2 text-600 text-sm">
          {{ format(new Date(message.dateCreated), 'MM/dd/yyyy, hh:mm a') }}
        </span>
      </div>
      <span class="messageContent">{{ message.content }}</span>
    </div>
  </div>
  <div class="flex absolute bottom-0 left-0 right-0">
    <InputText
      class="flex-grow-1"
      type="text"
      placeholder="Type something in..."
      maxlength="299"
      v-model="messageContent"
      @keypress.enter="sendAndPushMessage"
    />
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue';
import { format } from 'date-fns';

import Avatar from 'primevue/avatar';
import InputText from 'primevue/inputtext';

import useChat from '@/composables/useChat';

export default defineComponent({
  name: 'ChatRoomTab',
  components: {
    Avatar,
    InputText
  },
  setup() {
    const { messageContent, messageLength, messages, sendAndPushMessage } =
      useChat();

    return {
      messageContent,
      messageLength,
      messages,
      sendAndPushMessage,
      format
    };
  }
});
</script>

<style scoped>
.messageContent {
  line-break: anywhere;
}
</style>
