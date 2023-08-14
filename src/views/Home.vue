<template>
  <div class="home">
    <div class="p-4">
      <div class="row">
        <div class="col-md-2">
          <router-link
            to="/products"
            class="btn btn-primary p-4 dashboard-widget"
          >
            <div style="display: block">
              Listar Produtos
            </div>
            <span
              v-if="productsPaginatedData !== null"
              class="badge badge-info"
            >
              {{ productsPaginatedData.pagination.total }}
            </span>
          </router-link>
        </div>
        <div class="col-md-2">
          <router-link
            to="/products/create"
            class="btn btn-primary p-4 dashboard-widget"
          >
            Adicionar Produto <i class="fa fa-plus-circle" />
          </router-link>
        </div>
      </div>
    </div>
    <div>
      <ProductListComponent />
    </div>
  </div>
</template>

<script>
import { mapGetters, mapActions } from "vuex";
import ProductListComponent from "../components/products/list/ProductListComponent.vue";

export default {
  name: "Home",

  components: { ProductListComponent },

  computed: {
    ...mapGetters(["productsPaginatedData"]),
  },

  created() {
    this.fetchAllProducts(1);
  },

  methods: {
    ...mapActions(["fetchAllProducts"]),
  },
};
</script>
