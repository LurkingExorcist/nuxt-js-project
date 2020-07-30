<template>
  <v-app light>
    <v-app-bar
      clipped-left
      fixed
      app
    >
      <Logo />
      <v-toolbar-title v-text="title" />
      <v-spacer />
      <User />
    </v-app-bar>
    <v-main>
      <v-container>
        <nuxt />
      </v-container>
    </v-main>
  </v-app>
</template>

<script>
import Logo from '~/components/Logo.vue'
import User from '~/components/User.vue'

export default {
  components: {
    Logo, User
  },
  data () {
    return {
      title: 'КГЭУ'
    }
  }
}
</script>
