<template>
  <div
    class="try-again"
    :class="hidingClass"
    role="alert"
  >
    <BaseSubtitle>
      Произошла ошибка
    </BaseSubtitle>
    <button
      ref="button"
      class="try-again__button"
    >
      <span>
        Обновить
      </span>
      <ReloadIcon />
    </button>
  </div>
</template>

<script>
import BaseSubtitle from './BaseSubtitle';
import ReloadIcon from './icons/ReloadIcon.vue';

export default {
  components: { BaseSubtitle, ReloadIcon },
  props: {
    // eslint-disable-next-line vue/require-default-prop
    callback: Function,
  },
  emits: {
    'successful': null,
    'unsuccessful': null,
    'before-attempt': null,
    'after-attempt': null
  },
  data() {
    return {
      isShown: false,
    }
  },
  computed: {
    hidingClass() {
      return {
        'try-again_hide': !this.isShown,
      }
    }
  },
  mounted() {
    this.setsEventHandlersOnButton();
  },
  beforeUnmount() {
    this.removesEventHandlersOnButton();
  },
  methods: {
    showTryAgain() {
      this.isShown = true;
    },
    hideTryAgain() {
      this.isShown = false;
    },
    setsEventHandlersOnButton() {
      const { button } = this.$refs;

      button.addEventListener('pointerup', this.tryAgain);

      button.addEventListener('keydown', this.handlerKeydownOnButton);
    },
    handlerKeydownOnButton({ code }) {
      if (code !== 'Enter') return;

      this.tryAgain();
    },
    removesEventHandlersOnButton() {
      const { button } = this.$refs;

      button.removeEventListener('pointerup', this.tryAgain);

      button.removeEventListener('keydown', this.handlerKeydownOnButton);
    },
    tryAgain() {
      this.$emit('before-attempt')

      this.callback()
        .then((data) => {
          this.$emit('successful', data)
        })
        .catch((err) => {
          this.$emit('unsuccessful', err)
        })
        .finally(() => {
          this.$emit('after-attempt')
        })
    }
  }
}
</script>

<style lang="scss">
.try-again {
  transition-property: opacity, visibility;
  transition-duration: var(--transition-duration);

  &_hide {
    opacity: 0;
    visibility: hidden;
  }

  .subtitle {
    margin: 0 0 rem(24);
    color: var(--color-white);
  }

  &__button {
    display: flex;
    align-items: center;
    font-size: rem(20);
    letter-spacing: 0.02em;
    color: var(--color-white);
    gap: 1rem;

    @include x-small {
      font-size: 1rem;
    }

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