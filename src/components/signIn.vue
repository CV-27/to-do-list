<template>
 <section class='container-sm justify-content-center'>
    <div class="card shadow-lg m-auto">
      <h4 class="card-header">Login</h4>
      <div class="card-body">
        <form
        @submit.prevent="useSignIn"
        method="post">
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
          <div v-if="errorMessage"
          class="font-monospace text-danger"> {{ errorMessage }}</div>
        <button class="btn btn-primary my-2" type="submit">Login</button>
        <router-link to="register" class="btn btn-info mx-2">Register</router-link>
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
      email: '',
      password: '',
      errorMessage: '',
      inputType: 'password',
      btnText: 'Show',
    };
  },
  computed: {
    ...mapState(defineStore, ['user']),
  },
  methods: {
    ...mapActions(defineStore, [
      'signIn',
      'recoverPass',
    ]),

    showPassword() {
      if (this.inputType === 'password') {
        this.inputType = 'text';
        this.btnText = 'Hide';
      } else {
        this.inputType = 'password';
        this.btnText = 'Show';
      }
    },

    async useSignIn() {
      try {
        await this.signIn(this.email, this.password);
        this.$router.push({ path: '/' });
      } catch (error) {
        this.errorMessage = 'Please check your credentials';
        setTimeout(() => {
          this.errorMessage = null;
        }, 3000);
      }
    },
  },
};

</script>
