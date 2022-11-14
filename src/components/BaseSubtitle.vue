<template>
  <h3 class="subtitle">
    <slot />
  </h3>
</template>

<style lang="scss">
.subtitle {
  margin: 0;
  font-weight: 500;
  font-size: rem(25);
  line-height: lh(35, 25);
  letter-spacing: 0.02em;

  @include x-small {
    font-size: rem(18);
  }
}
</style>
