<template>
  <div class="text-center">
    <h1>Browse rooms</h1>
    <strong class="text-lg mr-2">Languages:</strong>
    <MultiSelect
      v-model="preferredLanguages"
      :disabled="isLoading"
      :options="allLanguages"
      :selectionLimit="5"
      optionLabel="label"
      optionValue="value"
      display="chip"
      filter
    />
    <div v-if="isLoading">
      <br />
      <ProgressSpinner />
    </div>
    <div v-else>
      <p v-if="rooms.length === 0">
        There are no unoccupied rooms with specified language(s).
      </p>
      <div v-else>
        <div class="grid mx-2">
          <div v-for="room of rooms" :key="room.id" class="col-3">
            <p>{{ room.id }}</p>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent, onMounted, onUnmounted } from 'vue';

import MultiSelect from 'primevue/multiselect';
import ProgressSpinner from 'primevue/progressspinner';

import useBrowseRooms from '@/composables/useBrowseRooms';

export default defineComponent({
  name: 'RoomBrowser',
  components: {
    MultiSelect,
    ProgressSpinner
  },
  setup() {
    const {
      isLoading,
      rooms,
      allLanguages,
      preferredLanguages,
      getAndSubToRoomUpdates,
      cancelRoomUpdatesSub
    } = useBrowseRooms();

    onMounted(getAndSubToRoomUpdates);

    onUnmounted(() => cancelRoomUpdatesSub && cancelRoomUpdatesSub());

    return { isLoading, rooms, allLanguages, preferredLanguages };
  }
});
</script>
