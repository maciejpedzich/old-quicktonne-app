<template>
  <p v-if="isAuthenticated">Show lobby here, because we're logged in</p>
  <p v-else>Hero page with a cool slogan, because we're not authenticated</p>
</template>

<script lang="ts">
import { defineComponent } from 'vue';

import useAuth0 from '@/composables/useAuth0';

export default defineComponent({
  name: 'Home',
  setup() {
    const { isAuthenticated } = useAuth0();

    return { isAuthenticated };
  }
});
</script>
