<template>
  <section class="catalog-items">
    <div class="container">
      <div v-show="!listPagesIsEmpty" class="catalog-items__wrapper">
        <h2 class="visually-hidden">Каталог товаров</h2>
        <p class="catalog-items__counter" aria-live="polite">
          <span :aria-hidden="contentIsLock">
            Показано: {{ page }} из {{ maxAmountPages }} страниц
          </span>
        </p>
        <div ref="sliderWrapper" class="catalog-items__slider">
          <swiper
            :modules="modules"
            v-bind="swiperParams"
            @init="initSwiperHandler"
            @slide-change="slideChangeSwiperHandler"
            @resize="resizeSwiperHandler"
          >
            <swiper-slide
              v-for="(listItems, idxPage) in listPagesWithStubs"
              :key="idxPage"
              v-slot="{ isVisible }"
              :virtual-index="idxPage"
            >
              <template v-for="(item, itemIdx) of listItems" :key="itemIdx">
                <CardProduct
                  :product="item"
                  :inert="!isVisible || contentIsLock"
                />
              </template>
            </swiper-slide>
          </swiper>
          <LoadStatusHandler
            ref="loadStatusHandler"
            @status-change="loadStatusChangeHandler"
            @attempt="attemptHandler"
          />
        </div>
        <div class="catalog-items__page-switching">
          <BaseNavigation
            class="navigation_hollow navigation_prev swiper-button-prev"
          />
          <BasePagination
            v-model:page="page"
            :max-amount-pages="maxAmountPages"
            :disabled="contentIsLock"
          />
          <BaseNavigation
            class="navigation_hollow navigation_next swiper-button-next"
          />
        </div>
      </div>
      <BaseSubtitle
        v-show="listPagesIsEmpty"
        class="catalog-items__not-found"
        role="alert"
      >
        По вашему запросу ничего не найдено
      </BaseSubtitle>
    </div>
  </section>
</template>

<script>
import { getItems } from "@/Api.js";
import isEqual from "@/assets/scripts/helpers/isEqual.js";
import debounce from "@/assets/scripts/helpers/debounce";

import { Virtual, Navigation, A11y } from "swiper";
import { Swiper, SwiperSlide } from "swiper/vue";
import "swiper/css";
import "swiper/css/virtual";
import "swiper/css/navigation";
import "swiper/css/a11y";

import CardProduct from "@/components/CardProduct.vue";
import LoadStatusHandler from "./LoadStatusHandler.vue";
import BaseNavigation from "./BaseNavigation";
import BasePagination from "./BasePagination.vue";
import BaseSubtitle from "./BaseSubtitle.vue";

