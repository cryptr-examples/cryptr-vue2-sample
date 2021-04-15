<template>
  <div id="app">
    <div id="nav">
      <router-link to="/" style="margin-right: 5px">Home</router-link>
      <span v-if="!$cryptr.isLoading && !$cryptr.isAuthenticated">
        <button
          v-on:click="$cryptr.signInWithRedirect"
          to="#"
          style="margin-right: 5px"
        >
          Login
        </button>
        <button
          v-on:click="$cryptr.signUpWithRedirect"
          to="#"
          style="margin-right: 5px"
        >
          Signup
        </button>
      </span>

      <router-link to="/profile">Protected route</router-link>

      <button
        v-if="$cryptr.isAuthenticated"
        v-on:click="$cryptr.logout"
        to="#"
        style="margin-left: 5px"
      >
        Logout
      </button>
    </div>
    <router-view />
  </div>
</template>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}

#nav {
  padding: 30px;
}

#nav a {
  font-weight: bold;
  color: #2c3e50;
}

#nav a.router-link-exact-active {
  color: #42b983;
}
</style>
