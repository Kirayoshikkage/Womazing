<template>
  <section class="home-hero">
    <div class="container">
      <div class="home-hero__item">
        <swiper
          :modules="modules"
          :slides-per-view="1"
          :pagination="{ clickable: true }"
          :a11y="{
            firstSlideMessage: 'Это первый слайд',
            lastSlideMessage: 'Это последний слайд',
            paginationBulletMessage: 'Перейти к слайду {{index}}',
          }"
        >
          <swiper-slide v-slot="{ isActive }">
            <div class="home-hero__content" :aria-hidden="!isActive">
              <LeadTitle> Новые поступления в этом сезоне </LeadTitle>
              <div class="home-hero__limiter">
                <p class="home-hero__desc">
                  Утонченные сочетания и бархатные оттенки - вот то, что вы
                  искали в этом сезоне. Время исследовать.
                </p>
                <BaseLink
                  class="link_filled"
                  href="#"
                  :tabindex="isActive ? 0 : -1"
                >
                  Каталог товаров
                </BaseLink>
              </div>
            </div>
          </swiper-slide>
          <swiper-slide v-slot="{ isActive }">
            <div class="home-hero__content" :aria-hidden="!isActive">
              <LeadTitle> Что-то новенькое. Мы заждались тебя. </LeadTitle>
              <div class="home-hero__limiter">
                <p class="home-hero__desc">
                  Надоело искать себя в сером городе? Настало время новых идей,
                  свежих красок и вдохновения с Womazing!
                </p>
                <BaseLink
                  class="link_filled"
                  href="#"
                  :tabindex="isActive ? 0 : -1"
                >
                  Открыть магазин
                </BaseLink>
              </div>
            </div>
          </swiper-slide>
          <swiper-slide v-slot="{ isActive }">
            <div class="home-hero__content" :aria-hidden="!isActive">
              <LeadTitle> Включай новый сезон с WOMAZING </LeadTitle>
              <div class="home-hero__limiter">
                <p class="home-hero__desc">
                  Мы обновили ассортимент - легендарные коллекции и новинки от
                  отечественных дизайнеров
                </p>
                <BaseLink
                  class="link_filled"
                  href="#"
                  :tabindex="isActive ? 0 : -1"
                >
                  Открыть магазин
                </BaseLink>
              </div>
            </div>
          </swiper-slide>
        </swiper>
      </div>
      <div class="home-hero__item home-hero__item_img">
        <picture>
          <source
            media="(min-width: 128rem)"
            type="image/webp"
            srcset="
              ../assets/img/home-hero-img@2x.webp,
              ../assets/img/home-hero-img@3x.webp 2x,
              ../assets/img/home-hero-img@4x.webp 3x
            "
          />
          <source
            media="(max-width: 127.98rem) and (min-width: 62rem)"
            type="image/webp"
            srcset="
              ../assets/img/home-hero-img@1x.webp,
              ../assets/img/home-hero-img@2x.webp 2x,
              ../assets/img/home-hero-img@3x.webp 3x
            "
          />
          <source
            media="(max-width: 61.98rem)"
            type="image/webp"
            srcset="../assets/img/stub.webp"
          />
          <img
            class="home-hero__img"
            src="../assets/img/home-hero-img@1x.webp"
            alt=""
            aria-hidden="true"
            width="410"
            height="646"
          />
        </picture>
      </div>
    </div>
  </section>
</template>

<script>
// Swiper
import { Pagination, A11y } from "swiper";
import { Swiper, SwiperSlide } from "swiper/vue";
import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/a11y";

import LeadTitle from "./LeadTitle.vue";
import BaseLink from "./BaseLink.vue";

export default {
  components: {
    Swiper,
    SwiperSlide,
    LeadTitle,
    BaseLink,
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

    @include medium {
      grid-template-columns: 100%;
    }
  }

  &__item_img {
    @include medium {
      display: none;
    }
  }

  .swiper {
    padding-bottom: 3rem;
    height: 100%;
  }

  &__content {
    display: flex;
    flex-direction: column;
    justify-content: center;
    height: 100%;
  }

  .lead {
    margin: 0 0 rem(45);
    max-width: rem(548);

    @include medium {
      max-width: 100%;
      text-align: center;
    }

    @include x-small {
      margin: 0 0 1rem;
    }
  }

  &__limiter {
    max-width: rem(385);
    text-align: right;

    @include medium {
      max-width: 100%;
      text-align: center;
    }
  }

  &__desc {
    margin: 0 0 rem(45);
    font-size: rem(20);
    line-height: lh(28, 20);
    letter-spacing: 0.02em;
    color: var(--color-black);

    @include x-small {
      margin: 0 0 2rem;
      font-size: 1rem;
    }
  }

  .swiper-pagination {
    bottom: 0;
    max-width: rem(385);
    text-align: right;

    @include medium {
      max-width: 100%;
      text-align: center;
    }
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

  &__img {
    width: 100%;
    height: 100%;
    min-height: rem(646);
  }

  @include medium {
    margin: 0;
    padding: rem(65) 0;
  }

  @include small {
    padding: rem(32) 0;
  }
}
</style>
