<template>
  <div class="row border-1 p-2">
    <div class="col-1 text-left">
      {{ index + 1 }}
    </div>
    <div class="col-2">
      {{ product.name }}
    </div>
    <div class="col-2">
      {{ product.description }}
    </div>
    <div class="col-2">
      <strong class="text-danger">{{ product.tension }}V</strong>
    </div>
    <div class="col-2">
      {{ product.mark.name }}
    </div>
    <div class="col-2">
      <router-link
        :to="{ name: 'ProductEdit', params: { id: product.id } }"
        class="btn btn-primary mr-2"
        title="Edit Product"
      >
        <i class="fa fa-pencil" />
      </router-link>
      <button
        class="btn btn-danger mx-2"
        title="Delete Product"
        @click="deleteProductModal(product.id)"
      >
        <i class="fa fa-trash" />
      </button>
    </div>
  </div>
</template>

<script>
import { mapGetters, mapActions } from "vuex";

export default {
  name: "ProductDetail",
  props: {
    product: {
      type: Object,
      required: true,
    },
    index: {
      type: Number,
      required: true,
      default: 0,
    },
  },

  computed: { ...mapGetters(["isDeleting", "deletedData"]) },

  methods: {
    ...mapActions(["deleteProduct", "fetchAllProducts"]),
    deleteProductModal(id) {
      this.$swal
        .fire({
          text: "Você tem certeza que deseja deletar este produto?",
          icon: "warning",
          cancelButtonText: "Não, Cancelar",
          confirmButtonText: "Sim, Deletar",
          showCancelButton: true,
          reverseButtons: true,
        })
        .then(async result => {
          if (result["isConfirmed"]) {
            // Put delete logic
            await this.deleteProduct(id);
            this.fetchAllProducts({
              page: 1,
              search: ''
            });
            this.$swal.fire({
              text: "Produto deletado com sucesso!",
              icon: "success",
              timer: 3000,
            });
          }
        });
    },
  },
};
</script>
