<template>
  <div>
    <div class="q-pa-md row items-start q-gutter-md">
      <q-card class="my-card">
        <q-card-section class="section">
          <q-input
          @input="searchProduct"
            outlined
            bottom-slots
            v-model="text"
            :label="$t('search')"
            :dense="true"
            style="width: 300px; margin: 0; padding: 0"
          >
            <template #append>
              <q-icon name="search" />
            </template>
          </q-input>
        </q-card-section>
      </q-card>
    </div>
    <div class="q-pa-md">
      <q-card>
        <q-card-section>
          <div class="row justify-end">
            <q-btn
              color="primary"
              :label="$t('addProduct')"
              @click="(modalProp = true), (propsData = {})"
            />
          </div>

          <!-- List -->

      	<div class="row">
      		<div v-for="(type, index) in get_product_types" 
	      	:key="index" 
	      	 class="col"
	      	 >
      		<div 
	      	class="q-pa-md" 
	      	style="max-width: 350px">
			    <q-list bordered>
			      <q-item>
			        <q-item-section>
			        	<strong style="font-size: 16pt; margin: 10px;">
			        		{{ type.name_uz }}
			        	</strong>
			        </q-item-section>
			      </q-item>

			      <q-list v-if="type.id === 1" bordered separator>
				      <q-item v-for="(product, index) in plants" :key="index" >
				        <q-item-section>
				          <q-item-label> 
				          	<div class="row justify-between">
				          		{{ $t('name') }}: 
				          	<strong>{{ product.name_uz }}</strong>
				          	</div>
				           </q-item-label>
				           <hr style="width: 100%;" />
				           <q-item-label> 
				          	<div class="row justify-between">
				          		{{ $t('address') }}: 
				          	<strong>{{ product.address }}</strong>
				          	</div>
				           </q-item-label>
				           <hr style="width: 100%;" />
				           <q-item-label> 
				          	<div class="row justify-between">
				          		{{ $t('cost') }}: 
				          	<strong>{{ product.cost }}</strong>
				          	</div>
				           </q-item-label>
				           <hr style="width: 100%;" />
				           <q-item-label> 
				          	<div class="row justify-between">
				          		{{ $t('date') }}: 
				          	<strong>{{ new Date(product.created_date).toLocaleDateString() }}</strong>
				          	</div>
				           </q-item-label>
				           <hr style="width: 100%;" />
				           <q-item-label> 
				          	<div class="row justify-between">
				          		{{ $t('actions') }}: 
				          		<div class="row justify-between">
				          			<q-btn
					                  icon="mode_edit"
					                  size="10px"
					                  color="warning"
					                  padding="sm"
					                  class="q-mr-sm"
					                  @click="(modalProp = true), (propsData = product), (typeEdit = 'typeEdit')"
					                ></q-btn>

					                <q-btn
					                  icon="delete"
					                  padding="sm"
					                  size="10px"
					                  color="negative"
					                  @click="deleteConfirm(product.id)"
					                ></q-btn>
				          		</div>
				          	</div>
				           </q-item-label>
				        </q-item-section>

				      </q-item>
			      </q-list>

			      <q-list v-if="type.id === 2" bordered separator>
				      <q-item v-for="(product, index) in animals" :key="index" >
				        <q-item-section  >
				          <q-item-label> 
				          	<div class="row justify-between">
				          		{{ $t('name') }}: 
				          	<strong>{{ product.name_uz }}</strong>
				          	</div>
				           </q-item-label>
				           <hr style="width: 100%;" />
				           <q-item-label> 
				          	<div class="row justify-between">
				          		{{ $t('address') }}: 
				          	<strong>{{ product.address }}</strong>
				          	</div>
				           </q-item-label>
				           <hr style="width: 100%;" />
				           <q-item-label> 
				          	<div class="row justify-between">
				          		{{ $t('cost') }}: 
				          	<strong>{{ product.cost }}</strong>
				          	</div>
				           </q-item-label>
				           <hr style="width: 100%;" />
				           <q-item-label> 
				          	<div class="row justify-between">
				          		{{ $t('date') }}: 
				          	<strong>{{ new Date(product.created_date).toLocaleDateString() }}</strong>
				          	</div>
				           </q-item-label>
				           <hr style="width: 100%;" />
				           <q-item-label> 
				          	<div class="row justify-between">
				          		{{ $t('actions') }}: 
				          		<div class="row justify-between">
				          			<q-btn
					                  icon="mode_edit"
					                  size="10px"
					                  color="warning"
					                  padding="sm"
					                  class="q-mr-sm"
					                  @click="(modalProp = true), (propsData = product), (typeEdit = 'typeEdit')"
					                ></q-btn>

					                <q-btn
					                  icon="delete"
					                  padding="sm"
					                  size="10px"
					                  color="negative"
					                  @click="deleteConfirm(product.id)"
					                ></q-btn>
				          		</div>
				          	</div>
				           </q-item-label>
				        </q-item-section>
				      </q-item>
			      </q-list>

			      <q-list v-if="type.id === 3" bordered separator>
				      <q-item v-for="(product, index) in trees" :key="index" >
				        <q-item-section  >
				          <q-item-label> 
				          	<div class="row justify-between">
				          		{{ $t('name') }}: 
				          	<strong>{{ product.name_uz }}</strong>
				          	</div>
				           </q-item-label>
				           <hr style="width: 100%;" />
				           <q-item-label> 
				          	<div class="row justify-between">
				          		{{ $t('address') }}: 
				          	<strong>{{ product.address }}</strong>
				          	</div>
				           </q-item-label>
				           <hr style="width: 100%;" />
				           <q-item-label> 
				          	<div class="row justify-between">
				          		{{ $t('cost') }}: 
				          	<strong>{{ product.cost }}</strong>
				          	</div>
				           </q-item-label>
				           <hr style="width: 100%;" />
				           <q-item-label> 
				          	<div class="row justify-between">
				          		{{ $t('date') }}: 
				          	<strong>{{ new Date(product.created_date).toLocaleDateString() }}</strong>
				          	</div>
				           </q-item-label>
				           <hr style="width: 100%;" />
				           <q-item-label> 
				          	<div class="row justify-between">
				          		{{ $t('actions') }}: 
				          		<div class="row justify-between">
				          			<q-btn
					                  icon="mode_edit"
					                  size="10px"
					                  color="warning"
					                  padding="sm"
					                  class="q-mr-sm"
					                  @click="(modalProp = true), (propsData = product), (typeEdit = 'typeEdit')"
					                ></q-btn>

					                <q-btn
					                  icon="delete"
					                  padding="sm"
					                  size="10px"
					                  color="negative"
					                  @click="deleteConfirm(product.id)"
					                ></q-btn>
				          		</div>
				          	</div>
				           </q-item-label>
				        </q-item-section>
				      </q-item>
			      </q-list>

			    </q-list>
		</div>
      		</div>
      	</div>
        </q-card-section>
      </q-card>
    </div>    

  <!-- Delete notification -->

    <q-dialog v-model="confirm" persistent>
      <q-card>
        <q-card-section class="row items-center">
          <span class="q-mx-xl q-mt-md text-red">
            <strong> {{ $t("areYouSure") }} </strong>
          </span>
        </q-card-section>

        <q-card-actions align="right">
          <q-btn flat :label="$t('cancel')" color="primary" v-close-popup />
          <q-btn flat color="red" :label="$t('delete')" @click="deleteItem()" />
        </q-card-actions>
      </q-card>
    </q-dialog>

    <AddNewProduct
      @refresh="refresh"
      :product="propsData"
      @close="modalClose"
      :modal-prop="modalProp"
      :typeEdit="typeEdit"
    />
  </div>
