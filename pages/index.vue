<template>
  <v-layout
    column
    justify-center
    align-center
  >
    <v-flex
      xs12
      sm8
      md6
    >
      <v-card>
        <v-card-title class="headline">
          Добро пожаловать на Главную страницу!
        </v-card-title>
        <v-card-text>
          <img
            class="logo"
            alt="Логотип"
            src="/logo.png"
          />
        </v-card-text>
      </v-card>
    </v-flex>
  </v-layout>
</template>

<script>
export default {
  middleware: ['auth', 'no-student'],
  layout: 'admin'
}
</script>

<style scoped>
.logo {
  height: auto;
  max-width: 820px
}

.headline {
  justify-content: center;
}
</style>