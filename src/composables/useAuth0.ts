import { computed, reactive } from 'vue';

import createAuth0Client, {
  LogoutOptions,
  RedirectLoginOptions,
  User
} from '@auth0/auth0-spa-js';

import UseAuth0State from '@/types/UseAuth0State';
import UseAuth0Return from '@/types/UseAuth0Return';

// Top level await baby!
const auth0Client = await createAuth0Client({
  client_id: import.meta.env.VITE_AUTH0_CLIENT_ID,
  domain: import.meta.env.VITE_AUTH0_DOMAIN,
  redirect_uri: window.location.origin,
  useRefreshTokens: true,
  cacheLocation: 'localstorage'
});

/* 
  We create an internal state reactive object
  Think of it as a Vuex module state. 
*/
const state = reactive<UseAuth0State>({
  isLoading: true,
  isAuthenticated: false,
  currentUser: null,
  token: null
});

export default function useAuth0(): UseAuth0Return {
  /* 
    Going back to the Vuex analogy:
    These computed properties are just like Vuex getters
  */
  const isLoading = computed<boolean>(() => state.isLoading);
  const isAuthenticated = computed<boolean>(() => state.isAuthenticated);
  const currentUser = computed<User | null>(() => state.currentUser);
  const token = computed<string | null>(() => state.token);

  const handleRedirectCallback = async () => {
    try {
      if (
        window.location.search.includes('code=') &&
        window.location.search.includes('state=')
      ) {
        const { appState } = await auth0Client.handleRedirectCallback();
        const destination = appState?.targetUrl || window.location.pathname;

        window.history.replaceState({}, document.title, destination);
      }
    } catch (error) {
      console.error(error);
    } finally {
      const isLoggedIn = await auth0Client.isAuthenticated();
      const user = await auth0Client.getUser();

      state.isAuthenticated = isLoggedIn;
      state.currentUser = user || null;

      if (isLoggedIn) {
        state.token = await auth0Client.getTokenSilently();
      }

      state.isLoading = false;
    }
  };

  const loginWithRedirect = async (options?: RedirectLoginOptions) =>
    await auth0Client.loginWithRedirect(options);

  const logout = async (options?: LogoutOptions) =>
    await auth0Client.logout(options);

  return {
    isLoading,
    isAuthenticated,
    currentUser,
    token,
    handleRedirectCallback,
    loginWithRedirect,
    logout
  };
}
