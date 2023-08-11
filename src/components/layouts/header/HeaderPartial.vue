<template>
  <nav class="navbar navbar-expand navbar-light bg-light sticky-top">
    <div class="container">
      <router-link
        to="/"
        class="navbar-brand"
      >
        # VueCRUD
      </router-link>
      <div class="navbar-nav mr-auto">
        <li class="nav-item">
          <router-link
            to="/products"
            class="nav-link"
          >
            <i class="fa fa-shopping-cart" />
            Produtos
          </router-link>
        </li>
        <li class="nav-item">
          <router-link
            to="/products/create"
            class="nav-link"
          >
            <i class="fa fa-plus-circle" /> 
            Adicionar
          </router-link>
        </li>
        <li class="nav-item">
          <router-link
            to="/about"
            class="nav-link"
          >
            <i class="fa fa-info-circle" />
            Sobre
          </router-link>
        </li>
        <li class="nav-item">
          <router-link
            to="/help"
            class="nav-link"
          >
            <i class="fa fa-question-circle" />
            Ajuda
          </router-link>
        </li>
      </div>
    </div>
  </nav>
</template>

<script>
export default {
  name: "HeaderPartial",
};
</script>
