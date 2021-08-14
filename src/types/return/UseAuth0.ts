import { LogoutOptions, RedirectLoginOptions, User } from '@auth0/auth0-spa-js';
import { ComputedRef } from 'vue';

type UseAuth0Return = {
  isLoading: ComputedRef<boolean>;
  isAuthenticated: ComputedRef<boolean>;
  currentUser: ComputedRef<User | null>;
  token: ComputedRef<string | null>;
  handleRedirectCallback(): Promise<void>;
  loginWithRedirect(options?: RedirectLoginOptions): Promise<void>;
  logout(options?: LogoutOptions): Promise<void>;
};

export default UseAuth0Return;
