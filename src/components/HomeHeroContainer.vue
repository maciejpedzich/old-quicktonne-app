<template>
  <div class="align-self-center text-center">
    <h1 class="text-6xl my-0">Quicktonne</h1>
    <p class="text-2xl mt-3 mb-4">
      Catchy slogan goes here, think about it later...
    </p>
    <Button class="p-button-lg" label="Log in" @click="loginWithRedirect" />
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue';

import Button from 'primevue/button';

import useAuth0 from '@/composables/useAuth0';

export default defineComponent({
  name: 'HomeHeroContainer',
  components: {
    Button
  },
  setup() {
    const { loginWithRedirect } = useAuth0();

    return { loginWithRedirect };
  }
});
</script>
