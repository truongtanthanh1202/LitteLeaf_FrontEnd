<template>
  <main>
    <form @submit="changePassword" class="form-container">
      <h1>Change password</h1>
      <div class="form-floating">
        <input
          class="form-control form-item"
          type="password"
          id="old-password"
          placeholder="Old Password"
          v-model="changePasswordForm.old_password"
          required
        />
        <label for="old-password">Old Password</label>
      </div>
      <div class="form-floating">
        <input
          class="form-control form-item"
          type="password"
          id="new-password"
          placeholder="New Password"
          v-model="changePasswordForm.new_password"
          required
        />
        <label for="new-password">New Password</label>
      </div>
      <div class="form-floating">
        <input
          class="form-control form-item"
          type="password"
          id="new-password-confirmation"
          placeholder="New Password Confirmation"
          v-model="changePasswordForm.new_password_confirmation"
          required
        />
        <label for="new-password-confirmation">Password Confirmation</label>
      </div>
      <button class="login100-form-btn">Change Password</button>
    </form>
  </main>
</template>

<script>
import { authApi } from '../../infrastructure/apiServices'

export default {
  name: 'ChangePassword',
  data() {
    return {
      changePasswordForm: {
        old_password: null,
        new_password: null,
        new_password_confirmation: null,
      },
    }
  },
  methods: {
    changePassword(event) {
      event.preventDefault()
      console.log(this.changePasswordForm)
      authApi
        .changePassword(this.changePasswordForm)
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
