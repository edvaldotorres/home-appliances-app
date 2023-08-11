<template>
  <div class="vue-helper">
    <p>
      Para obter um guia e receitas sobre como configurar/personalizar este projeto,
      confira a 
      <a
        href="https://cli.vuejs.org"
        target="_blank"
        rel="noopener"
      >documentação do vue-cli</a>.
    </p>
    <h3>Plug-ins CLI instalados</h3>
    <ul>
      <li>
        <a
          href="https://github.com/vuejs/vue-cli/tree/dev/packages/%40vue/cli-plugin-babel"
          target="_blank"
          rel="noopener"
        >babel</a>
      </li>
      <li>
        <a
          href="https://github.com/vuejs/vue-cli/tree/dev/packages/%40vue/cli-plugin-eslint"
          target="_blank"
          rel="noopener"
        >eslint</a>
      </li>
    </ul>
    <h3>Links Essenciais</h3>
    <ul>
      <li>
        <a
          href="https://vuejs.org"
          target="_blank"
          rel="noopener"
        >Documentos principais</a>
      </li>
      <li>
        <a
          href="https://forum.vuejs.org"
          target="_blank"
          rel="noopener"
        >Fórum</a>
      </li>
      <li>
        <a
          href="https://chat.vuejs.org"
          target="_blank"
          rel="noopener"
        >Bate-papo da comunidade</a>
      </li>
      <li>
        <a
          href="https://twitter.com/vuejs"
          target="_blank"
          rel="noopener"
        >Twitter</a>
      </li>
      <li>
        <a
          href="https://news.vuejs.org"
          target="_blank"
          rel="noopener"
        >Notícias</a>
      </li>
    </ul>
    <h3>Ecossistema</h3>
    <ul>
      <li>
        <a
          href="https://router.vuejs.org"
          target="_blank"
          rel="noopener"
        >vue-router</a>
      </li>
      <li>
        <a
          href="https://vuex.vuejs.org"
          target="_blank"
          rel="noopener"
        >vuex</a>
      </li>
      <li>
        <a
          href="https://github.com/vuejs/vue-devtools#vue-devtools"
          target="_blank"
          rel="noopener"
        >vue-devtools</a>
      </li>
      <li>
        <a
          href="https://vue-loader.vuejs.org"
          target="_blank"
          rel="noopener"
        >vue-loader</a>
      </li>
      <li>
        <a
          href="https://github.com/vuejs/awesome-vue"
          target="_blank"
          rel="noopener"
        >awesome-vue</a>
      </li>
    </ul>
  </div>
</template>

<script>
export default {
  name: "HelloWorld",
  props: {
    // eslint-disable-next-line vue/require-default-prop
    msg: String,
  },
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
h3 {
  margin: 40px 0 0;
}
ul {
  list-style-type: none;
  padding: 0;
}
li {
  display: inline-block;
  margin: 0 10px;
}
a {
  color: #42b983;
}
</style>
