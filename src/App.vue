<template>
  <Menubar :model="menuItems">
    <template #start>
      <strong class="mx-2 md:mx-5">Quicktonne</strong>
    </template>
  </Menubar>
  <div class="container mx-3 md:mx-5">
    <router-view />
  </div>
</template>

<script lang="ts">
import { defineComponent, ref } from 'vue';
import Menubar from 'primevue/menubar';

export default defineComponent({
  name: 'App',
  components: {
    Menubar
  },
  setup() {
    const menuItems = ref([
      {
        label: 'Home',
        icon: 'pi pi-home',
        to: '/'
      },
      {
        label: 'About',
        icon: 'pi pi-info-circle',
        to: '/about'
      },
      {
        label: 'Source code',
        icon: 'pi pi-github',
        url: 'https://github.com/maciejpedzich/quicktonne-app',
        target: '_blank'
      }
    ]);

    return { menuItems };
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
