<template>
  <ul class="category-list">
    <li
      v-for="[category, href] of categoryList"
      :key="category"
      class="category-list__item"
    >
      <a
        class="category-list__link"
        :href="href"
      >
        {{ category }}
      </a>
    </li>
  </ul>
</template>

<script>
export default {
  props: {
    categoryList: {
      type: Array,
      default() {
        return [];
      }
    }
  }
}
</script>

<style lang="scss">
@import '../assets/styles/mixins/text-animation';

.category-list {
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
