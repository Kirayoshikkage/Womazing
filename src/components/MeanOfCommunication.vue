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
  font-size: rem(15);
  line-height: lh(21, 15);
  letter-spacing: 0.02em;
  color: var(--color-black);

  @include mouse-device {
    border-bottom: rem(1) solid transparent;
    padding-bottom: rem(5);
    transition: border-color var(--transition-duration);

    &__icon {
      transition: fill var(--transition-duration);
    }

    &__communication {
      transition: color var(--transition-duration);
    }

    &:focus {
      border-bottom-color: var(--color-gothic);

      .mean-of-communication__icon {
        fill: var(--color-gothic);
      }

      .mean-of-communication__communication {
        color: var(--color-gothic);
      }
    }

    &:hover {
      .mean-of-communication__icon {
        fill: var(--color-gothic);
      }

      .mean-of-communication__communication {
        color: var(--color-gothic);
      }
    }
  }
}
</style>