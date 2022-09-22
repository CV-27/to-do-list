<template>
 <section class='container-sm justify-content-center'>
    <div class="card shadow-lg m-auto">
      <h4 class="card-header">Register</h4>
      <div class="card-body">
        <form
        @submit.prevent="useSignUp"
        method="post">
          <div class="form-group d-grid" >
            <label for="email"> Email
              <div class="input-group">
                <input
                autocomplete="email"
                class="form-control"
                type="email"
                placeholder="email@domain.com"
                id="email"
                v-model="email"
                required />
              </div>
            </label>
          </div>
          <div class="form-group">
            <label for="password" class="d-grid"> Password
              <input
              v-model="password"
              autocomplete="current-password"
              class="form-control"
              :type="inputType"
              required
              placeholder="**********"
              id="password" />
              </label>
          </div>
          <div class="form-group py-2">
            <label for="passwordCheck" class="d-grid"> Password check
              <input
              v-model="passwordCheck"
              autocomplete="current-password"
              class="form-control"
              :type="inputType"
              required
              placeholder="**********"
              id="password-check" />
              </label>
          </div>
          <div v-if="errorMessage"> {{ errorMessage }}</div>
        <button
        class="btn btn-primary my-2"
        type="submit">
        create account
        </button>
        <button
        @click="showPassword"
        class="btn btn-outline-secondary m-2"
        type="button" id="button-addon2">
        {{ btnText }}
        </button>
        <a href="login">Cancel</a>
        </form>
      </div>
    </div>
  </section>
</template>

<script>
import defineStore from '@/store/modules/user';
import { mapActions, mapState } from 'pinia';

export default {
  data() {
    return {
      email: '', // Input Fields
      password: '', // Input Fields
      passwordCheck: '', // check if the pass double validation
      errorMessage: null, // Error Message
      inputType: 'password',
      btnText: 'Show Password', // trigger password visibility
    };
  },
  computed: {
    ...mapState(defineStore, ['user']),
  },
  methods: {
    ...mapActions(defineStore, ['signUp']),

    async useSignUp() {
      if (this.password !== this.passwordCheck) {
        this.errorMessage = 'passwords are not the same';
      }
      try {
        await this.signUp(this.email, this.password);
        this.errorMessage = 'Thank you for suscripcion, you will be redirected to the login page';
        setTimeout(() => { // hides error message
          this.$router.push({ path: '/auth/login' });
        }, 3000);
      } catch (error) {
        this.errorMessage = 'If you have already an account please log in';
        setTimeout(() => {
          this.errorMessage = null;
        }, 3000);
      }
    },

    showPassword() {
      if (this.inputType === 'password') {
        this.inputType = 'text';
        this.btnText = 'Hide Password';
      } else {
        this.inputType = 'password';
        this.btnText = 'Show Password';
      }
    },
  },
};
</script>
