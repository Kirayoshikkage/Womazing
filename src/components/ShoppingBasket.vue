<template>
  <a
    href="#"
    class="shopping-basket"
  >
    <BasketIcon
      class="shopping-basket__icon"
      aria-label="Корзина товаров"
    />
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

  &__amount {
    position: absolute;
    left: rem(-11);
    top: rem(-11);
    display: block;
    overflow: auto;
    border-radius: 10%;
    padding: rem(2.5) rem(5);
    max-width: 100%;
    font-family: 'Arial', 'Helvetica', sans-serif;
    font-size: rem(9);
    color: var(--color-white);
    background-color: var(--color-gothic);
  }

  @include mouse-device {
    padding: 0.5rem;
    transition: background var(--transition-duration);

    &__icon {
      transition: fill var(--transition-duration);
    }

    &__amount {
      left: rem(-3);
      top: rem(-3);
    }

    &:hover,
    &:focus {
      background-color: var(--color-gothic);

      .shopping-basket__icon {
        fill: var(--color-white);
      }
    }
  }
}
</style>