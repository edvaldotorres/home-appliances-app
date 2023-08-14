// import { GET_ALL_PRODUCTS } from "./Types";
import axios from "axios";
import { $http } from "../../http";

// initial state //TODO: State deve estar em um arquivo separado
const state = () => ({
  products: [],
  productsPaginatedData: null,
  product: null,
  isLoading: false,
  isCreating: false,
  createdData: null,
  isUpdating: false,
  updatedData: null,
  isDeleting: false,
  deletedData: null,
  marks: [],
});

// getters //TODO: getters deve estar em um arquivo separado
const getters = {
  productList: (state) => state.products,
  productsPaginatedData: (state) => state.productsPaginatedData,
  product: (state) => state.product,
  isLoading: (state) => state.isLoading,
  isCreating: (state) => state.isCreating,
  isUpdating: (state) => state.isUpdating,
  createdData: (state) => state.createdData,
  updatedData: (state) => state.updatedData,

  isDeleting: (state) => state.isDeleting,
  deletedData: (state) => state.deletedData,
  marks: (state) => state.marks,
};

const services = {
  products: "products",
};

// TODO: Criar um arquivo e adicionar esse objeto types 👇
export const types = Object.freeze({
  SET_PRODUCTS: "setProducts",
  SET_PRODUCTS_PAGINATED: "setProductsPaginated",
  SET_PRODUCT_DETAIL: "setProductDetail",
  SET_DELETE_PRODUCT: "setDeleteProduct",
  SET_PRODUCT_DETAIL_INPUT: "setProductDetailInput",
  SAVE_NEW_PRODUCTS: "saveNewProducts",
  SAVE_UPDATED_PRODUCT: "saveUpdatedProduct",
  SET_PRODUCT_IS_LOADING: "setProductIsLoading",
  SET_PRODUCT_IS_CREATING: "setProductIsCreating",
  SET_PRODUCT_IS_UPDATING: "setProductIsUpdating",
  SET_PRODUCT_IS_DELETING: "setProductIsDeleting",
  SET_MARKS: "setMarks",
});

// actions //TODO: Actions deve estar em um arquivo separado
const actions = {
  async fetchAllProducts({ commit }, query = {}) {
    // If a search query is present, force the page to be 1
    const params = {
      page: query?.search ? 1 : (query?.page || 1),
      search: query?.search || "",
    };

    commit("setProductIsLoading", true);
    try {
      const { data } = await $http.get(services.products, { params });
      const products = data.data;
      commit("setProducts", products);
      const pagination = {
        total: data.meta.total,
        per_page: data.meta.per_page,
        current_page: data.meta.current_page,
        total_pages: data.meta.last_page,
      };
      products.pagination = pagination;
      commit("setProductsPaginated", products);
    } catch (error) {
      console.error("error", error);
    } finally {
      commit("setProductIsLoading", false);
    }
  },

  async fetchDetailProduct({ commit }, id) {
    commit("setProductIsLoading", true);
    await axios // TODO: Trocar axios por $http e adicionar o parâmetro "id" a query do $http
      .get(`${process.env.VUE_APP_API_URL}products/${id}`)
      .then((res) => {
        commit("setProductDetail", res.data.data);
        commit("setProductIsLoading", false);
      })
      .catch((err) => {
        console.log("error", err);
        commit("setProductIsLoading", false);
      });
  },

  async storeProduct({ commit }, product) {
    commit("setProductIsCreating", true);
    await axios // TODO: Trocar axios por $http e adicionar o parâmetro "id" a query do $http
      .post(`${process.env.VUE_APP_API_URL}products`, product)
      .then((res) => {
        commit("saveNewProducts", res.data.data);
        commit("setProductIsCreating", false);
      })
      .catch((err) => {
        console.log("error", err);
        commit("setProductIsCreating", false);
      });
  },

  async updateProduct({ commit }, product) {
    commit("setProductIsUpdating", true);
    commit("setProductIsUpdating", true);
    await axios // TODO: Trocar axios por $http e adicionar o parâmetro "id" a query do $http
      .post(
        `${process.env.VUE_APP_API_URL}products/${product.id}?_method=PUT`,
        product
      )
      .then((res) => {
        commit("saveUpdatedProduct", res.data.data);
        commit("setProductIsUpdating", false);
      })
      .catch((err) => {
        console.log("error", err);
        commit("setProductIsUpdating", false);
      });
  },

  async deleteProduct({ commit }, id) {
    commit("setProductIsDeleting", true);
    await axios // TODO: Trocar axios por $http e adicionar o parâmetro "id" a query do $http
      .delete(`${process.env.VUE_APP_API_URL}products/${id}`)
      .then((res) => {
        commit("setDeleteProduct", res.data.data.id);
        commit("setProductIsDeleting", false);
      })
      .catch((err) => {
        console.log("error", err);
        commit("setProductIsDeleting", false);
      });
  },

  async fetchAllMarks({ commit }) {
    commit("setProductIsLoading", true);
    await axios // TODO: Trocar axios por $http e adicionar o parâmetro "id" a query do $http
      .get(`${process.env.VUE_APP_API_URL}products/view/marks`)
      .then((res) => {
        commit("setMarks", res.data.data);
        commit("setProductIsLoading", false);
      })
      .catch((err) => {
        console.log("error", err);
        commit("setProductIsLoading", false);
      });
  },

  updateProductInput({ commit }, e) {
    // FIXME: utilizar v-model
    commit("setProductDetailInput", e);
  },
};

// mutations //TODO: Mutations deve estar em um arquivo separado
const mutations = {
  [types.SET_PRODUCTS]: (state, payload) => {
    state.products = payload;
  },

  [types.SET_PRODUCTS_PAGINATED]: (state, payload) => {
    state.productsPaginatedData = payload;
  },

  [types.SET_PRODUCT_DETAIL]: (state, payload) => {
    state.product = payload;
  },

  [types.SET_DELETE_PRODUCT]: (state, id) => {
    state.productsPaginatedData.data.filter((x) => x.id !== id);
  },

  [types.SET_PRODUCT_DETAIL_INPUT]: (state, e) => {
    const product = state.product;
    product[e.target.name] = e.target.value; // FIXME: utilizar v-model
    state.product = product;
  },

  saveNewProducts: (state, product) => {
    state.products.unshift(product);
    state.createdData = product;
  },

  saveUpdatedProduct: (state, product) => {
    state.products.unshift(product);
    state.updatedData = product;
  },

  setProductIsLoading(state, isLoading) {
    state.isLoading = isLoading;
  },

  setProductIsCreating(state, isCreating) {
    state.isCreating = isCreating;
  },

  setProductIsUpdating(state, isUpdating) {
    state.isUpdating = isUpdating;
  },

  setProductIsDeleting(state, isDeleting) {
    state.isDeleting = isDeleting;
  },

  setMarks: (state, marks) => {
    state.marks = marks;
  },
};

export default {
  state,
  getters,
  actions,
  mutations,
};