export default {
  components: {
    Swiper,
    SwiperSlide,
    CardProduct,
    LoadStatusHandler,
    BaseNavigation,
    BasePagination,
    BaseSubtitle,
  },
  props: {
    filters: {
      type: Object,
      default() {
        return {};
      },
    },
  },
  setup() {
    return {
      modules: [Virtual, Navigation, A11y],
    };
  },
  data() {
    return {
      page: 1,
      amount: 6,
      total: undefined,
      listPages: {},
      contentIsLock: false,
      swiper: undefined,
    };
  },
  computed: {
    requestParams() {
      return {
        ...this.filters,
        page: this.page,
        amount: this.amount,
      };
    },
    swiperParams() {
      return {
        spaceBetween: 30,
        virtual: true,
        simulateTouch: false,
        watchSlidesProgress: true,
        navigation: {
          prevEl: ".catalog-items .navigation_prev",
          nextEl: ".catalog-items .navigation_next",
        },
        a11y: {
          firstSlideMessage: "Это первая страница",
          lastSlideMessage: "Это последняя страница",
          nextSlideMessage: "Следующая страница",
          prevSlideMessage: "Предыдущая страница",
        },
      };
    },
    maxAmountPages() {
      return Math.ceil(this.total / this.amount) || 1;
    },
    listPagesWithStubs() {
      return Object.fromEntries(
        Array.from(Array(this.maxAmountPages), (item, idx) => {
          let page = idx + 1;
          let data = this.listPages[page];

          if (!data) {
            let isLastPage = page === this.maxAmountPages;
            let isLacks = page * this.amount > this.total;

            data =
              isLastPage && isLacks && this.total
                ? Array(this.total - (page - 1) * this.amount).fill({})
                : Array(this.amount).fill({});
          }

          return [page, data];
        })
      );
    },
    listPagesIsEmpty() {
      return (
        Object.keys(this.listPages).length &&
        !Object.values(this.listPages).flat().length
      );
    },
  },
  watch: {
    page() {
      if (!this.listPages[this.page]) {
        this.addsItemsOnPage();
      }

      this.syncsSwiperProgress();

      setTimeout(this.scrollsTopWhenPageChanges, 100);

      setTimeout(this.updatesSwiperHeight, 0);
    },
    contentIsLock() {
      this.togglesStateSwiper();
    },
    filters() {
      if (this.page == 1) {
        this.addsItemsOnPage();
      }

      this.resetsProgress();
    },
  },
  mounted() {
    this.addsItemsOnPage();
  },
  methods: {
    addsItemsOnPage() {
      const params = this.requestParams;

      this.$refs.loadStatusHandler.setsPendingStatus();

      getItems(this.requestParams)
        .then(({ data = null, total = NaN }) => {
          if (!isEqual(params, this.requestParams)) return;

          if (!data || total !== total) {
            this.$refs.loadStatusHandler.setsRejectedStatus();

            return;
          }

          this.total = total;

          this.listPages[params.page] = data;

          this.$refs.loadStatusHandler.setsFulfilledStatus();
        })
        .catch(() => {
          if (!isEqual(params, this.requestParams)) return;

          this.$refs.loadStatusHandler.setsRejectedStatus();
        });
    },
    syncsSwiperProgress() {
      this.swiper.slideTo(this.page - 1);
    },
    scrollsTopWhenPageChanges() {
      this.$refs.sliderWrapper.scrollIntoView({
        behavior: "smooth",
        block: "start",
      });
    },
    updatesSwiperHeight() {
      let height = this.swiper.visibleSlides[0]?.scrollHeight;
      let currentHeight = parseFloat(this.swiper.el.style.maxHeight);

      if (currentHeight == height || !height) return;

      this.swiper.el.style.maxHeight = `${height}px`;
    },
    togglesStateSwiper() {
      if (this.contentIsLock) {
        this.swiper.disable();

        return;
      }

      this.swiper.enable();
    },
    resetsProgress() {
      this.page = 1;

      this.listPages = {};

      this.total = undefined;
    },
    attemptHandler() {
      this.addsItemsOnPage();
    },
    loadStatusChangeHandler(status) {
      this.contentIsLock = status !== "fulfilled";
    },
    initSwiperHandler(swiper) {
      this.swiper = swiper;

      this.resetsAriaLiveSwiperWrapper(swiper.wrapperEl);
    },
    resetsAriaLiveSwiperWrapper(wrapper) {
      this.$nextTick().then(() => {
        wrapper.setAttribute("aria-live", "off");
      });
    },
    slideChangeSwiperHandler({ activeIndex }) {
      this.page = activeIndex + 1;
    },
    resizeSwiperHandler: debounce(function () {
      this.updatesSwiperHeight();

      this.swiper.update();
    }, 400),
  },
};
</script>

<style lang="scss">
.catalog-items {
  padding: 2rem 0 rem(128);

  &__counter {
    margin: 0 0 2rem;
    font-size: rem(17);
    font-weight: 500;
    line-height: lh(24, 17);
    letter-spacing: 0.02em;
    color: var(--color-gothic);
  }

  &__slider {
    position: relative;
    margin: 0 0 rem(64);

    @include x-small {
      margin: 0 0 rem(48);
    }
  }

  .swiper-wrapper {
    align-items: flex-start;
  }

  .swiper-slide {
    display: grid;
    grid-template-columns: repeat(3, 1fr);
    gap: rem(64) rem(32);
    height: auto;

    @include medium {
      grid-template-columns: repeat(2, 1fr);
    }

    @include small {
      gap: rem(32);
    }

    @include x-small {
      grid-template-columns: 1fr;
    }
  }

  .card-product {
    @include x-small {
      margin: 0 auto;
      max-width: rem(350);
    }
  }

  .load-status-handler {
    z-index: 11;

    @media (min-width: rem(576)) {
      top: -1rem;
      right: -1rem;
      bottom: -1rem;
      left: -1rem;
    }

    @media (max-width: rem(575.98)),
      (orientation: landscape) and (max-width: rem(991.98)) {
      align-items: flex-start;
      padding-top: 50vh;

      .preloader,
      .try-again {
        transform: translateY(-50%);
      }
    }
  }

  &__page-switching {
    display: flex;
    flex-wrap: wrap;
    align-items: center;
    justify-content: center;
    gap: rem(14);

    @include x-small {
      gap: rem(14) 0;
    }
  }

  .swiper-button-lock {
    display: flex;
  }

  .swiper-button-disabled {
    @media (min-width: rem(576)) {
      opacity: 0;
    }
  }

  .navigation {
    position: static;
    margin: 0;

    @include x-small {
      order: 1;
    }
  }

  .pagination {
    display: flex;
    justify-content: center;
    flex-wrap: wrap;
    gap: rem(14);

    @include x-small {
      flex: 1 1 100%;
    }
  }

  &__not-found {
    text-align: center;
  }

  @include small {
    padding: 1rem 0 rem(64);
  }
}
</style>
