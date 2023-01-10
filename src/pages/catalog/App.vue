<template>
  <TheHeader />
  <main class="main">
    <TheHero :crumbs="crumbs">
      <template #title> Каталог </template>
    </TheHero>
    <TheCatalogFilters @changing-filters="filterChangeHandler" />
    <TheCatalogItems :filters="filters" />
  </main>
  <TheFooter />
</template>

<script>
import TheHeader from "@/components/TheHeader.vue";
import TheHero from "@/components/TheHero.vue";
import TheCatalogFilters from "@/components/TheCatalogFilters.vue";
import TheCatalogItems from "@/components/TheCatalogItems.vue";
import TheFooter from "@/components/TheFooter.vue";

export default {
  name: "App",
  components: {
    TheHeader,
    TheHero,
    TheCatalogFilters,
    TheCatalogItems,
    TheFooter,
  },
  data() {
    return {
      filters: {},
      crumbs: [
        ["Главная", "index.html"],
        ["Каталог", "catalog.html", true],
      ],
    };
  },
  methods: {
    filterChangeHandler(filters) {
      this.filters = filters;
    },
  },
};
</script>

<style lang="scss">
@import "../../assets/styles/common/common";

html,
body {
  height: 100%;
}

#app {
  display: flex;
  flex-direction: column;
  height: 100%;

  .main {
    flex-grow: 1;
  }
}
</style>
