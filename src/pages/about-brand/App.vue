<template>
  <TheHeader />
  <main class="main">
    <TheHero :crumbs="crumbs">
      <template #title> О бренде </template>
    </TheHero>
    <TheAboutBrand />
  </main>
  <TheFooter />
</template>

<script>
import TheHeader from "@/components/TheHeader.vue";
import TheHero from "@/components/TheHero.vue";
import TheAboutBrand from "@/components/TheAboutBrand.vue";
import TheFooter from "@/components/TheFooter.vue";

export default {
  name: "App",
  components: {
    TheHeader,
    TheHero,
    TheAboutBrand,
    TheFooter,
  },
  data() {
    return {
      crumbs: [
        ["Главная", "index.html"],
        ["О бренде", "about-brand.html", true],
      ],
    };
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
