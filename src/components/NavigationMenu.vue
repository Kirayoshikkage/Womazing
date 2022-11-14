<template>
  <nav class="navigation-menu">
    <ul class="navigation-menu__list">
      <li
        v-for="[pageName, href] of listItems"
        :key="pageName"
        class="navigation-menu__item"
      >
        <a :href="href" class="navigation-menu__link">
          {{ pageName }}
        </a>
      </li>
    </ul>
  </nav>
</template>

<script>
export default {
  props: {
    listItems: {
      type: Array,
      default() {
        return [];
      },
    },
  },
};
</script>

<style lang="scss">
@import "../assets/styles/mixins/text-animation";

.navigation-menu {
  &__link {
    @include text-animation;

    outline: none;
    font-size: rem(15);
    line-height: lh(21, 15);
    letter-spacing: 0.02em;
    color: var(--color-black);
  }
}
</style>
