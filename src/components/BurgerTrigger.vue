<template>
  <button class="burger-trigger" type="button">
    <span class="burger-trigger__item" />
    <span class="burger-trigger__item" />
    <span class="burger-trigger__item" />
  </button>
</template>

<style lang="scss">
.burger-trigger {
  display: grid;
  grid-template-columns: 1fr;
  transition: background var(--transition-duration);
  gap: rem(7.5);

  &__item {
    border-radius: rem(4);
    width: rem(24);
    height: rem(3);
    background-color: var(--color-black);
    transition-property: transform, opacity, visibility, background;
    transition-duration: var(--transition-duration);
  }

  &.active {
    .burger-trigger__item {
      &:nth-child(1) {
        transform: rotate(45deg) translate(rem(8), rem(8));
      }

      &:nth-child(2) {
        opacity: 0;
        visibility: hidden;
        transform: translateX(-100%);
      }

      &:nth-child(3) {
        transform: rotate(-45deg) translate(rem(7), rem(-7));
      }
    }
  }

  @include mouse-device {
    padding: 0.5rem;

    &:hover,
    &:focus {
      background-color: var(--color-gothic);

      .burger-trigger__item {
        background-color: var(--color-white);
      }
    }
  }

  @include touch-device {
    &:active {
      .burger-trigger__item {
        background-color: var(--color-gothic);
      }
    }
  }
}
</style>
