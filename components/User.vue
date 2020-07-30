<template>
  <div class="user">
    <div class="user__name">
      {{ fullName }}
    </div>
    <div class="user__separator"></div>
    <div class="user__logout" @click="logout">
      Выйти
    </div>
  </div>
</template>

<style lang="scss" scoped>
.user {
  display: flex;
  flex-direction: row;

  &__separator {
    border: 1px solid rgba(0, 0, 0, 0.5);
  }

  &__logout {
    cursor: pointer;
    font-weight: bold;
    
    &:hover {
      text-decoration: underline;
    }
  }

  > *:not(:last-child) {
    margin-right: 24px;
  }
}
</style>

<script>
export default {
  name: 'User',
  computed: {
    fullName() {
      const { name, last_name } = this.$auth.user;
      return [name, last_name].join(' ');
    }
  },
  methods: {
    async logout() {
      await this.$auth.logout();
      this.$router.push('/login');
    }
  }
}
</script>