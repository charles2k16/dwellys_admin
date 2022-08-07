<template>
  <div class="section property_upload">
    <div>
      <div class="center">
        <div class="property_upload_head">
          <h3>Edit Property Type</h3>
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
                  v-model="property.name"
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
                  v-model="property.description"
                  class="pt-10"
                  type="textarea"
                  :rows="2"
                  placeholder="Please input"
                >
                </el-input>
              </div>
              <div class="image_category">
                <img
                  :src="url() + '/' + property.photo"
                  alt="property image"
                  class="property_image"
                />
                <label for="category-image" class="pb-10">Change Image</label>
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
              <section class="specs_icons">
                <h3 class="pb-10 center">Specifications</h3>
                <div class="icons_container">
                  <section
                    v-for="icon in icons"
                    :key="icon.icon"
                    :style="isSpecification(icon.name) ? 'background:red' : ''"
                    class="info_card"
                    @click="getSpecification(icon)"
                  >
                    <!-- #f8fafc -->
                    <img
                      :src="url() + '/' + icon.icon"
                      alt="icon"
                      class="icon pr-10"
                    />
                    <p>{{ icon.name }}</p>
                  </section>
                </div>
              </section>
              <section class="specs_icons">
                <h3 class="pb-10 center">Amenities</h3>
                <div class="icons_container">
                  <section
                    v-for="icon in amenities_icon"
                    :key="icon.icon"
                    :style="isAmenity(icon.name) ? 'background: red' : ''"
                    class="info_card"
                    @click="getAmenityIcon(icon)"
                  >
                    <!-- {{ isAmenity(icon.name) }} -->
                    <img
                      :src="'../assets/icons/' + icon.icon"
                      alt="icon"
                      class="icon pl-10"
                    />
                    <p>
                      {{ icon.name }}
                    </p>
                  </section>
                </div>
              </section>
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
import url from '@/url'
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
      property_type_id: this.$route.params.id,
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
      property: {} as any,
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
  async created() {
    // this.pageLoad = true;
    const property = await this.$propertyApi.single(this.$route.params.id)

    this.property = property.data
    console.log(this.property)
  },
  methods: {
    url() {
      return url()
    },
    isSpecification(iconSpec: any) {
      const propSpecs = Object.assign([], this.property.specifications)
      const filtered = propSpecs.find((spec: any) => spec.name === iconSpec)
      return filtered
    },
    isAmenity(iconSpec: any) {
      const propSpecs = Object.assign([], this.property.amenities)
      const filtered = propSpecs.find((spec: any) => spec.name === iconSpec)

      return filtered
    },
    getSpecification(icon: any) {
      const mainSpec = Object.assign([], this.property.specifications)

      this.property.specifications.find((spec: any) => spec.name === icon.name)
        ? this.property.specifications.splice(
            mainSpec.findIndex((spec: any) => spec.name === icon.name),
            1
          )
        : this.property.specifications.push(icon)

      console.log(this.property.specifications)
    },
    getAmenityIcon(icon: any) {
      const mainSpec = Object.assign([], this.property.amenities)

      mainSpec.find((spec: any) => spec.name === icon.name)
        ? this.property.amenities.splice(
            mainSpec.findIndex((spec: any) => spec.name === icon.name),
            1
          )
        : this.property.amenities.push(icon)
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
        this.property.photo = reader.result
      }
    },
    async saveSpecifiactions() {
      console.log(this.specifications)

      this.spec_loader = true
      try {
        const specificationResponse = await this.$specificationsTypeApi.update(
          this.specifications
        )
        console.log(specificationResponse)

        this.spec_loader = false
        ;(this as any as IMixinState).$message({
          showClose: true,
          message: specificationResponse.message,
          type: 'success',
        })

        this.amenity_drawer = true
      } catch (error) {
        console.log(error, 'error')
        ;(this as any as IMixinState).catchError(error)
        this.spec_loader = false
      }
    },
    async submitUpload() {
      console.log(this.property)
      this.loading = true
      try {
        const propertyResponse = await this.$propertyApi.create(this.property)
        console.log(propertyResponse)
        this.specifications.property_type_id = propertyResponse.data.id
        this.amenities.property_type_id = propertyResponse.data.id
        this.loading = false
        ;(this as any as IMixinState).$message({
          showClose: true,
          message: propertyResponse.message,
          type: 'success',
        })
      } catch (error: any) {
        console.log(error?.response?.data, 'error')
        ;(this as any as IMixinState).catchError(error?.response?.data?.message)
      }
    },
    async saveAmenities() {
      console.log(this.amenities)
      this.amenity_loader = true
      try {
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
        .property_image {
          width: 100%;
          max-width: 300px;
          height: 200px;
        }
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
    width: 80%;
    margin: 20px auto;
    .icons_container {
      display: grid;
      grid-template-columns: repeat(3, 1fr);
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
