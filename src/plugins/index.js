import VueSweetalert2 from "vue-sweetalert2";
import router from "./../router";
import Store from "./../store/Store";
import "sweetalert2/dist/sweetalert2.min.css";
import "@hennge/vue3-pagination/dist/vue3-pagination.css";
import "font-awesome/css/font-awesome.min.css";
import "nprogress/nprogress.css";
import "./../store/axios.js";

/**
 * @param {import('vue').App} app
 */
export function installPlugins(app) {
  app.use(router);
  app.use(Store);
  app.use(VueSweetalert2);
  return app;
}
