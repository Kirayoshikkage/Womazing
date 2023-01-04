<template>
  <div class="try-again" :class="hidingClass" role="alert">
    <BaseSubtitle> Произошла ошибка </BaseSubtitle>
    <button
      class="try-again__button"
      @pointerup="attemptHandler"
      @keydown.enter="attemptHandler"
      @keydown.space="attemptHandler"
    >
      <span> Обновить </span>
      <ReloadIcon aria-hidden="true" />
    </button>
  </div>
</template>

<script>
import BaseSubtitle from "./BaseSubtitle";
import ReloadIcon from "./icons/ReloadIcon.vue";

export default {
  components: { BaseSubtitle, ReloadIcon },
  emits: {
    attempt: null,
  },
  data() {
    return {
      isShown: false,
    };
  },
  computed: {
    hidingClass() {
      return {
        hide: !this.isShown,
      };
    },
  },
  methods: {
    showTryAgain() {
      this.isShown = true;
    },
    hideTryAgain() {
      this.isShown = false;
    },
    attemptHandler() {
      this.$emit("attempt");
    },
  },
};
</script>

<style lang="scss">
.try-again {
  transition-property: opacity, visibility;
  transition-duration: var(--transition-duration);

  &.hide {
    opacity: 0;
    visibility: hidden;
  }

  .subtitle {
    margin: 0 0 rem(16);
    color: var(--color-white);

    @include x-small {
      font-size: rem(25);
    }
  }

  &__button {
    display: flex;
    align-items: center;
    margin: 0 auto;
    font-size: rem(20);
    letter-spacing: 0.02em;
    color: var(--color-white);
    gap: 1rem;

    @include mouse-device {
      border-bottom: rem(1) solid transparent;
      padding-bottom: rem(5);
      transition-property: color, border;
      transition-duration: var(--transition-duration);

      .reload-icon {
        transition: fill var(--transition-duration);
      }

      &:focus {
        border-bottom-color: var(--color-ecru);
        color: var(--color-ecru);

        .reload-icon {
          fill: var(--color-ecru);
        }
      }

      &:hover {
        color: var(--color-ecru);

        .reload-icon {
          fill: var(--color-ecru);
        }
      }
    }

    @include touch-device {
      padding: rem(10);
      transition-property: color, background;
      transition-duration: var(--transition-duration);

      .reload-icon {
        transition: fill var(--transition-duration);
      }

      &:active {
        color: var(--color-gothic);
        background-color: var(--color-ecru);

        .reload-icon {
          fill: var(--color-gothic);
        }
      }
    }
  }
}
</style>
