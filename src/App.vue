<template>
  <Toast />
  <Navbar :class="navbarPositionClass" />
  <div :class="mainContainerClasses">
    <router-view />
  </div>
</template>

<script lang="ts">
import { computed, defineComponent } from 'vue';
import { useRoute } from 'vue-router';

import Toast from 'primevue/toast';

import Navbar from '@/components/Navbar.vue';
import useAuth0 from '@/composables/useAuth0';

export default defineComponent({
  name: 'App',
  components: {
    Navbar,
    Toast
  },
  setup() {
    const route = useRoute();
    const { handleRedirectCallback } = useAuth0();

    const centeredContentPages = ['Home', 'CreateRoom'];
    const fillParentPages = ['Room'];

    const mainContainerClasses = computed(() => [
      'flex-grow-1',
      'flex',
      fillParentPages.includes(route.name as string)
        ? 'align-self-stretch'
        : 'justify-content-center'
    ]);
    const navbarPositionClass = computed(() => [
      centeredContentPages.includes(route.name as string) ? 'fixed' : 'sticky'
    ]);

    handleRedirectCallback();

    return {
      mainContainerClasses,
      navbarPositionClass
    };
  }
});
</script>

<style>
body {
  color: var(--text-color);
  font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen,
    Ubuntu, Cantarell, 'Open Sans', 'Helvetica Neue', sans-serif;
}

a[tag='button'] {
  text-decoration: none;
}
</style>
