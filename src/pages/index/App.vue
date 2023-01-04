<template>
  <TheHeader />
  <main>
    <TheIndexHero />
    <TheNewCollection />
    <TheImportantToUs />
    <TheDreamTeam />
  </main>
  <TheFooter />
</template>

<script>
import TheHeader from "../../components/TheHeader.vue";
import TheIndexHero from "../../components/TheIndexHero.vue";
import TheNewCollection from "../../components/TheNewCollection.vue";
import TheImportantToUs from "../../components/TheImportantToUs.vue";
import TheDreamTeam from "../../components/TheDreamTeam.vue";
import TheFooter from "../../components/TheFooter.vue";

export default {
  name: "App",
  components: {
    TheHeader,
    TheIndexHero,
    TheNewCollection,
    TheImportantToUs,
    TheDreamTeam,
    TheFooter,
  },
};
</script>

<style lang="scss">
@import "../../assets/styles/common/common";

.index-hero {
  position: relative;

  &::before {
    content: "";
    position: absolute;
    right: 0;
    top: rem(-108);
    z-index: -1;
    width: 46%;
    height: calc(100% + rem(167));
    background-color: var(--color-ecru);

    @include medium {
      display: none;
    }
  }
}
</style>
