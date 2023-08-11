<template>
  <div class="container">
    <div class="card">
      <div class="card-header">
        <h6>Adicionar Produto</h6>
      </div>
      <div class="card-body">
        <!-- <form v-on:submit.prevent="onSaveProduct" :validation-schema="schema"> -->
        <VeeForm
          :validation-schema="schema"
          @submit="onSubmit"
        >
          <!-- <Form @submit="onSaveProduct" :validation-schema="schema"> -->
          <div class="form-group row my-1">
            <div class="col-6">
              <label>Nome do Produto:</label>
              <Field
                id="name"
                v-model="product.name"
                name="name"
                type="text"
                class="form-control"
              />
              <ErrorMessage
                name="name"
                class="text-capitalize text-danger"
              />
            </div>
            <div class="col-3">
              <label>Tensão:</label>
              <Field
                v-model="product.tension"
                name="tension"
                type="number"
                class="form-control"
              />
              <ErrorMessage
                name="tension"
                class="text-capitalize text-danger"
              />
            </div>
            <div class="col-3">
              <label>Marca:</label>
              <select
                v-model="selectedMarkId"
                class="form-control"
              >
                <option value="">
                  Select a brand
                </option>
                <option
                  v-for="brand in marks"
                  :key="brand.id"
                  :value="brand.id"
                >
                  {{ brand.name }}
                </option>
              </select>
              <ErrorMessage
                v-if="selectedBrand === null"
                name="selectedBrand"
                class="text-capitalize text-danger"
              />
            </div>
          </div>
          <div class="form-group row my-1">
            <div class="col-12">
              <label>Descrição:</label>
              <Field
                v-model="product.description"
                name="description"
                as="textarea"
                class="form-control"
              />
              <ErrorMessage
                name="description"
                class="text-capitalize text-danger"
              />
            </div>
          </div>
          <div class="form-group">
            <router-link
              to="/products"
              class="btn btn-secondary mr-2"
            >
              Cancelar
            </router-link>
            <input
              v-if="!isCreating"
              type="submit"
              class="btn btn-primary mx-2 my-2"
              value="Salvar"
            >
            <button
              v-if="isCreating"
              class="btn btn-primary mx-2 my-2"
              type="button"
              disabled
            >
              <span
                class="spinner-border spinner-border-sm"
                role="status"
                aria-hidden="true"
              />
              Saving...
            </button>
          </div>
        </VeeForm>
      </div>
    </div>
  </div>
</template>

<script>
import { mapActions, mapGetters } from "vuex";
import { Field, Form as VeeForm, ErrorMessage } from "vee-validate";
import * as yup from "yup";

export default {
  components: {
    Field,
    VeeForm,
    ErrorMessage,
  },

  setup() {
    // Define a validation schema
    const schema = yup.object({
      name: yup.string().required().min(5),
      tension: yup.string().required(),
      description: yup.string().required().min(5),
    });

    return {
      schema,
    };
  },

  data() {
    return {
      product: {},
      selectedMarkId: null
    };
  },

  computed: { ...mapGetters(["isCreating", "createdData", "marks"]) },

  watch: {
    createdData: function () {
      if (this.createdData !== null && !this.isCreating) {
        this.$swal.fire({
          text: "Produto criado com sucesso!",
          icon: "success",
          position: "top-end",
          timer: 1000,
        });

        this.$router.push({ name: "Products" });
      }
    },
  },

  methods: {
    ...mapActions(["storeProduct", "fetchAllMarks"]),
    async init() {
      await this.fetchAllMarks();
    },

    onSubmit() {
      const { name, tension, description } = this.product;
      this.storeProduct({
        name: name,
        tension: tension,
        description: description,
        mark_id: this.selectedMarkId,
      });
    },
  },

  // eslint-disable-next-line vue/order-in-components
  mounted() {
    this.init(); 
  },
};
</script>
