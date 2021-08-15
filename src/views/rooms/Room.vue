<template>
  <ProgressSpinner v-if="isFetchingRoomData" class="align-self-center" />
  <div v-else class="flex-grow-1 align-self-stretch">
    <Splitter class="h-full">
      <SplitterPanel class="flex align-items-stretch" :minSize="25">
        <VAceEditor
          class="flex-grow-1"
          ref="codeEditor"
          :printMargin="false"
          :options="editorOptions"
          v-model:value="editorContent"
          theme="twilight"
          lang="javascript"
        ></VAceEditor>
      </SplitterPanel>
      <SplitterPanel :minSize="25">
        <TabView lazy>
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
            Chat
          </TabPanel>
        </TabView>
      </SplitterPanel>
    </Splitter>
  </div>
</template>

<script lang="ts">
import { defineComponent, onMounted } from 'vue';

import ProgressSpinner from 'primevue/progressspinner';
import Splitter from 'primevue/splitter';
import SplitterPanel from 'primevue/splitterpanel';
import TabView from 'primevue/tabview';
import TabPanel from 'primevue/tabpanel';

import { VAceEditor } from 'vue3-ace-editor';
import 'ace-builds/src-min-noconflict/theme-twilight';

// TODO: Figure out how to dynamically import and properly load modes
import 'ace-builds/src-min-noconflict/mode-javascript';

import useCodeEditor from '@/composables/useCodeEditor';
import useGetRoom from '@/composables/rooms/useGetRoom';
import { useRoute } from 'vue-router';

export default defineComponent({
  name: 'Room',
  components: {
    ProgressSpinner,
    Splitter,
    SplitterPanel,
    TabView,
    TabPanel,
    VAceEditor
  },
  setup() {
    const route = useRoute();
    const { isFetchingRoomData, room, getRoom } = useGetRoom(
      route.params.roomId as string
    );

    onMounted(getRoom);

    return { isFetchingRoomData, room, ...useCodeEditor() };
  }
});
</script>
