<template>
<div class="block-content-box crossed" >
  <nav v-if="user !== null">
    <router-link to="/">Home</router-link> |
    <router-link to="signOut">Sign Out</router-link>
  </nav>
  <router-view/>
</div>
</template>

<script>

import { mapState, mapActions } from 'pinia';
import userStore from '@/store/modules/user';

export default {
  name: 'App',
  computed: {
    ...mapState(userStore, ['user']), // states from Pinia are computed
  },
  methods: {
    ...mapActions(userStore, ['fetchUser']), // actions from Pinia are methods
  },
  async created() {
    try {
      await this.fetchUser(); // look for user in database
      if (!this.user) { // if user is not present in database route to log in page
        this.$router.push({ path: '/auth/login' });
      } else { // if user exists route to home
        this.$router.push({ path: '/' });
      }
    } catch (e) {
      console.error(e); // throw an error if something fails
    }
  },
};
</script>
