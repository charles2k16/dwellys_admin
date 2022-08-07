import createApi from '~/api/apiService'

export default (ctx, inject) => {
  // inject the repository in the context (ctx.app.$repository)
  // And in the Vue instances (this.$repository in your components)

  const apiService = createApi(ctx.$axios)

  // You can reuse the repositoryWithAxios object:

  inject('usersApi', apiService('/users?type='))
  inject('classApi', apiService('/classes'))
  inject('productsApi', apiService('/products'))
  inject('registerApi', apiService('/signup'))
  inject('categoriesApi', apiService('/categories'))
  inject('listingsApi', apiService('/listings'))
  inject('toggleListingApi', apiService('/listing/togglestatus'))
  inject('approvalApi', apiService('/idcardapproval'))
  inject('countriesApi', apiService('/countries'))
  inject('propertyApi', apiService('/propertytypes'))
  inject('specificationsTypeApi', apiService('/propertytypespecifications'))
  inject('AmenitiesApi', apiService('/propertytypeamenities'))
}
