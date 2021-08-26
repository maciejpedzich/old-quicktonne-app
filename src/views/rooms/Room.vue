<template>
  <ProgressSpinner v-if="isFetchingRoomData" class="align-self-center" />
  <div v-else class="flex-grow-1 align-self-stretch">
    <Splitter class="h-full">
      <SplitterPanel class="flex align-items-stretch" :minSize="25">
        <CodeEditor
          :language="room?.language"
          :partnerUsername="partnerUsername"
        />
      </SplitterPanel>
      <SplitterPanel :minSize="25">
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
import { User } from '@auth0/auth0-spa-js';

import ProgressSpinner from 'primevue/progressspinner';
import Splitter from 'primevue/splitter';
import SplitterPanel from 'primevue/splitterpanel';
import TabView from 'primevue/tabview';
import TabPanel from 'primevue/tabpanel';

import CodeEditor from '@/components/CodeEditor.vue';
import ChatRoomTab from '@/components/roomTabs/Chat.vue';

import socket from '@/socket';
import Room from '@/types/models/Room';
import useAuth0 from '@/composables/useAuth0';
import useManageRoom from '@/composables/rooms/useManageRoom';
import useChat from '@/composables/useChat';

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
      partnerUsername,
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
      const roomData = room.value;

      const isHostLeaving = currentUser.value?.email === roomData?.host?.email;

      cancelRoomUpdatesSub && cancelRoomUpdatesSub();

      isHostLeaving && !roomData?.guest
        ? deleteRoom()
        : setRoomMembers(
            null,
            isHostLeaving
              ? ((roomData as Room).guest as User)
              : (roomData as Room).host
          );

      clearMessages();
      socket.emit('leaveRoom', roomId);
      socket.disconnect();
    });

    return { isFetchingRoomData, room, partnerUsername };
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
