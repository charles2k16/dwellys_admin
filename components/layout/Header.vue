<template>
  <div class="dashboard-header d-flex justify_between">
    <h2 class="page__title">{{ pageTitle }}</h2>
    <div class="d-flex">
      <!-- <Notification /> -->
      <el-dropdown trigger="click">
        <span class="dashboard-header__user">
          <el-avatar
            size="large"
            src="https://cube.elemecdn.com/3/7c/3ea6beec64369c2642b92c6726f1epng.png"
          ></el-avatar>
          <div class="ml-10">
            <span class="text-black">
              {{ $auth.user.first_name }} {{ $auth.user.last_name }}
            </span>
            <br />
            <small>Admin User</small>
          </div>

          <i class="el-icon-arrow-down"></i>
        </span>

        <el-dropdown-menu slot="dropdown">
          <div class="dashboard-dropdown">
            <ul>
              <li>
                <i class="el-icon-user"></i>
                <span> Account </span>
              </li>
              <hr class="hr_rule" />
              <li class="mt-5" @click="logout">
                <i class="el-icon-setting"></i>
                <span> Logout </span>
              </li>
            </ul>
          </div>
        </el-dropdown-menu>
      </el-dropdown>
    </div>
  </div>
</template>

<script lang="ts">
import Vue from 'vue'

export default Vue.extend({
  name: 'Header',
  data() {
    return {
      pageTitle: '' as string,
      notify_count: 0,
    }
  },
  watch: {
    $route(to) {
      this.setRoutesNames(to.name)
    },
  },
  created() {
    this.setRoutesNames(this.$route.name!)
    console.log('auth', this.$auth)
  },
  methods: {
    async logout() {
      await this.$auth.logout()
      this.$router.push({
        name: 'Login',
      })
    },
    clearNotifications() {
      this.notify_count = 0
    },
    setRoutesNames(routeName: string) {
      this.pageTitle =
        routeName === 'index'
          ? 'Dashboard'
          : routeName === 'products-approved'
          ? 'Products'
          : routeName === 'Listing_details-id'
          ? 'Listing details'
          : routeName
    },
  },
})
</script>

<style lang="scss" scoped>
.dashboard-header {
  width: 100%;
  padding: 0 20px;

  .page__title {
    flex-basis: 100%;
  }

  &__user {
    cursor: pointer;
    display: flex;
    justify-content: flex-end;
    align-items: center;
    width: 250px;

    i {
      font-weight: bold;
      font-size: 1.2rem;
      margin-left: 20px;
      color: var(--text-base);
    }
  }
}

.dashboard-dropdown {
  width: 230px;

  ul {
    list-style: none;

    i {
      font-size: 20px;
      margin-right: 15px;
    }

    li {
      cursor: pointer;
      display: flex;
      align-items: center;
      padding: 20px 15px;

      &:hover {
        background: rgb(247, 247, 247);
      }
    }
  }
}
</style>
