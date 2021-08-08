<template>
  <Navbar />
  <div id="main-container" :class="mainContainerClasses">
    <router-view />
  </div>
</template>

<script lang="ts">
import { computed, defineComponent } from 'vue';
import { useRoute } from 'vue-router';

import Navbar from '@/components/Navbar.vue';
import useAuth0 from '@/composables/useAuth0';

export default defineComponent({
  name: 'App',
  components: {
    Navbar
  },
  setup() {
    const route = useRoute();
    const { handleRedirectCallback, isAuthenticated } = useAuth0();
    const mainContainerClasses = computed(() =>
      route.name === 'Home' && !isAuthenticated.value
        ? ['flex-grow-1', 'flex', 'justify-content-center']
        : ['mt-7']
    );

    handleRedirectCallback();

    return { route, isAuthenticated, mainContainerClasses };
  }
});
</script>

<style>
body {
  color: var(--text-color);
  font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen,
    Ubuntu, Cantarell, 'Open Sans', 'Helvetica Neue', sans-serif;
}
</style>
