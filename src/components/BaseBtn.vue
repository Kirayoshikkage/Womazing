<template>
  <button class="button">
    <slot />
  </button>
</template>

<style lang="scss">
@import "../assets/styles/mixins/button-styles";

.button {
  @include button-styles;

  &:disabled {
    pointer-events: none;
    opacity: 0.4;
  }

  &_filled {
    @include touch-device {
      &:active {
        background-color: var(--color-black);
      }
    }
  }

  &_hollow-gothic {
    @include touch-device {
      &:active {
        color: var(--color-white);
        background-color: var(--color-gothic);
      }
    }
  }
}
</style>
