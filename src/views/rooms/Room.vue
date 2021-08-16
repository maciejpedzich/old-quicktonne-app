<template>
  <ProgressSpinner v-if="isFetchingRoomData" class="align-self-center" />
  <div v-else class="flex-grow-1 align-self-stretch">
    <Splitter class="h-full">
      <SplitterPanel class="flex align-items-stretch" :minSize="30">
        <VAceEditor
          ref="codeEditor"
          class="flex-grow-1"
          :printMargin="false"
          :options="editorOptions"
          v-model:value="editorContent"
          theme="twilight"
          lang="javascript"
        ></VAceEditor>
      </SplitterPanel>
      <SplitterPanel :minSize="30">
        <TabView class="min-h-full flex flex-column" lazy>
          <TabPanel>
            <template #header>
              <i class="pi pi-play"></i>
              <span class="ml-1">Run</span>
            </template>
            Run
          </TabPanel>
          <TabPanel>
            <template #header>
              <i class="pi pi-sort-alt"></i>
              <span class="ml-2">Stdin/Stdout</span>
            </template>
            Stdin/Stdout
          </TabPanel>
          <TabPanel>
            <template #header>
              <i class="pi pi-comments"></i>
              <span class="ml-2">Chat</span>
            </template>
            <ChatRoomTab />
          </TabPanel>
        </TabView>
      </SplitterPanel>
    </Splitter>
  </div>
</template>

<script lang="ts">
import { defineComponent, onMounted, onUnmounted } from 'vue';
import { useRoute } from 'vue-router';

import ProgressSpinner from 'primevue/progressspinner';
import Splitter from 'primevue/splitter';
import SplitterPanel from 'primevue/splitterpanel';
import TabView from 'primevue/tabview';
import TabPanel from 'primevue/tabpanel';

import { VAceEditor } from 'vue3-ace-editor';
import 'ace-builds/src-min-noconflict/theme-twilight';

// TODO: Figure out how to dynamically import and properly load modes
import 'ace-builds/src-min-noconflict/mode-javascript';

import ChatRoomTab from '@/components/roomTabs/Chat.vue';

import socket from '@/socket';
import useAuth0 from '@/composables/useAuth0';
import useGetRoom from '@/composables/rooms/useGetRoom';
import useCodeEditor from '@/composables/useCodeEditor';
import useChat from '@/composables/useChat';

export default defineComponent({
  name: 'Room',
  components: {
    ChatRoomTab,
    ProgressSpinner,
    Splitter,
    SplitterPanel,
    TabView,
    TabPanel,
    VAceEditor
  },
  setup() {
    const { currentUser } = useAuth0();
    const route = useRoute();
    const roomId = route.params.roomId as string;

    const { isFetchingRoomData, room, getRoom, setRoomIsOccupied } =
      useGetRoom(roomId);

    const { addNewMessagesListener, clearMessages, removeNewMessagesListener } =
      useChat();

    onMounted(() => {
      getRoom();

      socket.connect();
      socket.emit('joinRoom', roomId);
      addNewMessagesListener();
    });

    onUnmounted(() => {
      currentUser.value?.email !== room.value?.creator.email &&
        setRoomIsOccupied(false);

      clearMessages();
      removeNewMessagesListener();

      socket.emit('leaveRoom', roomId);
      socket.disconnect();
    });

    return { isFetchingRoomData, room, ...useCodeEditor() };
  }
});
</script>

<style scoped>
::v-deep(.p-tabview .p-tabview-panels),
::v-deep(.p-tabview-panels .p-tabview-panel) {
  flex-grow: 1;
}

::v-deep(.p-tabview .p-tabview-panels) {
  padding: 0;
  display: flex;
  flex-direction: column;
}

::v-deep(.p-tabview-panels .p-tabview-panel) {
  position: relative;
}
</style>
