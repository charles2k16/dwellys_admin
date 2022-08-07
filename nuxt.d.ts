import Vue, { ComponentOptions } from 'vue'

declare module 'vue/types/options' {
  interface ComponentOptions<
    V extends Vue,
    Data = DefaultData<V>,
    Methods = DefaultMethods<V>,
    Computed = DefaultComputed,
    PropsDef = PropsDefinition<DefaultProps>,
    Props = DefaultProps
  > {
    head?: object | Function
    layout?: string | Function
    middleware?: string | string[] | object
    scrollToTop?: boolean
    transition?: String | object | Function
    watchQuery?: boolean | string[]
  }
}

interface apiService {
  index: Function
  delete: Function
  update: Function
  create: Function
  show: Function
  single: Function
  userTypes: (path: string, params: object) => Promise<any>
  //  (query: object): Promise<any>
}

declare module 'vue/types/vue' {
  interface Vue {
    $categoriesApi: apiService
    $productsApi: apiService
    $usersApi: apiService
    $classApi: apiService
    $listingsApi: apiService
    $approvalApi: apiService
    $toggleListingApi: apiService
    $listersApi: apiService
    $countriesApi: apiService
    $registerApi: apiService
    $propertyApi: apiService
    $specificationsTypeApi: apiService
    $AmenitiesApi: apiService
    // $refs: { [key: string]: Vue | Element | (Vue | Element)[] | Function | undefined; }
  }
}
