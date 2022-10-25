<template>
  <header class="header">
    <div class="container">
      <BurgerTrigger id="header-burger-trigger" />
      <BaseLogo />
      <NavigationMenu
        :list-items="listNavigation"
      />
      <div class="header__group">
        <MeanOfCommunication href="tel:+74958235412">
          <PhoneIcon
            class="mean-of-communication__icon"
            aria-hidden="true"
          />
          <p class="visually-hidden">
            Номер телефона:
          </p>
          <span class="mean-of-communication__communication">+7 (495) 823-54-12 </span>
        </MeanOfCommunication>
        <ShoppingBasket />
      </div>
    </div>
  </header>
  <TheBurgerMenu
    v-bind="configuresBurgerMenu()"
    ref="burgerMenu"
  >
    <NavigationMenu
      :list-items="listNavigation"
    />
    <MeanOfCommunication href="tel:+74958235412">
      <PhoneIcon
        class="mean-of-communication__icon"
        aria-hidden="true"
      />
      <p class="visually-hidden">
        Номер телефона:
      </p>
      <span class="mean-of-communication__communication">+7 (495) 823-54-12 </span>
    </MeanOfCommunication> 
  </TheBurgerMenu>
</template>

<script>
import BaseLogo from './BaseLogo.vue';
import NavigationMenu from './NavigationMenu.vue';
import MeanOfCommunication from './MeanOfCommunication.vue';
import PhoneIcon from './icons/PhoneIcon.vue';
import ShoppingBasket from './ShoppingBasket.vue';
import BurgerTrigger from './BurgerTrigger.vue'
import TheBurgerMenu from './TheBurgerMenu.vue';
import FocusLock from '../assets/scripts/components/FocusLock';
import getFontSizeBody from '../assets/scripts/helpers/getFontSizeBody';

export default {
  components: {
    BaseLogo,
    NavigationMenu,
    MeanOfCommunication,
    PhoneIcon,
    ShoppingBasket,
    BurgerTrigger,
    TheBurgerMenu,
  },
  data() {
    return {
      listNavigation: [
        ['Главная', '#'],
        ['Магазин', '#'],
        ['О бренде', '#'],
        ['Контакты', '#'],
      ],
    }
  },
  methods: {
    configuresBurgerMenu() {
      const focusLock = new FocusLock({
        exception: ['.header .burger-trigger', '.burger-menu'],
        mutationObserver: true,
        disableOnMobileDevice: true
      });

      focusLock.init();

      return {
        triggerSelector: '#header-burger-trigger',
        breakpoints: {
          // 62rem - 992px
          [getFontSizeBody() * 62]: () => {
            if (this.$refs.burgerMenu.burgerMenuIsOpen()) {
              this.$refs.burgerMenu.close();
            }
          },
        },
        focusLock
      }
    }
  }
}
</script>

<style lang="scss">
.header {
  position: relative;
  z-index: 101;
  padding: 1.5rem 0;

  .container {
    display: flex;
    flex-wrap: wrap;
    align-items: center;
    justify-content: space-between;
    gap: 1rem;
  }

  .burger-trigger {
    display: none;

    @include medium {
      display: grid;
    }

    @include mouse-device {
      transform: translateX(-0.5rem);
    }
  }

  .logo {
    @include mouse-device {
      transform: translateX(-1rem);

      @include medium {
        transform: none;
      }
    }
  }

  .navigation-menu {
    &__list {
      display: grid;
      grid-template-columns: repeat(4, 1fr);
      gap: 1rem rem(45);
    }

    @include medium {
      display: none;
    }
  }

  &__group {
    display: flex;
    align-items: center;
    gap: rem(32);
  }

  .mean-of-communication {
    display: flex;
    align-items: center;
    gap: 0.5rem;

    @include medium {
      display: none;
    }
  }

  .shopping-basket {
    @include mouse-device {
      transform: translateX(0.5rem);
    }
  }
}
</style>
