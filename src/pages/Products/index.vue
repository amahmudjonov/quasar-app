<template>
  <div>
    <q-splitter
      v-model="splitterModel"
      style="height: 100vh;"
    >

      <template v-slot:before>
        <q-tabs
          v-model="tab"
          vertical
          class="text-black"
          active-color="primary"
        >
          <q-tab class="q-mt-sm" name="products" :label="$t('products')" />
          <q-tab class="q-mt-sm" name="product_by_type" :label="$t('products_by_type')" />
        </q-tabs>
      </template>

      <template v-slot:after>
        <q-tab-panels
          v-model="tab"
          animated
          swipeable
          vertical
          transition-prev="jump-down"
          transition-next="jump-up"
        >
          <q-tab-panel name="products">
            <Products />
          </q-tab-panel>

          <q-tab-panel name="product_by_type">
            <ProductsByType />
          </q-tab-panel>
        </q-tab-panels>
      </template>

    </q-splitter>
  </div>
</template>

<script>
  import Products from './Products.vue'
  import ProductsByType from './ProductsByType.vue'
	export default{
    components: {
      Products,
      ProductsByType
    },
	 data () {
	    return {
	      tab: 'products',
	      splitterModel: 20
	    }
	  }
	}	
</script>