<template>
  <div>
    <el-card class="mt-20">
      <el-card class="mt-20">
        <el-table
          v-loading="tableLoading"
          :data="listings"
          stripe
          :default-sort="{ prop: 'name', order: 'descending' }"
        >
          <!-- <el-table-column label="ID">
            <template slot-scope="scope">
              <div
                class="d-flex"
                style="cursor: pointer"
                @click="getListingDetails(scope.row.id)"
              >
                <span class="d-block mt-10">{{ scope.row.id }}</span>
              </div>
            </template>
          </el-table-column> -->
          <el-table-column label="Listing">
            <template slot-scope="scope">
              <div
                class="d-flex"
                style="cursor: pointer"
                @click="getListingDetails(scope.row.id)"
              >
                <span class="d-block">
                  {{ scope.row.listing_detail.name }}
                  <!-- {{ scope.row.lister.last_name }} -->
                </span>
              </div>
            </template>
          </el-table-column>

          <el-table-column label="Country">
            <template slot-scope="props">
              <div
                class="d-flex clickable"
                @click="getListingDetails(props.row.id)"
              >
                <span>
                  {{ props.row.listing_detail.country.short_name }}
                </span>
              </div>
            </template>
          </el-table-column>
          <el-table-column label="City">
            <template slot-scope="scope">
              <div
                style="cursor: pointer"
                @click="getListingDetails(scope.row.id)"
              >
                <span>{{ scope.row.listing_detail.city }} </span>
              </div>
            </template>
          </el-table-column>

          <el-table-column label="Listing date">
            <template slot-scope="props">
              <div
                class="d-flex clickable"
                @click="getListingDetails(props.row.id)"
              >
                <span
                  >{{ $moment(props.row.created_at).format('MMM DD, YY') }}
                </span>
                <!-- {{ moment(props.row.created_at) }} -->
              </div>
            </template>
          </el-table-column>
          <el-table-column label="Amount">
            <template slot-scope="props">
              <div
                class="d-flex clickable"
                @click="getListingDetails(props.row.id)"
              >
                <span>{{ props.row.listing_detail.price }} </span>
              </div>
            </template>
          </el-table-column>
          <el-table-column label="Approved">
            <template slot-scope="scope">
              <div
                style="cursor: pointer"
                @click="getListingDetails(scope.row.id)"
              >
                <el-tag
                  :type="scope.row.status == 'active' ? 'success' : 'error'"
                  size="small"
                >
                  {{ scope.row.status == 'active' ? 'Yes' : 'No' }}</el-tag
                >
              </div>
            </template>
          </el-table-column>
          <el-table-column>
            <template slot-scope="props">
              <!-- <el-tooltip
                class="item"
                effect="dark"
                content="Edit Product"
                placement="top"
              >
                <el-button
                  type="primary"
                  icon="el-icon-edit"
                  circle
                ></el-button>
              </el-tooltip>
              <el-button
                type="danger"
                icon="el-icon-delete"
                circle
                @click="deleteProduct(props.row.id)"
              ></el-button> -->
              <el-dropdown trigger="click">
                <span style="cursor: pointer" class="el-dropdown-link">
                  <i class="el-icon-more"> </i>
                </span>
                <el-dropdown-menu slot="dropdown">
                  <el-dropdown-item
                    ><p
                      class="p-10"
                      @click="open(props.row.id, 'active', 'Approve')"
                    >
                      <i class="el-icon-check pr-10"></i>Approve
                    </p></el-dropdown-item
                  >
                  <el-dropdown-item
                    ><p
                      style="color: red"
                      class="p-10"
                      @click="open(props.row.id, 'inactive', 'Disapprove')"
                    >
                      <i class="el-icon-close pr-10"></i>Disapprove
                    </p></el-dropdown-item
                  >
                </el-dropdown-menu>
              </el-dropdown>
            </template>
          </el-table-column>
        </el-table>
      </el-card>

      <div class="mt-40 center pb-10">
        <el-pagination
          background
          :page-sizes="[15, 30, 50]"
          :page-size="15"
          layout="prev, pager, next, sizes, total"
          :total="0"
        >
        </el-pagination>
      </div>
    </el-card>
  </div>
</template>

<script lang="ts">
import Vue from 'vue'
import { IMixinState } from '@/types/mixinsTypes'

export default Vue.extend({
  name: 'ProductsSubmitted',
  props: {
    listings: {
      required: true,
      type: Array,
    },
    fetchData: {
      required: true,
      type: Function,
    },
  },
  data() {
    return {
      activeTab: 'pendingReview',
      pendingTab: 'Pending Products',
      loading: false,
      url: 'http://127.0.0.1:8000/',
      pendingTotal: 0,
      drawer: false,
      tableLoading: false,
      profile: {},
      search: '' as string,
    }
  },
  methods: {
    viewProfile(profile: any) {
      this.profile = profile
      this.drawer = true
      console.log(profile)
    },
    open(listingId: string, active: string, btnText: string) {
      console.log(listingId, 'profile')
      // const h = this.$createElement
      this.$confirm(
        'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Elementum interdum quisque risus ornare tincidunt sed in. Neque elit nunc scelerisque lacinia ultrices adipiscing.',
        'Are you sure you want approve the listing?',
        {
          cancelButtonText: 'Cancel',
          confirmButtonText: btnText,
        }
      )
        .then(() => {
          this.approveLister(listingId, active)
        })
        .catch(() => {
          this.$message({
            type: 'info',
            message: 'Delete canceled',
          })
        })
    },
    getListingDetails(id: string) {
      this.$router.push(`/listing_details/${id}`)
    },
    async approveLister(listingId: string, status: string) {
      this.loading = true
      console.log(status)
      try {
        const listingResponse = await this.$toggleListingApi.create({
          listing_id: listingId,
          status,
        })

        console.log(listingResponse)
        // console.log(listingId, active)

        this.loading = false
        this.fetchData()
        ;(this as any as IMixinState).$message({
          showClose: true,
          message: listingResponse.message,
          type: 'success',
        })
      } catch (error) {
        console.log(error, 'error')
        ;(this as any as IMixinState).catchError(error)
      }
    },
  },
})
</script>
<style lang="scss" scoped>
.profile_avatar {
  width: 40px;
  height: 40px;
  border-radius: 50%;
}
.user_details {
  overflow-y: scroll;
  p {
    font-size: 16px;
    font-weight: 400;
  }
  .profile_img {
    width: 42%;
    border-radius: 50%;
    height: 150px;
  }
  .identification_card {
    width: 100%;
    height: 200px;
    border-radius: 16.4815px;
  }
}
</style>
