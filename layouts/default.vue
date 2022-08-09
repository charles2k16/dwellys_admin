<template>
  <el-container style="height: 100vh; border: 1px solid #eee">
    <Sidebar />

    <el-container>
      <el-header>
        <Header />
      </el-header>

      <el-main>
        <Nuxt />
      </el-main>
      <footer class="d-flex justify_between">
        <p>Dwellys © 2022. All right reserved.</p>

        <p>v-0.3.5</p>
      </footer>
    </el-container>
  </el-container>
</template>

<script>
import Vue from 'vue'
import global from '~/mixins/global.ts'

Vue.mixin(global)
export default {}
</script>
