<template>
  <Navbar :class="navbarPositionClass" />
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

    const homeHeroContainerVisible = computed(
      () => route.name === 'Home' && !isAuthenticated.value
    );
    const mainContainerClasses = computed(() =>
      homeHeroContainerVisible.value
        ? ['flex-grow-1', 'flex', 'justify-content-center']
        : []
    );
    const navbarPositionClass = computed(() => [
      homeHeroContainerVisible.value ? 'fixed' : 'sticky'
    ]);

    handleRedirectCallback();

    return {
      isAuthenticated,
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
</style>
