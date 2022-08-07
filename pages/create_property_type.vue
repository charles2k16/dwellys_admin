<template>
  <div class="section property_upload">
    <el-drawer title="Add new Specifications" :visible.sync="drawer" size="30%">
      <div class="px-30 user_details">
        <section class="">
          <section class="specs_icons">
            <h3 class="pb-10 center">Specifications</h3>
            <div class="icons_container">
              <section
                v-for="icon in icons"
                :key="icon.icon"
                :style="isSelected(icon.name) ? 'background:  #f8fafc' : ''"
                class="info_card"
                @click="getIcon(icon)"
              >
                <img
                  :src="'../assets/icons/' + icon.icon"
                  alt="icon"
                  class="icon pr-10"
                />
                <p>{{ icon.name }}</p>
              </section>
            </div>
            <!-- <el-upload
                id="category-image"
                class="upload-demo"
                drag
                :on-change="getImage"
                action="#"
                :multiple="false"
                :auto-upload="false"
              >
                <i class="el-icon-upload"></i>
                <div class="el-upload__text">
                  Drop file here or <em>click to upload</em>
                </div> -->
            <!-- </el-upload> -->
          </section>
        </section>
        <el-divider></el-divider>
        <div class="pb-10">
          <div class="d-flex pt-30 pb-30">
            <el-button
              type="success"
              class="w-50"
              :loading="spec_loader"
              @click="saveSpecifiactions"
              ><i class="el-icon-check pr-10"></i>Add Amenities</el-button
            >
          </div>
        </div>
      </div>
    </el-drawer>
    <el-drawer
      title="Add new Amenities"
      :visible.sync="amenity_drawer"
      size="30%"
    >
      <div class="px-30 user_details">
        <div class="">
          <section class="specs_icons">
            <h3 class="pb-10 center">Amenities</h3>
            <div class="icons_container">
              <section
                v-for="icon in amenities_icon"
                :key="icon.icon"
                :style="isAmenity(icon.name) ? 'background:  #f8fafc' : ''"
                class="info_card"
                @click="getAmenityIcon(icon)"
              >
                <img
                  :src="'../assets/icons/' + icon.icon"
                  alt="icon"
                  class="icon pl-10"
                />
                <p>
                  {{ icon.name }}
                  <!-- <i
                    v-if="isAmenity(icon.name)"
                    class="el-icon-check pr-10"
                  ></i> -->
                </p>
              </section>
            </div>
            <!-- <el-upload
                id="category-image"
                class="upload-demo"
                drag
                :on-change="getImage"
                action="#"
                :multiple="false"
                :auto-upload="false"
              >
                <i class="el-icon-upload"></i>
                <div class="el-upload__text">
                  Drop file here or <em>click to upload</em>
                </div> -->
            <!-- </el-upload> -->
          </section>
        </div>
        <el-divider></el-divider>
        <div class="pb-10">
          <div class="d-flex pt-30 pb-30">
            <el-button
              type="success"
              class="w-50"
              :loading="amenity_loader"
              @click="saveAmenities"
              ><i class="el-icon-check pr-10"></i>Submit</el-button
            >
          </div>
        </div>
      </div>
    </el-drawer>
    <div>
      <div class="center">
        <div class="property_upload_head">
          <h3>Create Property Type</h3>
        </div>
      </div>
      <div class="property_content_container">
        <div class="d-flex_column pb-20 pt-10 justify_center">
          <el-card class="w-100">
            <div class="property_content">
              <div class="category w-50">
                <label for="category-name" class="pb-10">Property Name</label>
                <el-input
                  id="category-name"
                  v-model="propertyUpload.name"
                  placeholder="Apartment"
                  class="pt-10 d-flex_justify_center"
                >
                </el-input>
              </div>

              <div class="category w-50">
                <label for="category-description" class="pb-10"
                  >Property Description</label
                >
                <el-input
                  id="category-description"
                  v-model="propertyUpload.description"
                  class="pt-10"
                  type="textarea"
                  :rows="2"
                  placeholder="Please input"
                >
                </el-input>
              </div>
              <div class="image_category">
                <label for="category-image" class="pb-10">Property Image</label>
                <el-upload
                  id="category-image"
                  class="upload-demo"
                  drag
                  :on-change="getImage"
                  action="#"
                  :multiple="false"
                  :auto-upload="false"
                >
                  <i class="el-icon-upload"></i>
                  <div class="el-upload__text">
                    Drop file here or <em>click to upload</em>
                  </div>
                </el-upload>
              </div>
            </div>
            <div class="property_upload_btns pt-10">
              <el-button
                type="success"
                class="btn_sm submit_register_button"
                :loading="loading"
                @click="submitUpload"
              >
                Add Specifications</el-button
              >
            </div>
          </el-card>
        </div>
      </div>
      <hr class="hr_rule" />
    </div>
  </div>
