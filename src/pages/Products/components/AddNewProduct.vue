<template>
  <q-dialog @show="modalShow" @hide="modalClose" v-model="icon" persistent>
    <q-card>
      <q-card-section class="row items-center q-pb-none">
        <div class="text-h6">
          {{ product.id ? $t("editProduct") : $t("addProduct") }}
        </div>
        <q-space />
        <q-btn icon="close" flat round dense v-close-popup />
      </q-card-section>

      <q-card-section class="card-section">
        <q-form ref="myForm" @submit="onSubmit" class="q-gutter-md">
          <q-select
          v-if="typePage !== 'typeEdit'"
            @input="selectProductType"
            outlined
            v-model="selected"
            :options="options"
            :option-label="
              (item) => (item === null ? 'Null value' : item.name_uz)
            "
            :label="$t('productTypes')"
            lazy-rules
            :rules="[(val) => val !== null || $t('validationError')]"
          />
          <div v-else>
            <q-radio v-for="(type, index) in new_product_types" :key='index' v-model="selected" :val="type" :label="type.name_uz" />
          </div>
          <q-input
            outlined
            v-model="data.name_uz"
            :label="$t('name')"
            lazy-rules
            :rules="[(val) => (val && val.length > 0) || $t('validationError')]"
          />
          <q-input
            outlined
            v-model="data.cost"
            :label="$t('cost')"
            type="number"
            lazy-rules
            :rules="[(val) => (val && val.length > 0) || $t('validationError')]"
          />
          <q-input
            outlined
            v-model="data.address"
            :label="$t('address')"
            type="textarea"
            lazy-rules
            :rules="[(val) => (val && val.length > 0) || $t('validationError')]"
          />
        </q-form>
      </q-card-section>

      <q-card-actions align="right" class="text-primary">
        <q-btn color="red" :label="$t('cancel')" v-close-popup />
        <q-btn
          @click="onSubmit"
          type="submit"
          color="primary"
          v-if="!loading"
        >
          <span>
            {{ $t('save') }}
          </span>
        </q-btn>
        <q-btn
          color="primary"
          v-else
        >
          <q-spinner
            color="blue-1"
            size="1em"
          />
        </q-btn>
      </q-card-actions>
    </q-card>
  </q-dialog>
</template>

<script>
import { mapActions, mapGetters } from "vuex";
import { date } from "quasar";

export default {
  data() {
    return {
      icon: false,
      selected: null,
      options: [],
      data: {
        product_type_id: null,
        name_uz: "",
        cost: "",
        address: "",
        created_date: new Date(),
      },
      loading: false,
      typePage: ''
    };
  },
  props: {
    modalProp: {
      type: Boolean,
      default: () => false,
    },

    product: {
      type: Object,
      default: () => {},
    },
    typeEdit: {
      type: String,
    default: () => ''
    }
  },
  watch: {
    modalProp(val) {
      this.icon = val;
    },
    selected(val) {
      if (this.typeEdit === 'typeEdit') {
        this.data.product_type_id = val.id
      }
    }
  },

  computed: {
    ...mapGetters("products", ["get_product_types"]),
  },

  methods: {
    ...mapActions("products", [
      "fetch_product_types",
      "create_product",
      "update_product",
    ]),

    async modalShow() {

      this.typePage = this.typeEdit
      
      if(this.typeEdit === 'typeEdit') {

        this.new_product_types = this.get_product_types.filter(el => el.id !== this.product.product_type_id)
      }

      this.loading = false
      await this.fetch_product_types().then(() => {
        this.options = this.get_product_types;
      });
      if (this.product.id) {
        this.selected =
          this.get_product_types[
            this.get_product_types.findIndex(
              (el) => el.id === this.product.product_type_id
            )
          ];
        const formattedString = date.formatDate(
          this.product.created_date,
          "YYYY-MM-DD"
        );
        this.data = {
          product_type_id: this.product.product_type_id,
          name_uz: this.product.name_uz,
          cost: JSON.stringify(this.product.cost),
          address: this.product.address,
          created_date: formattedString,
        };
      } else {
        this.reset();
      }
    },
    async onSubmit() {
        this.loading = true
        this.$refs.myForm.validate().then((success) => {
          if (!success) return;
          if (this.product.id) {
            const formattedString = date.formatDate(
              this.data.created_date,
              "YYYY-MM-DDTHH:mm:ss.SSSZ"
            );
            this.update_product({
              id: this.product.id,
              ...this.data,
              created_date: formattedString,
            })
              .then(() => {
                this.$emit("refresh");
                this.$q.notify({
                  type: "positive",
                  message: this.$t("changeToast"),
                  position: "top-right",
                  textColor: "white",
                  timeout: 2500,
                  actions: [{ icon: "close", color: "white" }],
                });
                this.icon = false;
              })
              .catch(() => {
                this.$q.notify({
                  type: "negative",
                  message: this.$t("error"),
                  position: "top-right",
                  textColor: "white",
                  timeout: 2500,
                  actions: [{ icon: "close", color: "white" }],
                });
              });
          } else {
            const formattedString = date.formatDate(
              new Date(),
              "YYYY-MM-DDTHH:mm:ss.SSSZ"
            );
            this.create_product({
              ...this.data,
              created_date: formattedString,
            })
              .then((res) => {
                this.$emit("refresh");
                this.$q.notify({
                  type: "positive",
                  message: this.$t("successToast"),
                  position: "top-right",
                  textColor: "white",
                  timeout: 2500,
                  actions: [{ icon: "close", color: "white" }],
                });
                this.icon = false;
              })
              .catch(() => {
                this.$q.notify({
                  type: "negative",
                  message: this.$t("error"),
                  position: "top-right",
                  textColor: "white",
                  timeout: 2500,
                  actions: [{ icon: "close", color: "white" }],
                });
              });
          }
        });
      
    },
    reset() {
      this.selected = null;
      this.data = {
        product_type_id: null,
        name_uz: "",
        cost: "",
        address: "",
        created_date: null,
      };
    },
    modalClose() {
      this.$emit("close");
    },
    selectProductType(e) {
      this.data.product_type_id = e.id;
    },
  },
};
</script>

<style lang="scss">
.card-section {
  width: 500px;

  * {
    margin-bottom: 5px;
  }
}
</style>
