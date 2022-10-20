<template>
  <a
    href="#"
    class="shopping-basket"
  >
    <BasketIcon aria-label="Корзина товаров" />
    <span class="shopping-basket__amount">
      <span class="visually-hidden">Товаров в корзине:</span>
      5
    </span>
  </a>
</template>

<script>
import BasketIcon from './icons/BasketIcon.vue';

export default {
  components: {
    BasketIcon
  }
}
</script>

<style lang="scss">
.shopping-basket {
  position: relative;
  display: inline-block;
  outline: none;
  padding: 0.5rem;
  transition: background var(--transition-duration);

  svg {
    transition: fill var(--transition-duration);
  }

  &__amount {
    position: absolute;
    right: rem(-4);
    top: rem(-4);
    display: block;
    border-radius: 10%;
    padding: rem(2.5) rem(5);
    font-family: 'Arial', 'Helvetica', sans-serif;
    font-size: rem(9);
    color: var(--color-white);
    background-color: var(--color-gothic);
  }

  @include mouse-device {

    &:hover,
    &:focus {
      background-color: var(--color-gothic);

      svg {
        fill: var(--color-white);
      }
    }
  }

  @include touch-device {
    &:active {
      background-color: var(--color-gothic);

      svg {
        fill: var(--color-white);
      }
    }
  }
}
</style>