<template>
  <section class="new-collection">
    <div class="container">
      <BaseTitle class="new-collection__title new-collection__title_mobile">
        Новая коллекция
      </BaseTitle>
      <div class="new-collection__wrapper">
        <BaseTitle class="new-collection__title new-collection__title_desctop">
          Новая коллекция
        </BaseTitle>
        <BaseNavigation
          class="navigation_fill navigation_prev swiper-button-prev"
        />
        <BaseNavigation
          class="navigation_fill navigation_next swiper-button-next"
        />
      </div>
      <p class="visually-hidden" aria-live="polite">
        <span :aria-hidden="contentIsLock">
          Показано: {{ page }} из {{ maxAmountPages }} страниц
        </span>
      </p>
      <div class="new-collection__slider">
        <swiper
          :modules="modules"
          v-bind="swiperParams"
          @init="initSwiperHandler"
          @slide-change="slideChangeSwiperHandler"
          @breakpoint="breakpointChangeSwiperHandler"
        >
          <swiper-slide
            v-for="(item, idx) of listItems"
            :key="idx"
            v-slot="{ isVisible }"
            :virtual-index="idx"
          >
            <CardProduct :product="item" :inert="!isVisible || contentIsLock" />
          </swiper-slide>
        </swiper>
        <LoadStatusHandler
          ref="loadStatusHandler"
          @status-change="loadStatusChangeHandler"
          @attempt="attemptHandler"
        />
      </div>
      <BaseLink href="catalog.html" class="link_hollow-gothic">
        Каталог товаров
      </BaseLink>
    </div>
  </section>
</template>

<script>
import { getItems } from "@/Api.js";
import getFontSizeBody from "@/assets/scripts/helpers/getFontSizeBody.js";
import { Virtual, Navigation, A11y } from "swiper";
import { Swiper, SwiperSlide } from "swiper/vue";
import "swiper/css";
import "swiper/css/virtual";
import "swiper/css/navigation";
import "swiper/css/a11y";

import BaseTitle from "./BaseTitle.vue";
import BaseNavigation from "./BaseNavigation";
import CardProduct from "@/components/CardProduct.vue";
import LoadStatusHandler from "./LoadStatusHandler.vue";
import BaseLink from "./BaseLink.vue";

export default {
  components: {
    BaseTitle,
    BaseNavigation,
    Swiper,
    SwiperSlide,
    CardProduct,
    LoadStatusHandler,
    BaseLink,
  },
  setup() {
    return {
      modules: [Virtual, Navigation, A11y],
    };
  },
  data() {
    return {
      page: 1,
      amount: undefined,
      listPages: {},
      total: undefined,
      contentIsLock: false,
      swiper: undefined,
    };
  },
  computed: {
    requestParams() {
      return {
        newCollection: true,
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
          prevEl: ".new-collection .navigation_prev",
          nextEl: ".new-collection .navigation_next",
        },
        a11y: {
          firstSlideMessage: "Это первая страница",
          lastSlideMessage: "Это последняя страница",
          nextSlideMessage: "Следующая страница",
          prevSlideMessage: "Предыдущая страница",
        },
        breakpoints: {
          // 62rem - 992px
          [getFontSizeBody() * 62]: {
            slidesPerView: 3,
            slidesPerGroup: 3,
          },
          // 48rem - 768px
          [getFontSizeBody() * 48]: {
            slidesPerView: 2,
            slidesPerGroup: 2,
          },
          0: {
            slidesPerView: 1,
            slidesPerGroup: 1,
          },
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
    listItems() {
      return Object.values(this.listPagesWithStubs).flat();
    },
  },
  watch: {
    page() {
      if (!this.listPages[this.page]) {
        this.addsItemsOnPage();
      }
    },
    amount(newValue, oldValue) {
      if (!oldValue) return;

      if (this.page == 1) {
        this.addsItemsOnPage();
      }

      this.resetsProgress();
    },
    contentIsLock() {
      this.togglesStateSwiper();
    },
  },
  mounted() {
    this.addsItemsOnPage();
  },
  methods: {
    addsItemsOnPage() {
      let { amount, page } = this.requestParams;

      this.$refs.loadStatusHandler.setsPendingStatus();

      getItems(this.requestParams)
        .then(({ data = null, total = null }) => {
          if (amount != this.amount) return;

          if (!data || !total || !data.length) {
            this.$refs.loadStatusHandler.setsRejectedStatus();

            return;
          }

          this.total = total;

          this.listPages[page] = data;

          this.$refs.loadStatusHandler.setsFulfilledStatus();
        })
        .catch(() => {
          this.$refs.loadStatusHandler.setsRejectedStatus();
        });
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
      this.page = Math.ceil(activeIndex / this.amount + 1);
    },
    breakpointChangeSwiperHandler(swiper, { slidesPerView }) {
      this.amount = slidesPerView;
    },
    resetsProgress() {
      this.page = 1;

      this.listPages = {};

      this.total = undefined;

      this.swiper.setProgress(0);
    },
    togglesStateSwiper() {
      if (this.contentIsLock) {
        this.swiper.disable();

        return;
      }

      this.swiper.enable();
    },
  },
};
</script>

<style lang="scss">
.new-collection {
  padding: rem(65) 0;

  .container {
    display: flex;
    flex-direction: column;
    gap: rem(65);

    @include x-small {
      gap: rem(32);
    }
  }

  &__wrapper {
    display: flex;
    align-items: center;

    @include small {
      justify-content: center;
    }
  }

  &__title {
    &_desctop {
      margin: 0 auto 0 0;

      @include small {
        display: none;
      }
    }

    &_mobile {
      margin: 0;

      @media (min-width: rem(768)) {
        display: none;
      }
    }
  }

  .swiper-button-lock {
    display: flex;
  }

  .navigation {
    position: static;
    margin: 0;
  }

  .card-product {
    @include small {
      margin: 0 auto;
      max-width: rem(350);
    }
  }

  &__slider {
    position: relative;

    @include small {
      margin: 0 0 rem(-32);
    }

    @include x-small {
      margin: 0 0 rem(-16);
    }
  }

  .link {
    display: block;
    margin: 0 auto;
    width: max-content;
  }

  .load-status-handler {
    z-index: 11;

    @media (min-width: rem(768)) {
      top: -1rem;
      right: -1rem;
      bottom: -1rem;
      left: -1rem;
    }
  }

  @include small {
    padding: 2rem 0;

    &__title_mobile {
      order: 1;
    }

    &__wrapper {
      order: 3;
    }

    &__slider {
      order: 2;
    }

    .link {
      order: 4;
    }
  }
}
</style>
