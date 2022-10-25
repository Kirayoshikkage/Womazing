<template>
  <h2 class="title">
    <slot />
  </h2>
</template>

<style lang="scss">
.title {
  margin: 0 0 rem(92);
  font-weight: 500;
  font-size: rem(40);
  line-height: lh(44, 40);
  letter-spacing: 0.02em;

  @include medium {
    margin: 0 0 rem(62);
  }

  @include x-small {
    margin: 0 0 rem(32);
    font-size: rem(24);
  }
}
</style>