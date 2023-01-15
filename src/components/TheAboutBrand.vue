<template>
  <section class="about-brand">
    <div class="container">
      <ul class="about-brand__list">
        <li class="about-brand__item">
          <picture class="about-brand__img">
            <source
              media="(min-width: 2048px)"
              type="image/webp"
              srcset="
                ../assets/img/about-brand-idea-desctop@1.5x.webp,
                ../assets/img/about-brand-idea-desctop@2x.webp   2x,
                ../assets/img/about-brand-idea-desctop@3x.webp   3x
              "
            />
            <source
              media="(max-width:2047.98px) and (min-width: 768px)"
              type="image/webp"
              srcset="
                ../assets/img/about-brand-idea-desctop@1x.webp,
                ../assets/img/about-brand-idea-desctop@2x.webp 2x,
                ../assets/img/about-brand-idea-desctop@3x.webp 3x
              "
            />
            <source
              media="(max-width: 767.98px) and (min-width: 0)"
              type="image/webp"
              srcset="
                ../assets/img/about-brand-idea-mobile@1x.webp 1x,
                ../assets/img/about-brand-idea-mobile@2x.webp 2x,
                ../assets/img/about-brand-idea-mobile@3x.webp 3x
              "
            />
            <img
              src="../assets/img/about-brand-idea-desctop@1x.webp"
              alt=""
              aria-hidden="true"
              width="442"
              height="547"
            />
          </picture>
          <div class="about-brand__content">
            <BaseTitle> Идея и женщина </BaseTitle>
            <p class="about-brand__text">
              Womazing была основана в 2010-ом и стала одной из самых успешных
              компаний нашей страны. Как и многие итальянские фирмы, Womazing
              остаётся семейной компанией, хотя ни один из членов семьи не
              является модельером.
            </p>
            <p class="about-brand__text">
              Мы действуем по успешной формуле, прибегая к услугам известных
              модельеров для создания своих коллекций. Этот метод был описан
              критиком моды Колином Макдауэллом как форма дизайнерского
              со-творчества, характерная для ряда итальянских prêt-a-porter
              компаний.
            </p>
          </div>
        </li>
        <li class="about-brand__item">
          <picture class="about-brand__img">
            <source
              media="(min-width: 2048px)"
              type="image/webp"
              srcset="
                ../assets/img/about-brand-magic-desctop@1.5x.webp,
                ../assets/img/about-brand-magic-desctop@2x.webp   2x,
                ../assets/img/about-brand-magic-desctop@3x.webp   3x
              "
            />
            <source
              media="(max-width:2047.98px) and (min-width: 768px)"
              type="image/webp"
              srcset="
                ../assets/img/about-brand-magic-desctop@1x.webp,
                ../assets/img/about-brand-magic-desctop@2x.webp 2x,
                ../assets/img/about-brand-magic-desctop@3x.webp 3x
              "
            />
            <source
              media="(max-width: 767.98px) and (min-width: 0)"
              type="image/webp"
              srcset="
                ../assets/img/about-brand-magic-mobile@1x.webp 1x,
                ../assets/img/about-brand-magic-mobile@2x.webp 2x,
                ../assets/img/about-brand-magic-mobile@3x.webp 3x
              "
            />
            <img
              src="../assets/img/about-brand-magic-desctop@1x.webp"
              alt=""
              aria-hidden="true"
              width="442"
              height="547"
            />
          </picture>
          <div class="about-brand__content">
            <BaseTitle> Магия в деталях </BaseTitle>
            <p class="about-brand__text">
              Первый магазин Womazing был открыт в маленьком городке на севере
              страны в 2010-ом году. Первая коллекция состояла из двух пальто и
              костюма, которые были копиями парижских моделей.
            </p>
            <p class="about-brand__text">
              Несмотря на то, что по образованию основательница была адвокатом,
              ее семья всегда была тесно связана с шитьём (прабабушка
              основательницы шила одежду для женщин, а мать основала
              профессиональную школу кроя и шитья). Стремление производить
              одежду для масс несло в себе большие перспективы, особенно в то
              время, когда высокая мода по-прежнему доминировала, а рынка
              качественного prêt-a-porter попросту не существовало.
            </p>
          </div>
        </li>
      </ul>
      <BaseLink class="link_filled" href="catalog.html">
        Перейти в каталог
      </BaseLink>
    </div>
  </section>
</template>

<script>
import BaseTitle from "./BaseTitle.vue";
import BaseLink from "./BaseLink.vue";

export default {
  components: {
    BaseTitle,
    BaseLink,
  },
};
</script>

<style lang="scss">
.about-brand {
  padding: rem(130) 0;

  &__list {
    margin: 0 0 rem(130);

    @include small {
      margin: 0 0 rem(65);
    }
  }

  &__item {
    display: flex;
    gap: rem(94);

    &:not(:last-child) {
      margin: 0 0 rem(130);

      @include small {
        margin: 0 0 rem(65);
      }
    }

    @media (min-width: rem(768)) {
      &:nth-child(even) {
        flex-direction: row-reverse;
      }
    }

    @include medium {
      gap: rem(48);
    }

    @include small {
      flex-direction: column;
    }
  }

  &__img {
    img {
      width: 100%;
      height: 100%;

      @include small {
        min-height: rem(320);
      }
    }

    @media (min-width: rem(768)) {
      flex: 1 1 calc(44% - rem(94));
    }
  }

  &__content {
    display: flex;
    flex-direction: column;
    justify-content: center;

    .about-brand__text:not(:last-child) {
      margin: 0 0 1rem;
    }

    @media (min-width: rem(768)) {
      flex: 1 1 calc(56% - rem(94));
      padding: rem(48) 0;
    }
  }

  .title {
    margin: 0 0 rem(46);

    @include small {
      margin: 0 0 rem(24);
    }
  }

  &__text {
    margin: 0;
    font-size: rem(17);
    font-weight: 500;
    line-height: lh(24, 17);
    letter-spacing: 0.02em;
    color: var(--color-black);

    @include x-small {
      font-size: rem(14);
    }
  }

  .link {
    display: block;
    margin: 0 auto;
    width: max-content;
  }

  @include small {
    padding: rem(65) 0;
  }
}
</style>
