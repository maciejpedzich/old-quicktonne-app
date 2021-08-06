import { User } from '@auth0/auth0-spa-js';

type UseAuth0State = {
  isLoading: boolean;
  isAuthenticated: boolean;
  currentUser: User | null;
  token: string | null;
};

export default UseAuth0State;
