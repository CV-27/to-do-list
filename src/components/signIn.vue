<template>
 <main>
    <div class="card m-3">
      <h4 class="card-header">Login</h4>
      <div class="card-body">
        <form @submit.prevent="signIn">
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
        <button type="submit">LOG IN</button>
        <p>Did you have an account?
          <PersonalRouter :route="route" :buttonText="buttonText" />
        </p>
        <a href="#">FORGOT PASSWORD?</a>
          <p>No account?
            <a href="#">Create One</a>
          </p>
        </form>
      </div>
    </div>
  </main>
</template>

<script>
import defineStore from '@/store/modules/user';

export default {
  data() {
    return {
      email: '', // Input Fields
      password: '', // Input Fields
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
    async signIn() { // function to Signin user to supaBase
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
// // Route Variables
// const route = "/auth/sign-up";
// const buttonText = "Sign Up";
// // Input Fields
// const email = ref("");
// const password = ref("");
// // Error Message
// const errorMsg = ref("");
// //Show hide password variables
// const passwordFieldType = computed(() =>
//   hidePassword.value ? "password" : "text"
// );
// const hidePassword = ref(true);
// // Router to push user once SignedIn to the HomeView
// const redirect = useRouter();
// // Arrow function to Signin user to supaBase
// const signIn = async () => {
//   try {
//     // calls the user store and send the users info to backend to logIn
//     await useUserStore().signIn(email.value, password.value);
//     // redirects user to the homeView
//     redirect.push({ path: "/" });
//   } catch (error) {
//     // displays error message
//     this.errorMessage = `${error.message}`;
//     // hides error message
//     setTimeout(() => {
//       errorMsg.value = null;
//     }, 5000);
//   }
// };
</script>
