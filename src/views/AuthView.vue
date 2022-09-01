<template>
  <h1>Sign page</h1>
  <button @click="handleSignUp">get in</button>
</template>

<script>

import { mapState, mapActions } from 'pinia'; // import pinia methods
import userStore from '@/store/modules/user'; // import userData from pinia store

export default {
  name: 'AuthView',
  computed: {
    ...mapState(userStore, ['user']),
  },
  methods: {
    ...mapActions(userStore, ['signUp']),
    handleSignUp() {
      const userData = {
        email: 'antonio.ferraz.coutinho@gmail.com',
        password: '123456',
      };
      this.signUp(userData.email, userData.password);
    },
  },
  watch: {
    user() {
      if (this.user) {
        console.log(this.user);
        this.$router.push({ path: '/' });
      } else {
        console.error('no user found');
      }
    },
  },
};
</script>
