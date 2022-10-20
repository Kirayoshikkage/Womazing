<template>
  <nav class="navigation-menu">
    <ul class="navigation-menu__list">
      <li
        v-for="[pageName, href] of listItems"
        :key="pageName"
        class="navigation-menu__item"
      >
        <a
          :href="href"
          class="navigation-menu__link"
        >
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
      }
    }
  }
}
</script>

<style lang="scss">
.navigation-menu {
  &__link {
    outline: none;
    border-bottom: rem(1) solid transparent;
    padding-bottom: rem(5);
    font-size: rem(15);
    line-height: lh(21, 15);
    letter-spacing: 0.02em;
    color: var(--color-black);
    transition-property: color, border-color;
    transition-duration: var(--transition-duration);

    @include mouse-device {
      &:focus {
        border-bottom-color: var(--color-gothic);
        color: var(--color-gothic);
      }

      &:hover {
        color: var(--color-gothic);
      }
    }

    @include touch-device {
      &:active {
        color: var(--color-gothic);
      }
    }
  }
}
</style>
