<template>
  <main>
    <form @submit="resetPassword" class="form-container">
      <h1>Reset password</h1>
      <div class="form-floating">
        <input
          class="form-control form-item"
          type="password"
          id="password"
          name="password"
          placeholder="Password"
          v-model="password"
          required
        />
        <label for="password">New Password</label>
      </div>
      <button class="login100-form-btn">Reset</button>
    </form>
  </main>
</template>

<script>
import { authApi } from '../../infrastructure/apiServices'

export default {
  name: 'ResetPassword',
  data() {
    return {
      token: this.$route.query['token'],
      password: null,
    }
  },
  methods: {
    resetPassword(event) {
      event.preventDefault()
      authApi
        .resetPassword(this.token, this.password)
        .then(({ data }) => {
          this.$router.push('/login')
          alert(data.message)
        })
        .catch(err => alert(err.response.data.message))
    },
  },
}
</script>

<style lang="scss" scoped>
@import 'src/assets/sass/style';
@import 'src/assets/sass/auth-form';

form {
  max-width: 60rem;
}

.form-container {
  border-radius: 20px;
  border: 3px solid rgba(255, 255, 255, 0.76);
  background: linear-gradient(
    117deg,
    rgba(255, 255, 255, 0.22) -0.3%,
    rgba(255, 255, 255, 0.2) 81.34%
  );
  backdrop-filter: blur(10px);
}

.form-floating label {
  font-size: 14px;
  color: #eeeeee;
}

.form-control {
  font-size: 15px;
  letter-spacing: 0.6px;
}

.form-item {
  border-radius: 6px;
  border: 2px solid rgba(255, 255, 255, 0.42);

  background: linear-gradient(
    92deg,
    rgba(255, 255, 255, 0.02) -8.99%,
    rgba(255, 255, 255, 0.14) 101.74%
  );

  backdrop-filter: blur(20px);
}
</style>
