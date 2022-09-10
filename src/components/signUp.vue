<template>
 <section class='container-sm justify-content-center'>
    <div class="card shadow-lg m-auto">
      <h4 class="card-header">Register</h4>
      <div class="card-body d-flex align-items-md-center">
        <form @submit.prevent="signUp">
          <div class="form-group py-2" >
            <label for="email"> Email Address
              <div class="input-group flex-nowrap">
                <input
                class="form-control"
                type="email"
                placeholder="email@domain.com"
                id="email"
                v-model="email"
                required />
              </div>
            </label>
          </div>
          <div class="form-group py-2">
            <label for="password"> Password
              <input
              class="form-control"
              :type="inputType"
              required
              placeholder="**********"
              id="password" />
              </label>
          </div>
          <div class="form-group py-2 d-flex">
            <label for="passwordCheck"> Password check
              <input
              class="form-control"
              :type="inputType"
              v-model="password"
              required
              placeholder="**********"
              id="password" />
              </label>
          </div>
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
      inputType: 'password',
      btnText: 'Show Password', // trigger password visibility
    };
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
