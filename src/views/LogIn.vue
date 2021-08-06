<template>
  <!-- Better safe than sorry -->
  <p>
    You should now be automatically redirected to Auth0 page. But if you can
    still see this message, click the button below to log in.
  </p>
  <Button label="Log in" @click="loginWithRedirect" />
</template>

<script lang="ts">
import { defineComponent } from 'vue';
import Button from 'primevue/button';

import useAuth0 from '@/composables/useAuth0';

export default defineComponent({
  name: 'LogIn',
  components: {
    Button
  },
  setup() {
    const { loginWithRedirect } = useAuth0();

    loginWithRedirect();

    return { loginWithRedirect };
  }
});
</script>
