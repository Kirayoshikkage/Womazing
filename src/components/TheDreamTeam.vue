<template>
  <section class="dream-team">
    <div class="container">
      <BaseTitle>
        Команда мечты Womazing
      </BaseTitle>
      <div class="dream-team__content">
        <div class="dream-team__item">
          <swiper
            :modules="modules"
            :slides-per-view="1"
            navigation
            :a11y="{
              firstSlideMessage: 'Это первый слайд',
              lastSlideMessage: 'Это последний слайд',
              nextSlideMessage: 'Следующий слайд',
              prevSlideMessage: 'Предыдущий слайд'
            }"
          >
            <swiper-slide v-slot="{ isActive }">
              <picture :aria-hidden="!isActive">
                <source
                  media="(min-width: 2048px)"
                  type="image/webp"
                  srcset="
                    ../assets/img/dream-team-one-desctop@2x.webp,
                    ../assets/img/dream-team-one-desctop@3x.webp 2x,
                    ../assets/img/dream-team-one-desctop@4x.webp 3x
                  "
                >
                <source
                  media="(max-width:2047.98px) and (min-width: 486px)"
                  type="image/webp"
                  srcset="
                    ../assets/img/dream-team-one-desctop@1x.webp,
                    ../assets/img/dream-team-one-desctop@2x.webp 2x,
                    ../assets/img/dream-team-one-desctop@3x.webp 3x
                  "
                >
                <source
                  media="(max-width: 485.98px)"
                  type="image/webp"
                  srcset="
                    ../assets/img/dream-team-one-mobile@1x.webp 1x,
                    ../assets/img/dream-team-one-mobile@2x.webp 2x,
                    ../assets/img/dream-team-one-mobile@3x.webp 3x
                  "
                >
                <img
                  class="dream-team__img"
                  src="../assets/img/dream-team-one-desctop@1x.webp"
                  alt="Девушки на фоне леса"
                  loading="lazy"
                  width="729"
                  height="487"
                >
              </picture>
            </swiper-slide>
            <swiper-slide v-slot="{ isActive }">
              <picture :aria-hidden="!isActive">
                <source
                  media="(min-width:2048px)"
                  type="image/webp"
                  srcset="
                    ../assets/img/dream-team-two-desctop@2x.webp,
                    ../assets/img/dream-team-two-desctop@3x.webp 2x,
                    ../assets/img/dream-team-two-desctop@4x.webp 3x
                  "
                >
                <source
                  media="(max-width:2047.98px) and (min-width: 486px)"
                  type="image/webp"
                  srcset="
                    ../assets/img/dream-team-two-desctop@1x.webp,
                    ../assets/img/dream-team-two-desctop@2x.webp 2x,
                    ../assets/img/dream-team-two-desctop@3x.webp 3x
                  "
                >
                <source
                  media="(max-width: 485.98px)"
                  type="image/webp"
                  srcset="
                    ../assets/img/dream-team-two-mobile@1x.webp 1x,
                    ../assets/img/dream-team-two-mobile@2x.webp 2x,
                    ../assets/img/dream-team-two-mobile@3x.webp 3x
                  "
                >
                <img
                  class="dream-team__img"
                  src="../assets/img/dream-team-two-desctop@1x.webp"
                  alt="Девушки на фоне городского заката"
                  loading="lazy"
                  width="729"
                  height="487"
                >
              </picture>
            </swiper-slide>
            <swiper-slide v-slot="{ isActive }">
              <picture :aria-hidden="!isActive">
                <source
                  media="(min-width:2048px)"
                  type="image/webp"
                  srcset="
                    ../assets/img/dream-team-three-desctop@2x.webp,
                    ../assets/img/dream-team-three-desctop@3x.webp 2x,
                    ../assets/img/dream-team-three-desctop@4x.webp 3x
                  "
                >
                <source
                  media="(max-width:2047.98px) and (min-width: 486px)"
                  type="image/webp"
                  srcset="
                    ../assets/img/dream-team-three-desctop@1x.webp,
                    ../assets/img/dream-team-three-desctop@2x.webp 2x,
                    ../assets/img/dream-team-three-desctop@3x.webp 3x
                  "
                >
                <source
                  media="(max-width: 485.98px)"
                  type="image/webp"
                  srcset="
                    ../assets/img/dream-team-three-mobile@1x.webp 1x,
                    ../assets/img/dream-team-three-mobile@2x.webp 2x,
                    ../assets/img/dream-team-three-mobile@3x.webp 3x
                  "
                >
                <img
                  class="dream-team__img"
                  src="../assets/img/dream-team-three-desctop@1x.webp"
                  alt="Девушки парикмахеры"
                  loading="lazy"
                  width="729"
                  height="487"
                >
              </picture>
            </swiper-slide>
          </swiper>
        </div>
        <div class="dream-team__item dream-team__item_text-content">
          <BaseSubtitle>
            Для каждой
          </BaseSubtitle>
          <p class="dream-team__text">
            Каждая девушка уникальна. Однако, мы схожи в миллионе мелочей.
          </p>
          <p class="dream-team__text">
            Womazing ищет эти мелочи и создает прекрасные вещи, которые выгодно подчеркивают достоинства каждой девушки.
          </p>
          <a
            href="#"
            class="dream-team__link"
          >
            Подробнее о бренде
          </a>
        </div>
      </div>
    </div>
  </section>  
