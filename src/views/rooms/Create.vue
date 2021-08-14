<template>
  <div class="align-self-center text-center">
    <h1 class="text-5xl mt-0 mb-4">Create a room</h1>
    <Dropdown
      id="langSelect"
      v-model="room.language"
      :disabled="isLoading"
      :options="LANGUAGES"
      optionLabel="label"
      optionValue="value"
      placeholder="Choose a language"
      filter
    />
    <Button
      id="confirm"
      label="Confirm"
      :disabled="isLoading || room.language.length === 0"
      @click="createRoom"
    />
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue';

import Button from 'primevue/button';
import Dropdown from 'primevue/dropdown';

import LANGUAGES from '@/constants/LANGUAGES';
import useCreateRoom from '@/composables/rooms/useCreateRoom';

export default defineComponent({
  name: 'CreateRoom',
  components: {
    Button,
    Dropdown
  },
  setup() {
    return { LANGUAGES, ...useCreateRoom() };
  }
});
</script>

<style scoped>
#langSelect {
  border-top-right-radius: 0;
  border-bottom-right-radius: 0;
}

#confirm {
  border-top-left-radius: 0;
  border-bottom-left-radius: 0;
}

.p-dropdown:not(.p-disabled).p-focus {
  border-color: #383838;
  box-shadow: none;
}

.p-button:not(.p-disabled).p-focus {
  border: 1px solid #64b5f6;
  box-shadow: none;
}
</style>
