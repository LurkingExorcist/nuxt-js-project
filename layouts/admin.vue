<template>
  <v-app light>
    <v-navigation-drawer
      v-model="drawer"
      clipped
      fixed
      app
    >
      <v-list>
        <v-list-item
          v-for="(item, i) in items"
          :key="i"
          :to="item.to"
          router
          exact
        >
          <v-list-item-action>
            <v-icon>{{ item.icon }}</v-icon>
          </v-list-item-action>
          <v-list-item-content>
            <v-list-item-title v-text="item.title" />
          </v-list-item-content>
        </v-list-item>
      </v-list>
    </v-navigation-drawer>
    <v-app-bar
      clipped-left
      fixed
      app
    >
      <v-app-bar-nav-icon @click.stop="drawer = !drawer" />
      <div class="toolbar-logo" @click="toIndex">
        <Logo />
        <v-toolbar-title v-text="title" />
      </div>
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

<style scoped>
.toolbar-logo {
  display: flex;
  align-items: center;
  cursor: pointer;
  width: auto;
  height: 100%;
}
</style>

<script>
import Logo from '~/components/Logo.vue'
import User from '~/components/User.vue'

export default {
  components: {
    Logo, User
  },
  data () {
    const items = [
      {
        icon: 'mdi-apps',
        title: 'Студенты',
        to: '/students'
      },
    ];
    
    if (this.$auth.user.role === 'director') {
      items.push({
        icon: 'mdi-chart-bubble',
        title: 'Администрация',
        to: '/admins'
      });
    }

    return {
      items,
      drawer: false,
      title: 'КГЭУ'
    }
  },
  methods: {
    toIndex() {
      this.$router.push('/');
    }
  }
}
</script>
