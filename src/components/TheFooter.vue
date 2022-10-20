<template>
  <footer class="footer">
    <div class="container">
      <div class="footer__item footer__item_mgb">
        <BaseLogo />
        <NavigationMenu :list-items="listNavigation" />
        <ul class="footer__communications">
          <li>
            <MeanOfCommunication href="tel:+74958235412">
              <p class="visually-hidden">
                Номер телефона:
              </p>
              +7 (495) 823-54-12
            </MeanOfCommunication>
          </li>
          <li>
            <MeanOfCommunication href="mailto:hello@womazing.com">
              <p class="visually-hidden">
                Почта:
              </p>
              hello@womazing.com
            </MeanOfCommunication>
          </li>
        </ul>
      </div>
      <div class="footer__item">
        <ul class="footer__documents">
          <li>
            <a
              href="#"
              class="footer__document"
            >&copy; Все права защищены</a>
          </li>
          <li>
            <a
              href="#"
              class="footer__document"
            >Политика конфиденциальности</a>
          </li>
          <li>
            <a
              href="#"
              class="footer__document"
            >Публичная оферта</a>
          </li>
        </ul>
        <ul class="footer__categories">
          <li>
            <a
              href="#"
              class="footer__category"
            >
              Пальто
            </a>
          </li>
          <li>
            <a
              href="#"
              class="footer__category"
            >
              Свитшоты
            </a>
          </li>
          <li>
            <a
              href="#"
              class="footer__category"
            >
              Кардиганы
            </a>
          </li>
          <li>
            <a
              href="#"
              class="footer__category"
            >
              Толстовки
            </a>
          </li>
        </ul>
        <SocialNetwork>
          <li>
            <a
              href="#"
              target="_blank"
            >
              <InstagramIcon aria-label="Наша страничка в Инстаграме" />
            </a>
          </li>
          <li>
            <a
              href="#"
              target="_blank"
            >
              <TwitterIcon aria-label="Наша страничка в Твиттере" />
            </a>
          </li>
          <li>
            <a
              href="#"
              target="_blank"
            >
              <FacebookIcon aria-label="Наша страничка в Фейсбуке" />
            </a>
          </li>
        </SocialNetwork>
      </div>
    </div>
  </footer>  
</template>

<script>
import BaseLogo from './BaseLogo.vue';
import NavigationMenu from './NavigationMenu.vue';
import MeanOfCommunication from './MeanOfCommunication.vue';
import SocialNetwork from './SocialNetwork.vue'
import FacebookIcon from './icons/FacebookIcon.vue'
import InstagramIcon from './icons/InstagramIcon.vue'
import TwitterIcon from './icons/TwitterIcon.vue'

export default {
  components: {
    BaseLogo,
    NavigationMenu,
    MeanOfCommunication,
    SocialNetwork,
    FacebookIcon,
    InstagramIcon,
    TwitterIcon
  },
  data() {
    return {
      listNavigation: [
        ['Главная', '#'],
        ["Магазин", '#'],
        ["О бренде", '#'],
        ["Контакты", '#'],
      ]
    }
  }
}
</script>

<style lang="scss">
.footer {
  padding: rem(100) 0;
  background-color: var(--color-ecru);

  &__item {
    display: flex;
    align-items: center;
    justify-content: space-between;

    &_mgb {
      margin: 0 0 rem(30);
    }
  }

  .logo {
    &__icon {
      width: rem(139);
      height: rem(25);
    }
  }

  .navigation-menu {
    &__list {
      display: grid;
      grid-template-columns: repeat(4, 1fr);
      gap: 1rem rem(45);
    }
  }

  &__communications {
    display: flex;
    flex-direction: column;
    text-align: end;
    gap: 0.5rem;
  }

  .social-network {
    display: flex;
    gap: rem(12);
  }

  &__documents,
  &__categories {
    display: flex;
    flex-direction: column;
    gap: rem(6);
  }

  &__document,
  &__category {
    font-size: rem(13);
    line-height: lh(18, 13);
    letter-spacing: 0.02em;
    color: var(--color-black);
  }
}
</style>