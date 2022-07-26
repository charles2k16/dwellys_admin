import createApi from '~/api/apiService'

export default (ctx, inject) => {
  // inject the repository in the context (ctx.app.$repository)
  // And in the Vue instances (this.$repository in your components)

  const apiService = createApi(ctx.$axios)

  // You can reuse the repositoryWithAxios object:

  inject('usersApi', apiService('/users'))
  inject('classApi', apiService('/classes'))
  inject('productsApi', apiService('/products'))
  inject('categoriesApi', apiService('/categories'))
  inject('listingsApi', apiService('/listings'))
}
