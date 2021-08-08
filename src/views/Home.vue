<template>
  <p v-if="isAuthenticated">Show lobby here, because we're logged in</p>
  <HomeHeroContainer v-else />
</template>

<script lang="ts">
import { defineComponent } from 'vue';

import HomeHeroContainer from '@/components/HomeHeroContainer.vue';
import useAuth0 from '@/composables/useAuth0';

export default defineComponent({
  name: 'Home',
  components: {
    HomeHeroContainer
  },
  setup() {
    const { isAuthenticated } = useAuth0();

    return { isAuthenticated };
  }
});
</script>