</template>

<script>
	import AddNewProduct from "./components/AddNewProduct.vue";
	import { mapActions, mapGetters, mapState } from "vuex";
	export default {
		components: {
			AddNewProduct,
		},
	  data () {
	    return {
	    	loading: false,
	    	data: [],
	    	confirmId: null,
	      	confirm: false,
	      	modalProp: false,
	      	text: "",
      		ph: "",
	      	propsData: {},
	      	product_types: [],
	      	typeEdit: '',
	      	columns: [
		        {
		          label: this.$t("trees"),
		          field: "trees",
		          name: "trees",
		          align: "center",
		        },
		        {
		          label: this.$t("plants"),
		          field: "plants",
		          name: "plants",
		          align: "center",
		        },
		        {
		          label: this.$t("animals"),
		          field: "animals",
		          name: "animals",
		          align: "center",
		        },
	      	],
	      	trees: [],
	      	plants: [],
	      	animals: [],
	    }
	  },


	async mounted() {
    await this.fetch_product_types();
    // if (this.products.length === 0) {
      this.refresh();
    // }
  },

  computed: {
    ...mapGetters("products", ["get_products", "get_product_types"]),
    ...mapState('products', ['products'])
  },

  methods: {
    ...mapActions("products", [
      "fetch_products",
      "delete_product",
      "fetch_product_types",
    ]),
    modalClose() {
      this.modalProp = false;
      this.typeEdit = ''
    },
    searchProduct(e) {
      this.data = this.get_products.filter(el => el.name_uz.toLowerCase().includes(e.toLowerCase()))
    },

    deleteConfirm(id) {
      this.confirm = true;
      this.confirmId = id;
    },
    deleteItem() {
      this.delete_product(this.confirmId).then(() => {
        this.$q.notify({
          type: "positive",
          message: this.$t('deleteToast'),
          position: "top-right",
          textColor: "white",
          timeout: 2500,
          actions: [{ icon: "close", color: "white" }],
        });
        this.refresh(this.pagination);
        this.confirm = false;
      });
    },
    async refresh() {
      this.loading = true
      await this.fetch_products().then(() => {
      	this.plants = []
      	this.animals = []
      	this.trees = []
        
        this.get_products.forEach(el => {
        	if(el.product_type_id === 1) {
        		this.plants.push(el)
        	} else if (el.product_type_id === 2) {
        		this.animals.push(el)
        	} else {
        		this.trees.push(el)
        	}
        })

        this.loading = false

        // this.get_products.forEach((el) => {
        //   el.created_date = new Date(el.created_date).toLocaleDateString();
        //   console.log(el);
        // });
      });
    },
  },
}
</script>
