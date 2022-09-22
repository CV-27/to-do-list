<template>
 <section class='container-sm justify-content-center'>
    <div class="card shadow-lg m-auto">
      <h4 class="card-header">Recover your password</h4>
      <div class="card-body">
        <form
        @submit.prevent="useRecoverPass"
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
              <span
              class="input-group-text px-4"
              id="basic-addon1">@</span>
            </div>
            </label>
            <div v-if="errorMessage"> {{ errorMessage }}</div>
            </div>
        <button
        class="btn btn-primary my-2"
        type="submit">Recover pass
        </button>
        <a href="login" class="px-4">Cancel</a>
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
      errorMessage: '',
    };
  },
  computed: {
    ...mapState(defineStore, ['user']),
  },
  methods: {
    ...mapActions(defineStore, [
      'recoverPass',
    ]),

    async useRecoverPass() {
      try {
        await this.recoverPass(this.email);
        this.errorMessage = 'Check your email for further instructions';
      } catch (error) {
        this.errorMessage = 'No email found in database';
        setTimeout(() => {
          this.errorMessage = null;
        }, 3000);
      }
    },
  },
};

</script>