</template>

<script lang="ts">
import Vue from 'vue'
import 'vue-phone-number-input/dist/vue-phone-number-input.css'
import { IMixinState } from '@/types/mixinsTypes'

export default Vue.extend({
  name: 'AccountPage',

  data() {
    return {
      loading: false as boolean,
      spec_loader: false as boolean,
      amenity_loader: false as boolean,
      amenity_drawer: false as boolean,
      countries: [],
      iconUrl: '../assets/icons/',
      icons: [
        { icon: 'bed.svg', name: 'Bed room', description: 'bed rooms' },
        { icon: 'bath.svg', name: 'Bath room', description: 'bath rooms' },
        { icon: 'car.svg', name: 'Garage', description: 'garage' },
        { icon: 'armchair.svg', name: 'Chair', description: 'furniture' },
      ],
      amenities_icon: [
        { icon: 'propeller.svg', name: 'Fan', description: 'Fan' },
        {
          icon: 'swimming.svg',
          name: 'Swimming pool',
          description: 'swimming pool',
        },
        { icon: 'growth.svg', name: 'Garden', description: 'Garden' },
        {
          icon: 'browser.svg',
          name: 'Internet',
          description: 'Internet connectivity',
        },
        { icon: 'plug.svg', name: 'Generator', description: 'Generator' },
        {
          icon: 'building-warehouse.svg',
          name: 'Washing Machine',
          description: 'Washing Machine',
        },
        {
          svg: 'database.svg',
          name: 'Water Storage',
          description: 'water storage',
        },
      ],
      listing_photos: [] as any,
      propertyUpload: {
        name: '' as string,
        description: '' as string,
        photo: '' as any,
      },
      drawer: false,
      profile: {},
      specifications: {
        property_type_id: '' as string,
        specifications: [] as Array<object>,
      },
      amenities: {
        property_type_id: '' as string,
        amenities: [] as Array<object>,
      },
    }
  },

  computed: {},
  methods: {
    isSelected(iconSpec: any) {
      // let isIcon = false;
      const filtered = this.specifications.specifications.find(
        (spec: any) => spec.name === iconSpec
      )
      return filtered
    },
    isAmenity(iconSpec: any) {
      // let isIcon = false;
      const filtered = this.amenities.amenities.find(
        (spec: any) => spec.name === iconSpec
      )
      return filtered
    },
    showAmenities() {
      this.drawer = false
      this.amenity_drawer = true
    },
    getIcon(icon: any) {
      const mainSpec = Object.assign([], this.specifications.specifications)

      this.specifications.specifications.find(
        (spec: any) => spec.name === icon.name
      )
        ? this.specifications.specifications.splice(
            mainSpec.findIndex((spec: any) => spec.name === icon.name),
            1
          )
        : this.specifications.specifications.push(icon)

      console.log(this.specifications.specifications)
    },
    getAmenityIcon(icon: any) {
      const mainSpec = Object.assign([], this.amenities.amenities)

      this.amenities.amenities.find((spec: any) => spec.name === icon.name)
        ? this.amenities.amenities.splice(
            mainSpec.findIndex((spec: any) => spec.name === icon.name),
            1
          )
        : this.amenities.amenities.push(icon)

      console.log(this.amenities.amenities)
    },
    toggleUpload(event: any) {
      const reader = new FileReader()
      reader.readAsDataURL(event.target.files[0])
      reader.onloadend = () => {
        // reader.result;
        const img = { tag: 'front', is_featured: false, photo: reader.result }
        this.listing_photos.push(img)
      }
    },
    getImage(file: any) {
      const reader = new FileReader()
      reader.readAsDataURL(file.raw)
      reader.onloadend = () => {
        this.propertyUpload.photo = reader.result
      }
    },
    async saveSpecifiactions() {
      console.log(this.specifications)

      this.spec_loader = true

      try {
        if (this.amenities.amenities.length > 0) {
          const specificationResponse =
            await this.$specificationsTypeApi.create(this.specifications)
          console.log(specificationResponse)

          this.spec_loader = false
          ;(this as any as IMixinState).$message({
            showClose: true,
            message: specificationResponse.message,
            type: 'success',
          })
          this.drawer = false
          this.amenity_drawer = true
        } else {
          ;(this as any as IMixinState).$message({
            showClose: true,
            message: 'Add one or more specification to property type',
            type: 'error',
          })
          this.spec_loader = false
        }
      } catch (error) {
        console.log(error, 'error')
        ;(this as any as IMixinState).catchError(error)
        this.spec_loader = false
      }
    },
    async submitUpload() {
      console.log(this.propertyUpload)
      this.loading = true
      try {
        if (
          this.propertyUpload.name !== '' ||
          this.propertyUpload.photo !== ''
        ) {
          const propertyResponse = await this.$propertyApi.create(
            this.propertyUpload
          )
          console.log(propertyResponse)
          this.specifications.property_type_id = propertyResponse.data.id
          this.amenities.property_type_id = propertyResponse.data.id
          this.loading = false
          ;(this as any as IMixinState).$message({
            showClose: true,
            message: propertyResponse.message,
            type: 'success',
          })
          this.drawer = true
        } else {
          ;(this as any as IMixinState).$message({
            showClose: true,
            message: 'Property type name and photo is required',
            type: 'error',
          })
          this.loading = false
        }
      } catch (error: any) {
        console.log(error?.response?.data, 'error')
        ;(this as any as IMixinState).catchError(error?.response?.data?.message)
      }
    },
    async saveAmenities() {
      console.log(this.amenities)
      this.amenity_loader = true
      try {
        if (this.amenities.amenities.length > 0) {
          const amenitiesResponse = await this.$AmenitiesApi.create(
            this.amenities
          )
          console.log(amenitiesResponse)

          this.amenity_loader = false
          ;(this as any as IMixinState).$message({
            showClose: true,
            message: amenitiesResponse.message,
            type: 'success',
          })
          this.amenity_drawer = false
          this.$router.replace('/property_types')
        } else {
          ;(this as any as IMixinState).$message({
            showClose: true,
            message: 'Add one or more amenities to property type',
            type: 'error',
          })
          this.amenity_loader = false
        }
      } catch (error) {
        console.log(error, 'error')
        ;(this as any as IMixinState).catchError(error)
      }
    },
  },
})
</script>

