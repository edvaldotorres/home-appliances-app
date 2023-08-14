<template>
  <div class="container">
    <div class="card">
      <div class="card-header">
        <h6>Editar Produto</h6>
      </div>
      <div class="card-body">
        <VeeForm
          :validation-schema="schema"
          @submit="onSubmit"
        >
          <div v-if="isLoading">
            <div class="text-center">
              <div
                class="spinner-border text-primary"
                role="status"
              >
                <span class="sr-only">Carregando...</span>
              </div>
              <br>
              Carregando Detalhes do Produto
            </div>
          </div>
          <div v-if="product !== null && !isLoading">
            <div class="form-group row">
              <div class="col-6 my-1">
                <label>Nome do Produto:</label>
                <Field
                  id="name"
                  name="name"
                  type="text"
                  class="form-control"
                  :value="product.name"
                  @input="updateProductInputAction"
                />
                <ErrorMessage
                  name="name"
                  class="text-capitalize text-danger"
                />
              </div>
              <div class="col-3">
                <label>Tensão:</label>
                <Field
                  name="tension"
                  type="number"
                  class="form-control"
                  :value="product.tension"
                  @input="updateProductInputAction"
                />
                <ErrorMessage
                  name="tension"
                  class="text-capitalize text-danger"
                />
              </div>
              <div class="col-3">
                <label>Marca:</label>
                <Field
                  v-model="product.mark.id"
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
                  name="description"
                  as="textarea"
                  class="form-control"
                  :value="product.description"
                  @input="updateProductInputAction"
                />
                <ErrorMessage
                  name="description"
                  class="text-capitalize text-danger"
                />
              </div>
            </div>
            <div class="form-group my-3">
              <router-link
                to="/products"
                class="btn btn-secondary mr-2"
              >
                Cancelar
              </router-link>
              <input
                v-if="!isUpdating"
                type="submit"
                class="btn btn-primary mx-2"
                value="Salvar"
              >
              <button
                v-if="isUpdating"
                class="btn btn-primary"
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
      id: null,
    };
  },

  computed: {
    ...mapGetters([
      "isUpdating",
      "updatedData",
      "product",
      "isLoading",
      "marks",
    ]),
  },

  watch: {
    updatedData: function () {
      if (this.updatedData !== null && !this.isUpdating) {
        this.$swal.fire({
          text: "Produto atualizado com sucesso!",
          icon: "success",
          position: "top-end",
          timer: 1000,
        });

        this.$router.push({ name: "Products" });
      }
    },
  },

  created: function () {
    this.init();
    this.id = this.$route.params.id;
    this.fetchDetailProduct(this.id);
  },

  methods: {
    ...mapActions([
      "updateProduct",
      "updateProductInput",
      "fetchDetailProduct",
      "fetchAllMarks",
    ]),

    async init() {
      await this.fetchAllMarks();
    },

    onSubmit() {
      const { name, tension, description } = this.product;
      this.updateProduct({
        id: this.id,
        name: name,
        tension: tension,
        description: description,
        mark_id: this.product.mark.id
      });
    },
    
    updateProductInputAction(e) {
      this.updateProductInput(e);
    },
  },
};
</script>
