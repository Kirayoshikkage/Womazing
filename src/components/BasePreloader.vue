<template>
  <div
    class="preloader"
    :class="hidingClass"
    role="progressbar"
  >
    <div class="preloader__wrapper">
      <div class="preloader__item" />
      <div class="preloader__item" />
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      isShown: false,
    }
  },
  computed: {
    hidingClass() {
      return {
        'preloader_hide': !this.isShown,
      }
    }
  },
  methods: {
    showPreloader() {
      this.isShown = true;
    },
    hidePreloader() {
      this.isShown = false;
    }
  }
}
</script>

<style lang="scss">
.preloader {
  transition-property: opacity, visibility;
  transition-duration: var(--transition-duration);

  &__wrapper {
    position: relative;
    width: rem(80);
    height: rem(80);
  }

  &__item {
    position: absolute;
    border: rem(4) solid var(--color-white);
    border-radius: 50%;
    opacity: 1;
    animation: animation 1s cubic-bezier(0, 0.2, 0.8, 1) infinite;
  }

  &__item:nth-child(2) {
    animation-delay: -0.5s;
  }

  &_hide {
    opacity: 0;
    visibility: hidden;

    .preloader__item {
      animation-play-state: paused;
    }
  }

  @keyframes animation {
    0% {
      left: rem(36);
      top: rem(36);
      width: 0;
      height: 0;
      opacity: 0;
    }

    4.9% {
      left: rem(36);
      top: rem(36);
      width: 0;
      height: 0;
      opacity: 0;
    }

    5% {
      left: rem(36);
      top: rem(36);
      width: 0;
      height: 0;
      opacity: 1;
    }

    100% {
      left: 0;
      top: 0;
      width: rem(72);
      height: rem(72);
      opacity: 0;
    }
  }
}
</style>