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

    const userOnHomepage = computed(() => route.name === 'Home');
    const mainContainerClasses = computed(() =>
      userOnHomepage.value
        ? ['flex-grow-1', 'flex', 'justify-content-center']
        : []
    );
    const navbarPositionClass = computed(() => [
      userOnHomepage.value ? 'fixed' : 'sticky'
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