<style lang="scss">
$small_screen: 426px;
$medium_screen: 769px;

.property_upload {
  //   margin: 0 auto;
  .property_upload_head {
    padding-bottom: 20px;
    h3 {
      font-size: 20px;
      padding-bottom: 5px;
      line-height: 27px;

      @media (max-width: $small_screen) {
        text-align: left;
      }
    }
    small {
      font-size: 14px;
      line-height: 20px;
      color: #64748b;
    }
  }
  .property_content_container {
    padding-top: 20px;
    margin: 0 auto;
    display: flex;
    flex-direction: column;
    @media (max-width: $small_screen) {
      width: 100%;
      margin: 0;
    }
    .property_content {
      min-height: 420px;
      width: 100%;
      margin: 0 auto;
      .category {
        widows: 70%;
        margin: 0 auto;
        padding: 20px 0;
      }
      .image_category {
        display: flex;
        flex-direction: column;
        align-items: center;
        padding: 20px 0;
      }
    }
  }
  .property_upload_btns {
    width: 100%;
    // margin: 0 auto;
    padding-top: 30px;
    display: flex;
    justify-content: flex-end;
    @media (max-width: $small_screen) {
      width: 100%;
      margin: 0;
      padding-bottom: 20px;
    }
  }
  .specs_icons {
    width: 100%;
    .icons_container {
      display: grid;
      grid-template-columns: repeat(2, 1fr);
      .info_card {
        // background: #f8fafc;
        background: #fcfcfc;
        padding: 5px 10px;
        border: 1px solid #e2e8f0;
        border-radius: 12px;
        margin: 10px 10px;
        display: flex;

        p {
          font-size: 13px;
        }
        .icon {
          //   font-size: 22px;
          color: grey !important;
        }
      }
    }
  }
}
</style>
