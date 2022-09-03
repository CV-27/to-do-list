<template>
 <section class='block-content-box'>
    <div class="card m-3">
      <h4 class="card-header">Register</h4>
      <div class="card-body">
        <form @submit.prevent="signUp">
          <div class="form-group">
            <label for="email">
            <input
              class="form-control"
              type="email"
              placeholder="email@domain.com"
              id="email"
              v-model="email"
              required />
            </label>
          </div>
          <div class="form-group">
            <label for="password">
            <input
              class="form-control"
              :type="hidePassword"
              v-model="password"
              required
              placeholder="**********"
              id="password" />
            </label>
          </div>
          <div class="form-group">
            <label for="passwordCheck">
            <input
              class="form-control"
              :type="hidePassword"
              v-model="passwordCheck"
              required
              placeholder="**********"
              id="password" />
            </label>
          </div>
        <button type="submit">create account</button>
        </form>
      </div>
    </div>
  </section>
</template>

<script>
import defineStore from '@/store/modules/user';

export default {
  data() {
    return {
      email: '', // Input Fields
      password: '', // Input Fields
      passwordCheck: '', // check if the pass double validation
      errorMessage: '', // Error Message
      hidePassword: true, // trigger password visibility
    };
  },
  computed: {
    passwordFieldType() {
      return this.hidePassword ? 'password' : 'text';
    },
  },
  methods: {
    async signUp() { // function to SignUp user to supaBase
      if (this.password === this.passwordCheck) {
        try {
          await defineStore().signUp(this.email, this.password);
          this.$router.push({ path: '/auth/login' });
        } catch (error) {
          this.errorMessage = `${error.message}`;
          setTimeout(() => { // hides error message
            this.errorMessage = null;
          }, 5000);
        }
      }
    },
  },
};
</script>
