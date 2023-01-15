<template>
  <focus-trap ref="focusTrap" :active="false">
    <header class="header">
      <div class="container">
        <BurgerTrigger id="header-burger-trigger" />
        <BaseLogo />
        <NavigationMenu :list-items="listNavigation" />
        <div class="header__group">
          <MeanOfCommunication href="tel:+74958235412">
            <PhoneIcon class="mean-of-communication__icon" aria-hidden="true" />
            <p class="visually-hidden">Номер телефона:</p>
            <span class="mean-of-communication__communication"
              >+7 (495) 823-54-12
            </span>
          </MeanOfCommunication>
          <ShoppingBasket />
        </div>
      </div>
      <TheBurgerMenu
        v-bind="configuresBurgerMenu()"
        ref="burgerMenu"
        @open="openHandlerBurgerMenu"
        @close="closeHandlerBurgerMenu"
      >
        <NavigationMenu :list-items="listNavigation" />
        <MeanOfCommunication href="tel:+74958235412">
          <PhoneIcon class="mean-of-communication__icon" aria-hidden="true" />
          <p class="visually-hidden">Номер телефона:</p>
          <span class="mean-of-communication__communication"
            >+7 (495) 823-54-12
          </span>
        </MeanOfCommunication>
      </TheBurgerMenu>
    </header>
  </focus-trap>
</template>

<script>
import { FocusTrap } from "focus-trap-vue";

import BaseLogo from "./BaseLogo.vue";
import NavigationMenu from "./NavigationMenu.vue";
import MeanOfCommunication from "./MeanOfCommunication.vue";
import PhoneIcon from "./icons/PhoneIcon.vue";
import ShoppingBasket from "./ShoppingBasket.vue";
import BurgerTrigger from "./BurgerTrigger.vue";
import TheBurgerMenu from "./TheBurgerMenu.vue";
import getFontSizeBody from "../assets/scripts/helpers/getFontSizeBody";

export default {
  components: {
    FocusTrap,
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
        ["Главная", "index.html"],
        ["Каталог", "catalog.html"],
        ["О бренде", "about-brand.html"],
        ["Контакты", "#"],
      ],
    };
  },
  methods: {
    configuresBurgerMenu() {
      return {
        triggerSelector: "#header-burger-trigger",
        breakpoints: {
          // 62rem - 992px
          [getFontSizeBody() * 62]: () => {
            if (this.$refs.burgerMenu.burgerMenuIsOpen()) {
              this.$refs.burgerMenu.close();
            }
          },
        },
      };
    },
    openHandlerBurgerMenu() {
      this.$refs.focusTrap.activate();
    },
    closeHandlerBurgerMenu() {
      this.$refs.focusTrap.deactivate();
    },
  },
};
</script>

<style lang="scss">
.header > .container {
  position: relative;
  z-index: 101;
  display: flex;
  flex-wrap: wrap;
  align-items: center;
  justify-content: space-between;
  padding-top: 1.5rem;
  padding-bottom: 1.5rem;
  gap: 1rem;

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

  .header__group {
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