</template>

<script>
import { Navigation, A11y } from 'swiper';
import { Swiper, SwiperSlide } from 'swiper/vue';
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/a11y';

import BaseTitle from './BaseTitle.vue';
import BaseSubtitle from './BaseSubtitle.vue'

export default {
  components: {
    Swiper,
    SwiperSlide,
    BaseTitle,
    BaseSubtitle,
  },
  setup() {
    return {
      modules: [Navigation, A11y],
    };
  },
}
</script>

<style lang="scss">
.dream-team {
  padding: rem(65) 0 rem(130);

  &__content {
    display: grid;
    justify-content: space-between;
    grid-template-columns: 65.68% 22.97%;
    gap: rem(24);

    @include medium {
      grid-template-columns: 100%;
      text-align: center;
    }
  }

  &__item_text-content {
    display: flex;
    flex-direction: column;
    justify-content: center;
    gap: rem(28);

    @include x-small {
      gap: 1rem;
    }
  }

  .swiper {
    height: 100%;
  }

  &__img {
    width: 100%;
    height: 100%;
  }

  &__text {
    margin: 0;
  }

  &__link {
    outline: none;
    color: var(--color-gothic);

    @include mouse-device {
      align-self: flex-start;
      border-bottom: rem(1) solid transparent;
      padding-bottom: rem(5);
      transition: border-color var(--transition-duration);

      &:hover,
      &:focus {
        border-bottom-color: var(--color-gothic);
      }

      @include medium {
        align-self: center;
      }
    }
  }

  .dream-team__text,
  .dream-team__link {
    font-weight: 500;
    font-size: rem(17);
    line-height: lh(24, 17);
    letter-spacing: 0.02em;

    @include x-small {
      font-weight: 400;
      font-size: rem(14);
    }
  }

  .swiper-button-prev,
  .swiper-button-next {
    outline: none;
    border-radius: 100%;
    width: rem(50);
    height: rem(50);
    background-color: var(--color-gothic);
    transition: background var(--transition-duration);

    &::after {
      font-weight: 700;
      font-size: rem(22);
      color: var(--color-white);
    }

    @include mouse-device {

      &:hover,
      &:focus {
        background-color: var(--color-black);
      }
    }

    @include touch-device {
      &:active {
        background-color: var(--color-black);
      }
    }
  }

  @include small {
    padding: rem(32) 0 rem(65);
  }

  @include x-small {
    .swiper {
      padding-bottom: rem(66);
    }

    .swiper-button-prev,
    .swiper-button-next {
      top: auto;
      bottom: 0;
    }

    .swiper-button-prev {
      left: 50%;
      transform: translate(-100%);
    }

    .swiper-button-next {
      right: 50%;
      transform: translate(100%);
    }
  }
}
</style>