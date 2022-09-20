<template>
 <section class='container-sm justify-content-center'>
    <div class="card shadow-lg m-auto">
      <h4 class="card-header">Login</h4>
      <div class="card-body">
        <form @submit.prevent="signIn">
          <div class="form-group">
            <label for="email" class="d-flex">
            <div class="input-group flex-nowrap">
              <input
              autocomplete="email"
              class="form-control"
              type="email"
              placeholder="mail@domain.com"
              id="email"
              v-model="email"
              required />
              <span class="input-group-text px-4" id="basic-addon1">@</span>
            </div>
            </label>
          </div>
          <div class="form-group py-2">
            <label for="password" class="d-flex">
            <div class="input-group flex-nowrap">
              <input
              autocomplete="current-password"
              class="form-control"
              :type="inputType"
              v-model="password"
              required
              placeholder="password"
              id="password" />
              <button
              @click="showPassword"
              class="btn btn-outline-secondary"
              type="button" id="button-addon2"> {{ btnText }}
              </button>
            </div>
            </label>
          </div>
        <button class="btn btn-primary my-2" type="submit">Login</button>
        <router-link to="register" class="btn btn-info mx-2">Register</router-link>
        <a href="#">Forgot your password? bad luck</a>
        <!-- <p>Did you have an account?
          <PersonalRouter :route="route" :buttonText="buttonText" />
        </p>
        <a href="#">Forgot your password? bad luck</a>
          <p>No account?
            <router-link to="register" class="btn btn-link">Register</router-link>
          </p> -->
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
      errorMessage: '', // Error Message
      inputType: 'password', // trigger password visibility
      btnText: 'Show',
    };
  },
  methods: {
    showPassword() {
      if (this.inputType === 'password') {
        this.inputType = 'text';
        this.btnText = 'Hide';
      } else {
        this.inputType = 'password';
        this.btnText = 'Show';
      }
    },
    async signIn() { // use supabase to send a valid user to the home page
      try {
        await defineStore().signIn(this.email, this.password);
        this.$router.push({ path: '/' });
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
