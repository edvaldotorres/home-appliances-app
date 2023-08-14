import { createStore } from "vuex";
import product from "./modules/Product";
import auth from "./modules/Auth";

const Store = createStore({
  modules: {
    auth,
    product,
  },
});

export default Store;
