<template>
  <a
    :href="href"
    class="mean-of-communication"
  >
    <slot />
  </a>
</template>

<script>
export default {
  props: {
    href: {
      type: String,
      default: '#',
    }
  }
}
</script>

<style lang="scss">
.mean-of-communication {
  outline: none;
  border-bottom: rem(1) solid transparent;
  padding-bottom: rem(5);
  font-size: rem(15);
  line-height: lh(21, 15);
  letter-spacing: 0.02em;
  color: var(--color-black);
  transition-property: color, border-color;
  transition-duration: var(--transition-duration);

  * {
    transition: color var(--transition-duration);
  }

  svg {
    transition: fill var(--transition-duration);
  }

  @include mouse-device {
    &:focus {
      border-bottom-color: var(--color-gothic);
      color: var(--color-gothic);

      svg {
        fill: var(--color-gothic);
      }
    }

    &:hover {
      color: var(--color-gothic);

      svg {
        fill: var(--color-gothic);
      }
    }
  }

  @include touch-device {
    &:active {
      color: var(--color-gothic);

      svg {
        fill: var(--color-gothic);
      }
    }
  }
}
</style>