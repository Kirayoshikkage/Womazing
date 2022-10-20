<template>
  <header class="header">
    <div class="container">
      <BaseLogo />
      <NavigationMenu :list-items="listNavigation" />
      <div class="header__group">
        <MeanOfCommunication href="tel:+74958235412">
          <PhoneIcon aria-hidden="true" />
          <p class="visually-hidden">
            Номер телефона:
          </p>
          <span>+7 (495) 823-54-12</span>
        </MeanOfCommunication>
        <ShoppingBasket />
      </div>
    </div>
  </header>
</template>

<script>
import BaseLogo from './BaseLogo.vue';
import NavigationMenu from './NavigationMenu.vue';
import MeanOfCommunication from './MeanOfCommunication.vue';
import PhoneIcon from './icons/PhoneIcon.vue';
import ShoppingBasket from './ShoppingBasket.vue';

export default {
  components: {
    BaseLogo,
    NavigationMenu,
    MeanOfCommunication,
    PhoneIcon,
    ShoppingBasket
  },
  data() {
    return {
      listNavigation: [
        ['Главная', '#'],
        ["Магазин", '#'],
        ["О бренде", '#'],
        ["Контакты", '#'],
      ],
    }
  }
}
</script>

<style lang="scss">
.header {
  padding: 1.5rem 0;

  .container {
    display: flex;
    flex-wrap: wrap;
    align-items: center;
    justify-content: space-between;
    gap: 1rem;
  }

  .logo {
    transform: translateX(-1rem);
  }

  .navigation-menu {
    &__list {
      display: grid;
      grid-template-columns: repeat(4, 1fr);
      gap: 1rem rem(45);
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
  }

  .shopping-basket {
    transform: translateX(0.5rem);
  }
}
</style>
