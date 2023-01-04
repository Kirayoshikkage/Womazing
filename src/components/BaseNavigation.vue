<template>
  <button class="navigation">
    <ArrowIcon aria-hidden="true" />
  </button>
</template>

<script>
import ArrowIcon from "./icons/ArrowIcon.vue";

export default {
  components: { ArrowIcon },
};
</script>

<style lang="scss">
.navigation {
  width: rem(50) !important;
  height: rem(50) !important;

  &_prev {
    transform: rotate(180deg);
  }

  &::after {
    display: none;
  }

  &_fill {
    border-radius: 100%;
    background-color: var(--color-gothic);
    transition: background var(--transition-duration);

    .arrow-icon {
      stroke: var(--color-white);
    }

    @include mouse-device {
      &:hover,
      &:focus {
        background-color: var(--color-black);
      }
    }

    @include touch-device {
      &:active {
        background-color: var(--color-black);
      }
    }
  }

  &_hollow {
    border: rem(1) dotted transparent;
    transition: border var(--transition-duration);

    .arrow-icon {
      stroke: var(--color-black);
      transition: stroke var(--transition-duration);
    }

    @include mouse-device {
      &:focus {
        border-color: var(--color-black);
      }

      &:hover {
        .arrow-icon {
          stroke: var(--color-gothic);
        }
      }
    }

    @include touch-device {
      &:active {
        .arrow-icon {
          stroke: var(--color-gothic);
        }
      }
    }
  }
}
</style>
