<template>
  <ProgressSpinner v-if="isFetchingRoomData" class="align-self-center" />
  <div v-else class="flex-grow-1 align-self-stretch">
    <Splitter class="h-full">
      <SplitterPanel class="flex align-items-stretch" :minSize="30">
        <CodeEditor :language="room?.language" />
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
              <span class="ml-2">Input/Output</span>
            </template>
            Input/Output
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

import CodeEditor from '@/components/CodeEditor.vue';
import ChatRoomTab from '@/components/roomTabs/Chat.vue';

import socket from '@/socket';
import useAuth0 from '@/composables/useAuth0';
import useManageRoom from '@/composables/rooms/useManageRoom';
import useCodeEditor from '@/composables/useCodeEditor';
import useChat from '@/composables/useChat';
import Room from '@/types/models/Room';
import { User } from '@auth0/auth0-spa-js';

export default defineComponent({
  name: 'Room',
  components: {
    CodeEditor,
    ChatRoomTab,
    ProgressSpinner,
    Splitter,
    SplitterPanel,
    TabView,
    TabPanel
  },
  setup() {
    const { currentUser } = useAuth0();
    const route = useRoute();
    const roomId = route.params.roomId as string;

    const {
      isFetchingRoomData,
      room,
      getRoom,
      setRoomMembers,
      deleteRoom,
      cancelRoomUpdatesSub
    } = useManageRoom(roomId);

    const { addNewMessagesListener, clearMessages } = useChat();

    onMounted(() => {
      getRoom();

      socket.connect();
      socket.emit('joinRoom', roomId);
      addNewMessagesListener();
    });

    onUnmounted(() => {
      const isHostLeaving =
        currentUser.value?.email === room.value?.host?.email;

      cancelRoomUpdatesSub && cancelRoomUpdatesSub();

      isHostLeaving && !room.value?.guest
        ? deleteRoom()
        : setRoomMembers(
            null,
            isHostLeaving
              ? ((room.value as Room).guest as User)
              : (room.value as Room).host
          );

      clearMessages();
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
