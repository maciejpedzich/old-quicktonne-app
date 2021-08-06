<template>
  <Navbar />
  <div class="container mt-7 md:mt-8">
    <router-view />
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue';
import Navbar from '@/components/Navbar.vue';

import useAuth0 from '@/composables/useAuth0';

export default defineComponent({
  name: 'App',
  components: {
    Navbar
  },
  setup() {
    const { handleRedirectCallback } = useAuth0();

    handleRedirectCallback();
  }
});
</script>

<style>
body {
  color: var(--text-color);
  font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen,
    Ubuntu, Cantarell, 'Open Sans', 'Helvetica Neue', sans-serif;
}

body {
  margin: 0;
  padding: 0;
  background-color: var(--surface-0);
  color: var(--text-color);
  font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen,
    Ubuntu, Cantarell, 'Open Sans', 'Helvetica Neue', sans-serif;
}

.container {
  padding-right: 15px;
  padding-left: 15px;
  margin-right: auto;
  margin-left: auto;
  margin-bottom: 8rem;
}
@media (min-width: 768px) {
  .container {
    width: 750px;
  }
}
@media (min-width: 992px) {
  .container {
    width: 970px;
  }
}
@media (min-width: 1200px) {
  .container {
    width: 1170px;
  }
}
</style>
