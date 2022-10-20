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
          >
            <swiper-slide>
              <picture>
                <source
                  type="image/webp"
                  srcset="
                    ../assets/img/dream-team-one@1x.webp 1x,
                    ../assets/img/dream-team-one@2x.webp 2x,
                    ../assets/img/dream-team-one@3x.webp 3x
                  "
                >
                <img
                  class="dream-team__img"
                  src="../assets/img/dream-team-one@1x.webp"
                  alt="One"
                  loading="lazy"
                  width="729"
                  height="487"
                >
              </picture>
            </swiper-slide>
            <swiper-slide>
              <picture>
                <source
                  type="image/webp"
                  srcset="
                    ../assets/img/dream-team-two@1x.webp 1x,
                    ../assets/img/dream-team-two@2x.webp 2x,
                    ../assets/img/dream-team-two@3x.webp 3x
                  "
                >
                <img
                  class="dream-team__img"
                  src="../assets/img/dream-team-two@1x.webp"
                  alt="One"
                  loading="lazy"
                  width="729"
                  height="487"
                >
              </picture>
            </swiper-slide>
            <swiper-slide>
              <picture>
                <source
                  type="image/webp"
                  srcset="
                    ../assets/img/dream-team-three@1x.webp 1x,
                    ../assets/img/dream-team-three@2x.webp 2x,
                    ../assets/img/dream-team-three@3x.webp 3x
                  "
                >
                <img
                  class="dream-team__img"
                  src="../assets/img/dream-team-three@1x.webp"
                  alt="One"
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
  margin: 0 0 rem(65);
  padding: rem(65) 0;

  &__content {
    display: grid;
    justify-content: space-between;
    grid-template-columns: 65.68% 22.97%;
    gap: rem(24);
  }

  &__item {
    &_text-content {
      display: flex;
      flex-direction: column;
      justify-content: center;
      gap: rem(28);
    }
  }

  &__link {
    color: var(--color-gothic);
  }

  &__text {
    margin: 0;
  }

  .dream-team__text,
  .dream-team__link {
    font-weight: 500;
    font-size: rem(17);
    line-height: lh(24, 17);
    letter-spacing: 0.02em;
  }

  .swiper-button-prev,
  .swiper-button-next {
    border-radius: 100%;
    width: rem(50);
    height: rem(50);
    background-color: var(--color-gothic);

    &::after {
      font-weight: 700;
      font-size: rem(22);
      color: var(--color-white);
    }
  }
}
</style>