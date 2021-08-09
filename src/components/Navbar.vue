<template>
  <Menubar class="top-0 w-full" :model="menuItems">
    <template #start>
      <strong class="mx-2 md:mx-5">Quicktonne</strong>
    </template>
  </Menubar>
</template>

<script lang="ts">
import { defineComponent, computed } from 'vue';
import Menubar from 'primevue/menubar';

import useAuth0 from '@/composables/useAuth0';

export default defineComponent({
  name: 'App',
  components: {
    Menubar
  },
  setup() {
    const { isAuthenticated, logout } = useAuth0();

    const menuItems = computed(() => [
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
        target: '_blank',
        class: 'md:mr-2 md:pr-2 border-right-1 border-100'
      },
      {
        label: 'Log in',
        icon: 'pi pi-sign-in',
        to: '/login',
        visible: !isAuthenticated.value
      },
      {
        label: 'Log out',
        icon: 'pi pi-sign-out',
        command: logout,
        visible: isAuthenticated.value
      }
    ]);

    return { menuItems };
  }
});
</script>
