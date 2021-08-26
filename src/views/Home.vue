<template>
  <div class="align-self-center text-center">
    <h1 class="text-6xl m-0">Welcome to Quicktonne!</h1>
    <div v-if="isAuthenticated" class="mt-5">
      <router-link tag="button" to="/rooms/create">
        <Button class="p-button-lg" icon="pi pi-plus" label="Create a room" />
      </router-link>
      <Divider align="center">
        <span>OR</span>
      </Divider>
      <router-link tag="button" to="/rooms">
        <Button
          class="p-button-lg p-button-outlined"
          icon="pi pi-search"
          label="Browse rooms"
        />
      </router-link>
    </div>
    <div v-else>
      <p class="text-2xl mt-3 mb-4">
        It's like Instagram, but you don't post photos. You get to code with a
        stranger instead
      </p>
      <Button class="p-button-lg" label="Join now" @click="loginWithRedirect" />
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue';

import Button from 'primevue/button';
import Divider from 'primevue/divider';

import useAuth0 from '@/composables/useAuth0';

export default defineComponent({
  name: 'Home',
  components: {
    Button,
    Divider
  },
  setup() {
    const { isAuthenticated, loginWithRedirect } = useAuth0();

    return { isAuthenticated, loginWithRedirect };
  }
});
</script>
