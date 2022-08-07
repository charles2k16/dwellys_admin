<template>
  <div>
    <el-card class="p-20">
      <div class="lister_header">
        <div class="d-flex">
          <h4 class="mr-20 pt-8">Users account</h4>
          <NuxtLink to="/users" class="ml-20 mr-10">
            <el-button size="mini" round type="primary">All</el-button>
          </NuxtLink>
          <NuxtLink to="/users/verified">
            <el-button size="mini" round>Verified</el-button>
          </NuxtLink>
          <NuxtLink to="/users/unverified">
            <el-button size="mini" round>Unverified</el-button>
          </NuxtLink>
        </div>
        <div class="d-flex">
          <div class="d-flex ml-10">
            <el-select
              v-model="value"
              filterable
              placeholder="Filter"
              class="select_filter"
            >
              <template slot="prefix"
                ><i class="el-icon-cold-drink mt-10"></i
              ></template>
              <el-option
                v-for="item in users"
                :key="item.id"
                :label="item.first_name"
                :value="item.first_name"
              >
              </el-option>
            </el-select>
          </div>
          <el-input
            v-model="value"
            class="ml-10 mr-10"
            placeholder="Type something"
            prefix-icon="el-icon-search"
          >
          </el-input>
          <NuxtLink to="/add-user">
            <el-button type="danger"
              ><i class="el-icon-plus mr-10"></i>Add new user</el-button
            ></NuxtLink
          >
        </div>
      </div>
    </el-card>

    <NuxtChild :users="users" />
  </div>
</template>

<script lang="ts">
import Vue from 'vue'
export default Vue.extend({
  name: 'UsersPage',
  middleware: 'auth',
  data() {
    return {
      users: [],
      value: '',
    }
  },
  async created() {
    const users = await this.$usersApi.show('staff')
    console.log(users, 'users')
    this.users = users.data
  },
  methods: {
    addProduct(): void {
      ;(this as any).$refs.handleAction.showAddClassModal()
    },
  },
})
</script>
<style>
.lister_header {
  display: flex;
  justify-content: space-between;
}
</style>
