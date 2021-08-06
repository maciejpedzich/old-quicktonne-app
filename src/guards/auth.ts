import { NavigationGuardNext, RouteLocationNormalized } from 'vue-router';

import useAuth0 from '@/composables/useAuth0';
import { watchEffect } from '@vue/runtime-dom';

export default function authGuard(
  from: RouteLocationNormalized,
  to: RouteLocationNormalized,
  next: NavigationGuardNext
): Promise<void> | void {
  const { isLoading, isAuthenticated } = useAuth0();

  const checkAuthStatus = async () => {
    if (isAuthenticated.value) {
      return next();
    }

    /*
      Vue router throws up a warning if the next function is never called.
      In order to solve this problem, we redirect the user to the LogIn route.
      That's where we call Auth0 SDK's loginWithRedirect method
    */
    return next({ name: 'LogIn' });
  };

  if (!isLoading.value) {
    return checkAuthStatus();
  }

  watchEffect(() => {
    if (!isLoading.value) {
      return checkAuthStatus();
    }
  });
}
