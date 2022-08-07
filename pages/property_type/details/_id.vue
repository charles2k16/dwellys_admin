<template>
  <div class="">
    <div class="d-flex justify_between">
      <div class="d-flex">
        <!-- <section class="listing_bar"> -->
        <!-- <p>Lister</p> -->
        <!-- <p class="pt-10"> -->
        <!-- <b>{{ listing && property.lister.first_name }} </b> -->
        <!-- </p> -->
        <!-- </section> -->
        <section class="listing_bar">
          <p>Property name</p>
          <section class="d-flex pt-10">
            <img v-if="property" :src="url + property.photo" height="30px" />
            <p class="pt-10">
              <b>{{ property && property.name }} </b>
            </p>
          </section>
        </section>
        <section class="listing_bar">
          <p>Lister</p>
          <section class="d-flex pt-10">
            <img
              v-if="property.creator"
              :src="url + property.creator.avatar"
              height="30px"
            />
            <img
              v-else
              src="https://cube.elemecdn.com/3/7c/3ea6beec64369c2642b92c6726f1epng.png"
              alt="pic"
              style="width: 40px"
            />
            <!-- <p class="p user_placeholder">
              <i class="el-icon-user-solid"></i>
            </p> -->
            <p class="pt-5 pl-5">
              <b>
                {{ property.creator && property.creator.first_name }}
                {{ property.creator && property.creator.last_name }}
              </b>
            </p>
          </section>
        </section>
      </div>
      <div>
        <p>Do you want to approve this listing?</p>

        <div class="d-flex pt-10">
          <el-button
            type="danger"
            class="w-50 pt-5"
            :loading="loading"
            @click="updateProperty(property.id)"
            ><i class="el-icon-check pr-10"></i>Update</el-button
          >

          <el-button
            type="info"
            class="w-50 p-0"
            @click="approveLister(property.id, 'inactive')"
            ><i class="el-icon-close pr-10"></i>Delete</el-button
          >
        </div>
      </div>
    </div>
    <el-divider></el-divider>
    <section class="pt-30">
      <p>Description</p>
      <p class="w-70 pt-10">
        <b> {{ property && property.description }}</b>
      </p>
    </section>
    <div class="pt-30">
      <p class="pb-10">Specifications</p>

      <ul class="amenites_list">
        <li
          v-for="spec in property.specifications"
          :key="spec.id"
          class="mb-10"
        >
          {{ spec.name }}
        </li>
      </ul>
    </div>
    <div class="pt-30">
      <p class="pb-10">Amenities</p>
      <ul class="amenites_list">
        <li
          v-for="amenity in property.amenities"
          :key="amenity.id"
          class="mb-10"
        >
          <!-- <img src="../../assets/icons/snowflake.svg" class="pr-5" /> -->
          <p>{{ amenity.name }}</p>
        </li>
      </ul>
    </div>
  </div>
</template>

<script lang="ts">
import Vue from 'vue'
import { IMixinState } from '@/types/mixinsTypes'

export default Vue.extend({
  name: 'ListingDetails',

  // props: {
  //   property: {
  //     type: Object,
  //     required: true,
  //   },
  // },
  data() {
    return {
      url: 'http://localhost:8000/',
      activeName: 'first' as string,
      image: '' as any,
      listing_id: this.$route.params.id,
      property: {},
      loading: false as boolean,
    }
  },
  async created() {
    // this.pageLoad = true;
    console.log(this.$route.params)
    const property = await this.$propertyApi.single(this.$route.params.id)

    console.log(property)
    this.property = property.data
  },
  methods: {
    updateProperty(id: string) {
      this.$router.push(`/property_type/edit/${id}`)
    },
    async approveLister(listingId: string, status: string) {
      try {
        const listingResponse = await this.$listingsApi.update(
          '/togglestatus',
          {
            listing_id: listingId,
            status,
          }
        )

        console.log(listingResponse)
        // console.log(listingId, active)

        this.loading = false
        ;(this as any as IMixinState).$message({
          showClose: true,
          message: listingResponse.message,
          type: 'success',
        })
      } catch (error: any) {
        console.log(error, 'error')
        ;(this as any as IMixinState).$message({
          showClose: true,
          message: error.message,
          type: 'success',
        })
      }
    },
  },
})
</script>

<style lang="scss" scoped>
.listing_bar {
  width: 200px;
  padding-right: 10px;
}
.property_images {
  display: grid;
  grid-template-columns: repeat(5, minmax(150px, 1fr));

  img {
    // border-radius: 20px;
    height: 100px;
    max-width: 300px;
    width: 90%;
  }
}
.amenites_list {
  // padding-top: 20px;
  display: grid;
  grid-template-columns: repeat(2, minmax(200px, 1fr));
  width: 30%;

  // max-width: 500px;

  li {
    background: #f1f5f9;
    border-radius: 80px;
    list-style: none;
    width: fit-content;
    padding: 10px 20px;
    color: #1e293b;
    font-size: 12px;
  }
}
.user_placeholder {
  background: #d9d9d9;
  border-radius: 50%;
}
</style>
