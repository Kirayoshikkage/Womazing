<template>
  <button class="button">
    <slot />
  </button>
</template>

<style lang="scss">
@import '../assets/styles/mixins/button-styles';

.button {
  @include button-styles;
}
</style>