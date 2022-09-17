<template>
<nav class="navbar navbar-light bg-light">
  <div class="container-fluid">
    <router-link class="navbar-btn" to="/">Task Dashboard</router-link>
    <form class="d-flex">
      <button class="btn btn-outline-danger" type="submit" @click="signOut">
        Sign Out
      </button>
    </form>
  </div>
</nav>
</template>

<script>

import defineStore from '@/store/modules/user';

export default {
  methods: {
    async signOut() { // use supabase to send a valid user to the home page
      try {
        await defineStore().signOut(this.email, this.password);
        this.$router.push({ path: '/auth/login' });
      } catch (error) {
        this.errorMessage = `${error.message}`;
        setTimeout(() => { // hides error message
          this.errorMessage = null;
        }, 5000);
      }
    },
  },
};

</script>
<style scoped>

.navbar-btn {
  text-decoration: none;
  color: black;
}

</style>
