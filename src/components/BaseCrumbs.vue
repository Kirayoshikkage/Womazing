<template>
  <ul class="crumbs">
    <li
      v-for="[name, href, isActive] in crumbs"
      :key="name"
      class="crumbs__item"
    >
      <template v-if="isActive">
        <a
          :href="href"
          class="crumbs__link crumbs__link_active"
          aria-current="page"
        >
          {{ name }}
          <span class="visually-hidden">Текущая страница</span>
        </a>
      </template>
      <template v-else>
        <a :href="href" class="crumbs__link">
          {{ name }}
        </a>
      </template>
    </li>
  </ul>
</template>

<script>
export default {
  props: {
    crumbs: {
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

.crumbs {
  &__item {
    position: relative;
    padding-right: rem(42);

    &:not(:last-child)::before {
      content: "";
      position: absolute;
      top: 50%;
      right: rem(12);
      width: rem(16);
      border-bottom: rem(2) solid var(--color-black);
      transform: translateY(-50%);
    }
  }

  &__link {
    @include text-animation;

    outline: none;
    font-size: rem(17);
    font-weight: 500;
    line-height: lh(24, 17);
    letter-spacing: 0.02em;
    color: var(--color-black);

    &_active {
      color: var(--color-gothic);
    }

    @include x-small {
      font-size: rem(14);
    }
  }
}
</style>
