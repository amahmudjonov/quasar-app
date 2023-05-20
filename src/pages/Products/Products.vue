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
            :dense="dense"
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
          <q-table
            class="my-sticky-table q-mt-md"
            :virtual-scroll="false"
            :pagination.sync="pagination"
            :rows-per-page-options="[3, 5, 10]"
            @request="changePaginationValue"
            row-key="index"
            title=""
            :data="data"
            bordered
            :loading="loading"
            flat
            :columns="columns"
            :no-data-label="$t('no_data')"
          >
          <template #loading>
            <q-inner-loading showing color=primary />
          </template>
            <template #body-cell-index="props">
              <q-td align="center" :props="props">
                {{ props.pageIndex + 1 }}
              </q-td>
            </template>

            <template #body-cell-id="props">
              <q-td :props="props">
                {{ props.row.id }}
              </q-td>
            </template>

            <template #body-cell-product_types="props">
              <q-td align="center" :props="props">
                {{
                  get_product_types[
                    get_product_types.findIndex(
                      (el) => el.id === props.row.product_type_id
                    )
                  ]
                    ? get_product_types[get_product_types.findIndex(
                        (el) => el.id === props.row.product_type_id 
                      )].name_uz
                    : "- - -"
                }}
              </q-td>
            </template>

            <template #body-cell-date="props">
              <q-td :props="props">
                {{ new Date(props.row.created_date).toLocaleDateString() }}
              </q-td>
            </template>

            <template #body-cell-actions="props">
              <q-td :props="props">
                <q-btn
                  icon="mode_edit"
                  size="10px"
                  color="warning"
                  padding="sm"
                  class="q-mr-sm"
                  @click="(modalProp = true), (propsData = props.row)"
                ></q-btn>

                <q-btn
                  icon="delete"
                  padding="sm"
                  size="10px"
                  color="negative"
                  @click="deleteConfirm(props.row.id)"
                ></q-btn>
              </q-td>
            </template>
          </q-table>
        </q-card-section>
      </q-card>
    </div>

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
      typeEdit=""
    />
  </div>
</template>

<script>
import AddNewProduct from "./components/AddNewProduct.vue";
import { mapActions, mapGetters, mapState } from "vuex";
import { type } from "os";

export default {
  components: {
    AddNewProduct,
  },
  data() {
    return {
      loading: false,
      data: [],
      text: "",
      ph: "",
      confirmId: null,
      confirm: false,
      modalProp: false,
      propsData: {},
      dense: true,
      pagination: {
        page: 1,
        rowsPerPage: 5,
        perPage: 5,
        rowsNumber: 20,
        total: null,
      },

      product_types: [],

      columns: [
        {
          label: "#",
          name: "index",
          align: "center",
        },
        {
          label: "ID",
          field: "id",
          name: "id",
          align: "center",
        },
        {
          label: this.$t("name"),
          field: "name_uz",
          align: "center",
        },
        {
          label: this.$t("productType"),
          field: "product_type_id",
          name: "product_types",
          align: "center",
        },
        {
          label: this.$t("address"),
          field: "address",
          align: "center",
        },
        {
          label: this.$t("cost"),
          field: "cost",
          align: "center",
        },
        {
          label: this.$t("date"),
          field: "created_date",
          name: "date",
          align: "center",
        },
        {},
        {
          label: this.$t("actions"),
          name: "actions",
          align: "center",
        },
      ],
    };
  },

  async mounted() {
    await this.fetch_product_types();
    // if (this.products.length === 0) {
      this.refresh(this.pagination);
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
    },
    searchProduct(e) {
      this.data = this.get_products.filter(el => el.name_uz.toLowerCase().includes(e.toLowerCase()))
    },
    changePaginationValue({ pagination, filter }) {
      this.pagination = {
        page: pagination.page,
        rowsPerPage: pagination.rowsPerPage,
      };

      this.pagination.total += this.pagination.rowsPerPage

      this.refresh({
        page: pagination.page,
        perPage: pagination.rowsPerPage,
      });



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
    async refresh(atr = this.pagination) {
      this.loading = true
      await this.fetch_products(atr).then(() => {
        this.data = this.get_products;

        this.loading = false

        // this.get_products.forEach((el) => {
        //   el.created_date = new Date(el.created_date).toLocaleDateString();
        //   console.log(el);
        // });
      });
    },
  },
};
</script>

<style lang="scss">
.my-card {
  width: 100vw;

  .section {
    display: flex;
    justify-content: space-between;
    align-items: center;
  }
}
.my-sticky-virtscroll-table {
  /* height or max-height is important */
  height: 410px;
}
.q-table__top,
.q-table__bottom,
thead tr:first-child th {
  /* bg color is important for th; just specify one */
  background-color: #fff;
}

thead tr th {
  position: sticky;
  z-index: 1;
}
/* this will be the loading indicator */
thead tr:last-child th {
  /* height of all previous header rows */
  top: 48px;
}
thead tr:first-child th {
  top: 0;
}
</style>
