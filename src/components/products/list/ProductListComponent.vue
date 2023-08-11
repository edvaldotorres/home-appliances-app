<!-- eslint-disable vue/v-on-event-hyphenation -->
<template>
  <div class="container">
    <div class="row justify-content-center mt-2 mb-2">
      <div class="col-8">
        <h4 class="text-left mb-2">
          Todos os produtos
        </h4>
      </div>
      <div class="col-4">
        <input
          v-model="query.search"
          type="text"
          class="form-control"
          placeholder="Buscar Produtos..."
          @input="searchProducts"
        >
      </div>
    </div>
    <div class="">
      <div
        v-if="!isLoading"
        class=""
      >
        <div class="row border-bottom border-top p-2 bg-light">
          <div class="col-1">
            #
          </div>
          <div class="col-2">
            Nome do Produto
          </div>
          <div class="col-2">
            Descrição
          </div>
          <div class="col-2">
            Tensão
          </div>
          <div class="col-2">
            Marca
          </div>
          <div class="col-2">
            Ações
          </div>
        </div>

        <div
          v-for="(item, index) in productsPaginatedData"
          :key="item.id"
        >
          <product-detail
            :index="index"
            :product="item"
          />
        </div>
      </div>

      <div
        v-if="isLoading"
        class="text-center mt-5 mb-5"
      >
        Loading Products...
        <div
          class="spinner-grow"
          role="status"
        >
          <span class="sr-only">Loading...</span>
        </div>
      </div>
    </div>

    <!-- Insert Pagination Part -->
    <div
      v-if="productsPaginatedData !== null"
      class="vertical-center mt-2 mb-5"
    >
      <v-pagination
        v-model="query.page"
        :pages="productsPaginatedData.pagination.total_pages"
        :range-size="2"
        active-color="#DCEDFF"
        @update:modelValue="getResults"
      />
    </div>
  </div>
</template>

<script>
import { mapGetters, mapActions } from "vuex";
import ProductDetail from "../list/ProductDetail";
import VPagination from "@hennge/vue3-pagination";

let debounce = null;

export default {
  components: {
    ProductDetail,
    VPagination,
  },
  data() {
    return {
      query: {
        page: 1,
        search: "",
      },
    };
  },
  computed: { ...mapGetters(["productList", "productsPaginatedData", "isLoading"]) },

  methods: {
    ...mapActions(["fetchAllProducts"]),

    getResults() {
      this.fetchAllProducts(this.query);
    },

    searchProducts() {
      if (debounce) clearTimeout(debounce);
      debounce = setTimeout(() => {
        this.fetchAllProducts(this.query);
      }, 500);
    },
  },

  // eslint-disable-next-line vue/order-in-components
  created() {
    this.fetchAllProducts(this.query);
  },
};
</script>
