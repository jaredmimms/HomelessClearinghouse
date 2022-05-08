<template>
  <div id="account-page">
    <div v-if="user && user.name">
      <h2>Hi, {{ user.name }}!</h2>

      <button v-on:click="logout" id="logout1" class="btn btn-primary">
        Logout
      </button>
    </div>

    <div v-else id="loginForm">
      <div>
        <h2>Login</h2>
        <div class="form-group">
          <label>
            Email:
            <input type="text" v-model="data.email" class="form-control" />
          </label>
        </div>
        <div class="form-group">
          <label>
            Password:
            <input
              type="password"
              v-model="data.password"
              class="form-control"
            />
          </label>
        </div>

        <button v-on:click="login" id="login1" class="btn btn-primary">
          Login
        </button>

        <ul v-if="errors">
          <li class="error" v-for="(error, index) in errors" :key="index">
            {{ error }}
          </li>
        </ul>
      </div>
    </div>
  </div>
</template>

<script>
import { axios } from "@/common/app.js";
export default {
  data() {
    return {
      data: {
        email: "",
        password: "",
      },
      errors: null,
    };
  },
  computed: {
    user() {
      return this.$store.state.user;
    },
    offers() {
      return this.$store.state.offers;
    },
  },
  methods: {
    login() {
      axios.post("/login", this.data).then((response) => {
        if (response.data.authenticated) {
          this.$store.commit("setUser", response.data.user);
        } else {
          this.errors = response.data.errors;
        }
      });
    },
    logout() {
      axios.post("/logout").then((response) => {
        console.log(response);
        if (response && response.data && response.data.success) {
          this.$store.commit("setUser", null);
        }
      });
    },
  },
  watch: {
    user() {},
  },
  mounted() {},
};
</script>