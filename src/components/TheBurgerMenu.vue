<template>
  <div
    class="burger-menu"
    :style="visibilityStyles"
    :class="activityClass"
    @pointerup="close"
  >
    <div
      class="burger-menu__body"
      @pointerup.stop
    >
      <div class="container burger-menu__content">
        <slot />
      </div>
    </div>
  </div>
</template>

<script>
import debounce from '../assets/scripts/helpers/debounce';

export default {
  props: {
    triggerSelector: {
      type: String,
      default: null,
      required: true,
    },
    breakpoints: {
      type: Object,
      default() {
        return {};
      },
    }
  },
  emits: {
    open:null,
    close: null,
  },
  data() {
    return {
      isOpen: null,
      currentBreakpoint: null,
    }
  },
  computed: {
    visibilityStyles() {
      return this.isOpen ?
        {
          visibility: 'visible',
          opacity: 1,
        }
        :
        {
          visibility: 'hidden',
          opacity: 0
        }
    },
    activityClass() {
      return this.isOpen ? 'active' : ''
    },
    trigger() {
      return document.querySelector(this.triggerSelector);
    }
  },
  watch: {
    isOpen() {
      this.switchesBlockScroll();

      this.switchesClassActivityTrigger();

      this.changesTextForA11yAtTrigger();

      this.switchesAriaExpandedAtTrigger();
    },
    currentBreakpoint() {
      this.callsFunctionsBreakpoint();
    }
  },
  mounted() {
    this.addsEventListenersTrigger();

    this.initBreakpointUpdate();

    this.isOpen = false;
  },
  beforeUnmount() {
    this.trigger.removeEventListener('pointerup', this.toggle);

    this.trigger.removeEventListener('keydown', this.keydownEventHandlerOnTrigger);

    window.removeEventListener('resize', this.wrapperForUpdatingBreakpoints);
  },
  methods: {
    switchesBlockScroll() {
      const { body } = document;

      if (this.isOpen) {
        body.classList.add('overflow-hidden');

        return;
      }

      body.classList.remove('overflow-hidden');
    },
    switchesClassActivityTrigger() {
      if (this.isOpen) {
        this.trigger.classList.add('active');

        return;
      }

      this.trigger.classList.remove('active');
    },
    changesTextForA11yAtTrigger() {
      if (this.isOpen) {
        this.trigger.setAttribute('aria-label', 'Закрыть бургер меню')

        return;
      }

      this.trigger.setAttribute('aria-label', 'Открыть бургер меню')
    },
    switchesAriaExpandedAtTrigger() {
      if (this.isOpen) {
        this.trigger.setAttribute('aria-expanded', true);

        return;
      }

      this.trigger.setAttribute('aria-expanded', false);
    },
    callsFunctionsBreakpoint() {
      const functionsBreakpoint = this.breakpoints[this.currentBreakpoint];

      if (!functionsBreakpoint) return;

      if (typeof functionsBreakpoint === 'function') {
        functionsBreakpoint();

        return;
      }

      functionsBreakpoint?.forEach((func) => {
        func();
      });
    },
    addsEventListenersTrigger() {
      this.trigger.addEventListener('pointerup', this.toggle);

      this.trigger.addEventListener('keydown', this.keydownEventHandlerOnTrigger);
    },
    toggle() {
      if (!this.isOpen) {
        this.open();

        return;
      }

      this.close();
    },
    open() {
      this.isOpen = true;

      this.addsPaddingInsteadOfScroll(document.body);

      this.$emit('open');
    },
    addsPaddingInsteadOfScroll(element) {
      const padding = `${window.innerWidth - document.body.offsetWidth}px`;

      element.style.paddingRight = padding;
    },
    close() {
      this.isOpen = false;

      this.removesScrollPadding(document.body);

      this.$emit('close');
    },
    removesScrollPadding(element) {
      element.style.paddingRight = 0;
    },
    keydownEventHandlerOnTrigger(e) {
      if (e.code !== 'Enter') return;

      this.toggle();
    },
    initBreakpointUpdate() {
      if (!this.breakpoints) return;

      this.updatesBreakpoint();

      window.addEventListener('resize', this.wrapperForUpdatingBreakpoints);
    },
    wrapperForUpdatingBreakpoints: debounce(function () {
      this.updatesBreakpoint();
    }, 400),
    updatesBreakpoint() {
      const breakpoint = this.getCurrentBreakpoint();

      if (this.currentBreakpoint == breakpoint) return;

      this.currentBreakpoint = breakpoint;
    },
    getCurrentBreakpoint() {
      const width = window.innerWidth;

      return Object.keys(this.breakpoints).reduce((acc, breakpoint) => {
        if (width >= breakpoint) {
          // eslint-disable-next-line no-param-reassign
          acc = breakpoint;
        }

        return acc;
      }, 0);
    },
    burgerMenuIsOpen() {
      return this.isOpen;
    }
  }
}
</script>

<style lang="scss">
.burger-menu {
  position: fixed;
  left: 0;
  right: 0;
  top: 0;
  bottom: 0;
  z-index: 100;
  width: 100%;
  height: 100%;
  transition-property: visibility, opacity, background;
  transition-duration: var(--transition-duration);

  &__body {
    display: flex;
    flex-direction: column;
    padding: rem(100) 0 3rem;
    max-height: 100%;
    background-color: var(--color-white);
    opacity: 0;
    transform: translateY(-10%);
    transition-property: opacity, transform;
    transition-duration: var(--transition-duration);
  }

  &__content {
    overflow: auto;
    width: 100%;
    text-align: end;

    @include x-small {
      text-align: center;
    }
  }

  .navigation-menu {
    margin: 0 0 3rem;

    &__list {
      display: flex;
      flex-wrap: wrap;
      justify-content: space-between;
      gap: 1rem rem(45);

      @include x-small {
        flex-direction: column;
        align-items: center;
      }
    }
  }

  .mean-of-communication {
    display: inline-flex;
    align-items: center;
    gap: 0.5rem;
  }

  &.active {
    background-color: rgba(30, 33, 44, 50%);

    .burger-menu__body {
      opacity: 1;
      transform: translate(0);
    }
  }

  @media (orientation: landscape) and (max-width: rem(575.98)) {
    .navigation-menu__list {
      flex-direction: row;
    }

    .mean-of-communication {
      justify-content: flex-end;
    }
  }

  @media (orientation: landscape) and (max-width: rem(991.98)) and (max-height: rem(350)) {
    &__body {
      height: 100%;
    }
  }
}
</style>