<template>
  <ul class="social-network">
    <slot />
  </ul>
</template>

<style lang="scss">
.social-network {
  a {
    display: block;
    outline: none;

    @include mouse-device {
      padding: 0.5rem;
      transition: background var(--transition-duration);

      path {
        transition: fill var(--transition-duration);
      }

      &:hover,
      &:focus {
        background-color: var(--color-gothic);

        path {
          fill: var(--color-white);
        }
      }
    }
  }

  svg {
    display: block;
    width: rem(23);
    height: rem(23);
  }
}
</style>