<template>
  <ul class="filters-list">
    <li
      v-for="[filter, href] of filtersList"
      :key="filter"
      class="filters-list__item"
    >
      <a class="filters-list__link" :href="href">
        {{ filter }}
      </a>
    </li>
  </ul>
</template>

<script>
export default {
  props: {
    filtersList: {
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

.filters-list {
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
