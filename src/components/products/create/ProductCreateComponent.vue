<template>
  <div class="container">
    <div class="card">
      <div class="card-header">
        <h6>Adicionar Produto</h6>
      </div>
      <div class="card-body">
        <VeeForm
          :validation-schema="schema"
          @submit="onSubmit"
        >
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
              <Field
                v-model="selectedMarkId"
                name="selectedMarkId"
                as="select"
                class="form-control"
              >
                <option value="">
                  Selecione a marca
                </option>
                <option
                  v-for="mark in marks"
                  :key="mark.id"
                  :value="mark.id"
                >
                  {{ mark.name }}
                </option>
              </Field>
              <ErrorMessage
                name="selectedMarkId"
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
    const schema = yup.object({
      name: yup
        .string()
        .required("O campo nome é obrigatório")
        .min(3, "O nome deve ter pelo menos 3 caracteres"),
      tension: yup
        .number("O campo tensão deve ser um número")
        .required("O campo tensão é obrigatório"),
      selectedMarkId: yup.string().required("Selecione uma marca"),
      description: yup.string(),
    });

    return {
      schema,
    };
  },

  data() {
    return {
      product: {},
      selectedMarkId: "",
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
