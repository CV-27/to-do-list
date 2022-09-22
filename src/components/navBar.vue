<template>
<nav class="navbar navbar-light bg-light">
  <div class="container-fluid">
    <router-link class="navbar-btn p-2" to="/">
      <div class="d-flex align-content-md-between">
        <img src="../assets/ICON_Ared.svg" alt="logo" class="logo">
      </div>
    </router-link>
    <h3>
      Task Dashboard
    </h3>
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
    async signOut() {
      try {
        await defineStore().signOut(this.email, this.password);
        this.$router.push({ path: '/auth/login' });
      } catch (error) {
        this.errorMessage = `${error.message}`;
        setTimeout(() => {
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

.logo {
  width: 25px;
}
</style>
