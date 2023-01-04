<template>
  <a class="link">
    <slot />
  </a>
</template>

<style lang="scss">
@import "../assets/styles/mixins/button-styles";

.link {
  @include button-styles;
}
</style>
