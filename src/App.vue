<template>
<div class="crossed" >
  <nav-bar v-if="user !== null"/>
  <router-view/>
</div>
</template>

<script>

import navBar from '@/components/navBar.vue';
import { mapState, mapActions } from 'pinia';
import userStore from '@/store/modules/user';

export default {
  components: { navBar },
  name: 'App',
  component: {
    navBar,
  },
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
