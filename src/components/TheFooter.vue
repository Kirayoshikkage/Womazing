<template>
  <footer class="footer">
    <div class="container">
      <div class="footer__item">
        <BaseLogo />
        <CategoryList :category-list="categoryList" />
      </div>
      <div class="footer__item">
        <ul class="footer__communications">
          <li>
            <MeanOfCommunication href="tel:+74958235412">
              <PhoneIcon
                class="mean-of-communication__icon"
                aria-hidden="true"
              />
              <p class="visually-hidden">Номер телефона:</p>
              <span class="mean-of-communication__communication"
                >+7 (495) 823-54-12
              </span>
            </MeanOfCommunication>
          </li>
          <li>
            <MeanOfCommunication href="mailto:hello@womazing.com">
              <EmailIcon
                class="mean-of-communication__icon"
                aria-hidden="true"
              />
              <p class="visually-hidden">Почта:</p>
              <span class="mean-of-communication__communication"
                >hello@womazing.com</span
              >
            </MeanOfCommunication>
          </li>
        </ul>
        <SocialNetwork>
          <li>
            <a href="#" target="_blank">
              <InstagramIcon aria-label="Наша страничка в Инстаграме" />
            </a>
          </li>
          <li>
            <a href="#" target="_blank">
              <TwitterIcon aria-label="Наша страничка в Твиттере" />
            </a>
          </li>
          <li>
            <a href="#" target="_blank">
              <FacebookIcon aria-label="Наша страничка в Фейсбуке" />
            </a>
          </li>
        </SocialNetwork>
        <ul class="footer__documents">
          <li>
            <a href="#" class="footer__document">&copy; Все права защищены</a>
          </li>
          <li>
            <a href="#" class="footer__document">Политика конфиденциальности</a>
          </li>
          <li>
            <a href="#" class="footer__document">Публичная оферта</a>
          </li>
        </ul>
      </div>
    </div>
  </footer>
</template>

<script>
import BaseLogo from "./BaseLogo.vue";
import CategoryList from "./CategoryList.vue";
import MeanOfCommunication from "./MeanOfCommunication.vue";
import SocialNetwork from "./SocialNetwork.vue";
import FacebookIcon from "./icons/FacebookIcon.vue";
import InstagramIcon from "./icons/InstagramIcon.vue";
import TwitterIcon from "./icons/TwitterIcon.vue";
import PhoneIcon from "./icons/PhoneIcon.vue";
import EmailIcon from "./icons/EmailIcon.vue";

export default {
  components: {
    BaseLogo,
    CategoryList,
    MeanOfCommunication,
    SocialNetwork,
    FacebookIcon,
    InstagramIcon,
    TwitterIcon,
    PhoneIcon,
    EmailIcon,
  },
  data() {
    return {
      categoryList: [
        ["Пальто", "#"],
        ["Свитшоты", "#"],
        ["Кардиганы", "#"],
        ["Толстовки", "#"],
      ],
    };
  },
};
</script>

<style lang="scss">
@import "../assets/styles/mixins/text-animation";

.footer {
  padding: rem(100) 0;
  background-color: var(--color-ecru);

  &__item {
    display: flex;
    flex-wrap: wrap;
    align-items: center;
    justify-content: space-between;
    gap: rem(30);

    &:not(:last-child) {
      margin: 0 0 rem(30);
    }

    @include small {
      &:first-child {
        justify-content: center;
      }
    }

    @include x-small {
      flex-direction: column;
      justify-content: center;
    }
  }

  .logo {
    @include mouse-device {
      transform: translateX(-1rem);

      @include small {
        transform: none;
      }
    }
  }

  .category-list {
    display: grid;
    grid-template-columns: repeat(4, auto);
    gap: 1rem rem(45);

    @include x-small {
      display: flex;
      flex-wrap: wrap;
      justify-content: space-between;
    }
  }

  &__communications {
    display: flex;
    flex-direction: column;
    gap: 0.5rem;
  }

  .mean-of-communication {
    display: flex;
    align-items: center;
    gap: 0.5rem;

    &__icon {
      flex-shrink: 0;
    }

    @include x-small {
      justify-content: center;
    }
  }

  .social-network {
    display: flex;
    flex-wrap: wrap;

    @include small {
      flex-direction: column;
    }

    @include x-small {
      flex-direction: row;
    }

    @include touch-device {
      gap: rem(12);
    }
  }

  &__documents {
    display: flex;
    flex-direction: column;
    text-align: end;
    gap: rem(6);

    @include x-small {
      text-align: center;
    }
  }

  &__document {
    @include text-animation;

    outline: none;
    font-size: rem(13);
    line-height: lh(18, 13);
    letter-spacing: 0.02em;
    color: var(--color-black);
  }

  @include small {
    padding: rem(50) 0;
  }
}
</style>
