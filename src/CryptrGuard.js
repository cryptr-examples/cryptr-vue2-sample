import { getCryptrClient } from "./CryptrPlugin";

export const cryptrGuard = (to, from, next) => {
  const cryptr = getCryptrClient();

  // 1. Check if user is authenticated
  const signinUnlessAuthenticated = () => {
    if (cryptr.isAuthenticated) {
      return next();
    }

    cryptr.signInWithRedirect();
  };

  // 2. Handle loading as a guard clause
  if (!cryptr.loading) {
    return signinUnlessAuthenticated();
  }

  // 3. Watch the loading to call again
  // the signinUnlessAuthenticated() function
  cryptr.$watch("loading", loading => {
    if (!loading) {
      return signinUnlessAuthenticated();
    }
  });
};