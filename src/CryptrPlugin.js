import Vue from "vue";
import CryptrSPA from "@cryptr/cryptr-spa-js";

let clientWrapper;

const isRedirectFromCryptr = () =>
  window.location.search.includes("code=") &&
  window.location.search.includes("state=");

export const getCryptrClient = () => clientWrapper;

const setCryptrClientWrapper = (options) => {
  if (clientWrapper) {
    return clientWrapper;
  }

  clientWrapper = new Vue({
    data() {
      return {
        client: null,
        error: null,
        isAuthenticated: false,
        canRefresh: false,
        loading: true,
        user: null,
      };
    },

    async created() {
      this.client = await CryptrSPA.createClient(options);
      this.loading = true;
      this.isAuthentcated = this.client.isAuthentcated;
      this.canRefresh = this.client.canRefresh(this.client.getRefreshStore());
      this.canHandleRefresh = !this.isAuthenticated && this.canRefresh;
      this.canHandleRedirect = !this.isAuthenticated && isRedirectFromCryptr();
      this.canHandleInvitation = !this.isAuthenticated && this.client.canHandleInvitation();

      try {
        // 1. When user is returning to its browser
        if (this.canHandleRefresh) {
          await this.client.handleRefreshTokens();

          // 2. When user is returning to the app after authentication
        } else if (this.canHandleRedirect) {
          await this.client.handleRedirectCallback();
        } else if (this.canHandleInvitation) {
          await this.client.handleInvitationState();
        }
      } catch (e) {
        this.error = e;
      } finally {
        this.isAuthenticated = await this.client.isAuthenticated();

        this.user = await this.client.getUser();

        this.loading = false;
      }
    },

    methods: {
      signInWithRedirect() {
        return this.client.signInWithRedirect();
      },
      signUpWithRedirect() {
        return this.client.signUpWithRedirect();
      },
      logout() {
        this.loading = true;
        this.client.logOut();
        this.loading = false;
        return true;
      },
      decoratedRequest(axiosRequestConfig) {
        return this.client.decoratedRequest(axiosRequestConfig);
      },
    },
  });

  return clientWrapper;
};

export default {
  install(Vue, options) {
    Vue.prototype.$cryptr = setCryptrClientWrapper(options);
  },
};
