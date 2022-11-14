<template>
  <section class="new-collection">
    <div class="container">
      <BaseTitle> Новая коллекция </BaseTitle>
      <div class="new-collection__slider">
        <swiper
          :modules="modules"
          v-bind="swiperParameters"
          :aria-hidden="isEmpyListItemsNewCollection"
          @swiper="setsVariableSwiper"
        >
          <swiper-slide
            v-for="item of listItemsForSwiper"
            v-slot="{ isVisible }"
            :key="item.id"
          >
            <CardProduct
              :product="item"
              :focus-lock="!isVisible"
              :aria-hidden="!isVisible"
            />
          </swiper-slide>
          <template #container-start>
            <div class="swiper-button-prev" />
            <div class="swiper-button-next" />
          </template>
        </swiper>
        <BasePreloader ref="preloader" />
        <TryAgain
          ref="tryAgain"
          :callback="callbackForTryAgain"
          @successful="successHandler"
          @unsuccessful="unsuccessfulHandler"
          @before-attempt="beforeAttemptHandler"
          @after-attempt="afterAttemptHandler"
        />
      </div>
      <BaseLink class="link_hollow-gothic"> Каталог товаров </BaseLink>
    </div>
  </section>
</template>

<script>
import { Navigation, A11y } from "swiper";
import { Swiper, SwiperSlide } from "swiper/vue";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/a11y";

import BaseTitle from "./BaseTitle.vue";
import CardProduct from "./CardProduct.vue";
import BasePreloader from "./BasePreloader.vue";
import TryAgain from "./TryAgain.vue";
import BaseLink from "./BaseLink.vue";

import { getNewCollectionItems } from "../Api.js";
import getFontSizeBody from "../assets/scripts/helpers/getFontSizeBody.js";

export default {
  components: {
    Swiper,
    SwiperSlide,
    BaseTitle,
    CardProduct,
    BaseLink,
    BasePreloader,
    TryAgain,
  },
  setup() {
    return {
      modules: [Navigation, A11y],
    };
  },
  data() {
    return {
      listItemsNewCollection: [],
      stubListItemsNewCollection: Array(5).fill({}),
    };
  },
  computed: {
    isEmpyListItemsNewCollection() {
      return !this.listItemsNewCollection.length;
    },
    swiperParameters() {
      return {
        slidesPerView: 3,
        spaceBetween: 30,
        navigation: {
          nextEl: ".swiper-button-next",
          prevEl: ".swiper-button-prev",
        },
        a11y: {
          firstSlideMessage: "Это первый слайд",
          lastSlideMessage: "Это последний слайд",
          nextSlideMessage: "Следующий слайд",
          prevSlideMessage: "Предыдущий слайд",
        },
        watchSlidesProgress: !this.isEmpyListItemsNewCollection,
        breakpoints: {
          0: {
            slidesPerView: 1,
          },
          // 36rem - 576px
          [getFontSizeBody() * 36]: {
            slidesPerView: 2,
          },
          // 62rem - 992px
          [getFontSizeBody() * 62]: {
            slidesPerView: 3,
          },
          // 128rem - 2048px
          2048: {
            slidesPerView: 4,
          },
        },
        enabled: false,
      };
    },
    listItemsForSwiper() {
      return this.isEmpyListItemsNewCollection
        ? this.stubListItemsNewCollection
        : this.listItemsNewCollection;
    },
    callbackForTryAgain() {
      return getNewCollectionItems;
    },
  },
  watch: {
    listItemsNewCollection() {
      if (this.isEmpyListItemsNewCollection) {
        this.$refs.tryAgain.showTryAgain();
      }
    },
    isEmpyListItemsNewCollection(value) {
      if (!value) {
        this.$options.swiper.enable();
      }
    },
  },
  mounted() {
    this.setsListItemsNewCollection();
  },
  methods: {
    setsListItemsNewCollection() {
      this.$refs.preloader.showPreloader();

      getNewCollectionItems()
        .then((data) => {
          this.listItemsNewCollection = data;
        })
        .catch(() => {
          this.$refs.tryAgain.showTryAgain();
        })
        .finally(() => {
          this.$refs.preloader.hidePreloader();
        });
    },
    beforeAttemptHandler() {
      this.$refs.tryAgain.hideTryAgain();

      this.$refs.preloader.showPreloader();
    },
    successHandler(data) {
      this.listItemsNewCollection = data;
    },
    unsuccessfulHandler() {
      this.$refs.tryAgain.showTryAgain();
    },
    afterAttemptHandler() {
      this.$refs.preloader.hidePreloader();
    },
    setsVariableSwiper(swiper) {
      this.$options.swiper = swiper;
    },
  },
};
</script>

<style lang="scss">
@import "../assets/styles/components/slider-btn";

.new-collection {
  padding: rem(65) 0;

  .title {
    margin: 0 0 rem(62);

    @include x-small {
      margin: 0 0 rem(32);
    }
  }

  &__slider {
    position: relative;
    margin: 0 0 rem(65);

    @include small {
      margin: 0 0 rem(24);
    }
  }

  .swiper {
    padding: rem(91) 0 0 0;

    &::before {
      content: "";
      position: absolute;
      top: 0;
      z-index: 9;
      width: 100%;
      height: 100%;
      background-color: rgba(110, 156, 159, 90%);
      opacity: 0;
      visibility: hidden;
      transition-property: opacity, visibility;
      transition-duration: var(--transition-duration);
    }

    @include x-small {
      padding: 0 0 rem(66);
    }
  }

  .swiper[aria-hidden="true"]::before {
    opacity: 1;
    visibility: visible;
  }

  .card-product {
    @include x-small {
      &__link {
        margin: 0 auto rem(24);
        max-width: rem(350);
      }
    }

    @media (orientation: landscape) and (max-width: rem(991.98)) and (min-width: rem(768)) and (max-height: rem(500)) {
      &__link {
        height: rem(320);
      }
    }

    @media (orientation: landscape) and (max-width: rem(575.98)) {
      &__link {
        height: rem(320);
      }

      &__img {
        object-fit: contain;
      }
    }
  }

  .swiper-button-prev,
  .swiper-button-next {
    right: 0;
    top: 0;
    margin: 0;

    @include x-small {
      top: auto;
      bottom: 0;
    }

    @extend .slider-btn;
  }

  .swiper-button-prev {
    left: auto;
    transform: translateX(-100%);

    @include x-small {
      left: 50%;
    }
  }

  .swiper-button-next {
    @include x-small {
      right: 50%;
      transform: translateX(100%);
    }
  }

  .preloader,
  .try-again {
    position: absolute;
    z-index: 10;
    display: flex;
    align-items: center;
    justify-content: center;
    width: 100%;
    height: 100%;
  }

  .preloader {
    left: 50%;
    top: 50%;
    transform: translate(-50%, -50%);
  }

  .try-again {
    left: 0;
    top: 0;
    flex-direction: column;
  }

  .link {
    display: block;
    margin: 0 auto;
    width: max-content;
  }

  @include x-small {
    padding: 2rem 0;
  }
}
</style>
