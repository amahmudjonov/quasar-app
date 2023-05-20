import Api from "src/libs/api.service";

const Products = new Api("/product/");
const ProductType = new Api("/product/get-product-types");

export default {
  fetch_product_types({ commit }, params) {
    return new Promise((resolve, reject) => {
      ProductType.get(params)
        .then((response) => {
          commit("set_product_types", response.data);
          resolve(response.data);
        })
        .catch((err) => {
          reject(err);
        });
    });
  },
  fetch_products({ commit }, params) {
    return new Promise((resolve, reject) => {
      Products.get(params)
        .then((response) => {
          commit("set_products", response.data);
          resolve(response.data);
        })
        .catch((err) => {
          reject(err);
        });
    });
  },
  fetch_product({ commit }, id) {
    return new Promise((resolve, reject) => {
      Products.getOne(id)
        .then((response) => {
          commit("set_product", response.data);
          resolve(response.data);
        })
        .catch((err) => {
          reject(err);
        });
    });
  },
  update_product(_, data) {
    return Products.update(data);
  },
  create_product(_, data) {
    return Products.create(data);
  },
  delete_product(_, id) {
    return Products.delete(id);
  },
};
