<template>
  <section class="important-to-us">
    <div class="container">
      <BaseTitle>
        Что для нас важно
      </BaseTitle>
      <ul class="important-to-us__list">
        <li class="important-to-us__item">
          <div class="dignity dignity_quality">
            <BaseSubtitle>
              Качество
            </BaseSubtitle>
            <p class="dignity__desc">
              Наши профессионалы работают на лучшем оборудовании для пошива одежды беспрецедентного качества
            </p>
          </div>
        </li>
        <li class="important-to-us__item">
          <div class="dignity dignity_speed">
            <BaseSubtitle>
              Скорость
            </BaseSubtitle>
            <p class="dignity__desc">
              Благодаря отлаженной системе в Womazing мы можем отшивать до 20-ти единиц продукции в наших собственных цехах
            </p>
          </div>
        </li>
        <li class="important-to-us__item">
          <div class="dignity dignity_responsibility">
            <BaseSubtitle>
              Ответственность
            </BaseSubtitle>
            <p class="dignity__desc">
              Мы заботимся о людях и планете. Безотходное производство и комфортные условия труда - все это Womazing
            </p>
          </div>
        </li>
      </ul>
    </div>
  </section>
</template>

<script>
import BaseTitle from './BaseTitle.vue';
import BaseSubtitle from './BaseSubtitle.vue'

export default {
  components: {
    BaseTitle,
    BaseSubtitle,
  }
}
</script>

<style lang="scss">
.important-to-us {
  padding: rem(65) 0;

  &__list {
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(rem(250), 1fr));
    gap: rem(60) rem(30);
  }

  .dignity {
    position: relative;
    padding-top: rem(98);

    &::before {
      content: '';
      position: absolute;
      left: 0;
      top: 0;
      width: rem(61);
      height: rem(61);
      background-size: cover;
      background-repeat: no-repeat;
    }

    .subtitle {
      margin: 0 0 rem(24);
    }

    &__desc {
      margin: 0;
      font-weight: 500;
      font-size: rem(17);
      line-height: lh(24, 17);
      letter-spacing: 0.02em;
    }

    @include small {
      text-align: center;

      &::before {
        left: 50%;
        transform: translateX(-50%);
      }
    }

    @include x-small {
      position: relative;
      padding-top: rem(58);

      &::before {
        width: rem(41);
        height: rem(41);
      }

      .subtitle {
        margin: 0 0 1rem;
      }

      &__desc {
        font-weight: 400;
        font-size: rem(14);
      }
    }
  }

  @include small {
    padding: rem(32) 0;

    &__list {
      grid-template-columns: 1fr;
      gap: rem(30);
    }
  }

  @media (orientation: landscape) and (max-width: rem(575.98)) {
    &__list {
      grid-template-columns: repeat(auto-fit, minmax(rem(250), 1fr));
    }
  }

  @each $dignity in (quality, speed, responsibility) {
    .dignity_#{$dignity}::before {
      background-image: url('../assets/img/#{$dignity}-icon.svg');
    }
  }
}
</style>