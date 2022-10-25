<template>
  <TheHeader />
  <main>
    <TheHomeHero />
    <TheImportantToUs />
    <TheDreamTeam />
  </main>
  <TheFooter />
</template>

<script>
import TheHeader from '../../components/TheHeader.vue';
import TheHomeHero from '../../components/TheHomeHero.vue';
import TheImportantToUs from '../../components/TheImportantToUs.vue';
import TheDreamTeam from '../../components/TheDreamTeam.vue';
import TheFooter from '../../components/TheFooter.vue';

export default {
  name: 'App',
  components: {
    TheHeader,
    TheHomeHero,
    TheImportantToUs,
    TheDreamTeam,
    TheFooter
  },
  provide() {
    return {
      getCurrentPageName: this.getCurrentPageName,
    }
  },
  methods: {
    getCurrentPageName() {
      return 'Главная'
    }
  }
}
</script>

<style lang="scss">
@import '../../assets/styles/common/common';

#app {
  .home-hero {
    position: relative;

    &::before {
      content: '';
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
}
</style>
