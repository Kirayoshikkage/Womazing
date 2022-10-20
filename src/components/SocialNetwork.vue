<template>
  <ul class="social-network">
    <slot />
  </ul>
</template>

<style lang="scss">
.social-network {
  a {
    display: block;
    width: rem(23);
    height: rem(23);
  }

  svg {
    width: 100%;
    height: 100%;
  }
}
</style>