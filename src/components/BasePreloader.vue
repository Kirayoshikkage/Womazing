<template>
  <div class="preloader" :class="hidingClass" role="alert">
    <h3 class="visually-hidden">Загрузка</h3>
    <div class="preloader__wrapper" aria-hidden="true">
      <div class="preloader__item" />
      <div class="preloader__item" />
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      isShown: true,
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
    showPreloader() {
      this.isShown = true;
    },
    hidePreloader() {
      this.isShown = false;
    },
  },
};
</script>

<style lang="scss">
.preloader {
  --size: 1;

  transition-property: opacity, visibility;
  transition-duration: var(--transition-duration);

  &.hide {
    opacity: 0;
    visibility: hidden;

    .preloader__item {
      animation-play-state: paused;
    }
  }

  &__wrapper {
    position: relative;
    width: calc(rem(80) * var(--size));
    height: calc(rem(80) * var(--size));
  }

  &__item {
    position: absolute;
    border: calc(rem(4) * var(--size)) solid var(--color-white);
    border-radius: 50%;
    opacity: 1;
    animation: animation 1s cubic-bezier(0, 0.2, 0.8, 1) infinite;
  }

  &__item:nth-child(2) {
    animation-delay: -0.5s;
  }

  @keyframes animation {
    0% {
      left: calc(rem(36) * var(--size));
      top: calc(rem(36) * var(--size));
      width: 0;
      height: 0;
      opacity: 0;
    }

    4.9% {
      left: calc(rem(36) * var(--size));
      top: calc(rem(36) * var(--size));
      width: 0;
      height: 0;
      opacity: 0;
    }

    5% {
      left: calc(rem(36) * var(--size));
      top: calc(rem(36) * var(--size));
      width: 0;
      height: 0;
      opacity: 1;
    }

    100% {
      left: 0;
      top: 0;
      width: calc(rem(72) * var(--size));
      height: calc(rem(72) * var(--size));
      opacity: 0;
    }
  }
}
</style>
