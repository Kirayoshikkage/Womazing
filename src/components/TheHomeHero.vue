<template>
  <section class="home-hero">
    <div class="container">
      <div class="home-hero__item">
        <swiper
          :modules="modules"
          :slides-per-view="1"
          :pagination="{ clickable: true }"
        >
          <swiper-slide v-slot="{ isActive }">
            <LeadTitle>
              Новые поступления
              в этом сезоне
            </LeadTitle>
            <div class="home-hero__limiter">
              <p class="home-hero__desc">
                Утонченные сочетания и бархатные оттенки - вот то, что вы искали в этом сезоне. Время исследовать.
              </p>
              <BaseLink
                class="link_filled"
                :tabindex="isActive ? 0 : -1"
              >
                Открыть магазин
              </BaseLink>
            </div>
          </swiper-slide>
          <swiper-slide v-slot="{ isActive }">
            <LeadTitle>
              Что-то новенькое. Мы заждались тебя.
            </LeadTitle>
            <div class="home-hero__limiter">
              <p class="home-hero__desc">
                Надоело искать себя в сером городе? Настало время новых идей, свежих красок и вдохновения с Womazing!
              </p>
              <BaseLink
                class="link_filled"
                :tabindex="isActive ? 0 : -1"
              >
                Открыть магазин
              </BaseLink>
            </div>
          </swiper-slide>
          <swiper-slide v-slot="{ isActive }">
            <LeadTitle>
              Включай новый сезон с WOMAZING
            </LeadTitle>
            <div class="home-hero__limiter">
              <p class="home-hero__desc">
                Мы обновили ассортимент - легендарные коллекции и новинки от отечественных дизайнеров
              </p>
              <BaseLink
                class="link_filled"
                :tabindex="isActive ? 0 : -1"
              >
                Открыть магазин
              </BaseLink>
            </div>
          </swiper-slide>
        </swiper>
      </div>
      <div class="home-hero__item">
        <picture>
          <source
            type="image/webp"
            srcset="
            ../assets/img/home-hero-img@1x.webp 1x,
            ../assets/img/home-hero-img@2x.webp 2x,
            ../assets/img/home-hero-img@3x.webp 3x
            "
          >
          <img
            class="home-hero__img"
            src="../assets/img/home-hero-img@1x.webp"
            alt=""
            aria-hidden="true"
            width="410"
            height="646"
          >
        </picture>
      </div>
    </div>
  </section>
</template>

<script>
// Swiper
import { Pagination, A11y } from 'swiper';
import { Swiper, SwiperSlide } from 'swiper/vue';
import 'swiper/css';
import 'swiper/css/pagination';
import 'swiper/css/a11y';

import LeadTitle from './LeadTitle.vue';
import BaseLink from './BaseLink.vue'

export default {
  components: {
    Swiper,
    SwiperSlide,
    LeadTitle,
    BaseLink
  },
  setup() {
    return {
      modules: [Pagination, A11y],
    };
  },
};
</script>

<style lang="scss">
.home-hero {
  margin: 0 0 rem(95);

  .container {
    display: grid;
    justify-content: space-between;
    grid-template-columns: 50.72% 36.94%;
    gap: rem(24);
  }

  .swiper {
    height: 100%;
  }

  .swiper-slide {
    display: flex;
    flex-direction: column;
    justify-content: center;
  }

  .lead {
    margin: 0 0 rem(45);
    max-width: rem(548);
  }

  &__limiter {
    max-width: rem(385);
    text-align: right;
  }

  &__desc {
    margin: 0 0 rem(45);
    font-size: rem(20);
    line-height: lh(28, 20);
    letter-spacing: 0.02em;
    color: var(--color-black);
  }

  .swiper-pagination {
    bottom: 0;
    max-width: rem(385);
    text-align: right;
  }

  .swiper-pagination-bullet {
    margin: 0 rem(6) !important;
    outline: none;
    border-radius: 0;
    width: rem(30);
    height: rem(4);
    transition-property: background, opacity;
    transition-duration: var(--transition-duration);

    @include mouse-device {

      &:hover,
      &:focus {
        background-color: var(--color-black);
        opacity: 1;
      }
    }
  }

  .swiper-pagination-bullet-active {
    background-color: var(--color-gothic);
  }
}
</style>