<template>
  <h1 class="lead">
    <slot />
  </h1>
</template>

<style lang="scss">
.lead {
  margin: 0;
  font-weight: 500;
  font-size: rem(55);
  line-height: lh(61, 55);
  letter-spacing: 0.02em;
  text-align: left;
  color: var(--color-black);
}
</style>
