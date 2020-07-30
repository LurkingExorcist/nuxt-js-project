<template>
  <v-layout
    column
    justify-center
    align-center
  >
    <v-card class="md8 pt-6 pr-12 pl-12 pb-6">
      <v-card-title class="headline">
        Войти
      </v-card-title>
      <v-card-text class="mt-4">
        <v-text-field
          label="Email"
          name="email"
          v-model="email"
        />
        <v-text-field
          label="Пароль"
          name="password"
          type="password"
          v-model="password"
        />
      </v-card-text>
      <v-card-actions>
        <v-btn
          color="primary"
          @click="login"
          large
        >
          Войти
        </v-btn>
      </v-card-actions>
    </v-card>
    <v-snackbar
      v-model="showError"
      color="error"
    >
      {{ errorText }}

      <template v-slot:action="{ attrs }">
        <v-btn
          dark
          text
          v-bind="attrs"
          @click="showError = false"
        >
          Закрыть
        </v-btn>
      </template>
    </v-snackbar>
  </v-layout>
</template>

<style scoped>
.layout {
  height: 100%;
}
</style>

<script>
export default {
  data() {
    return {
      email: '',
      password: '',
      showError: false,
      errorText: '',
    }
  },
  methods: {
    async login() {
      try {
        await this.$auth.loginWith('local', {
          data: {
            email: this.email,
            password: this.password
          }
        })

        this.$router.push('/');
      } catch(e) {
        console.error(e);

        const error = e.response ? e.response.data.error : e.message;

        this.showError = true;
        this.errorText = error;
      }
    }
  }
}
</script>
