<template>
  <article class="card-product">
    <a class="card-product__link" href="">
      <img
        class="card-product__img"
        :src="srcImg"
        :srcset="srcsetImg"
        :alt="altImg"
        width="350"
        height="478"
      />
    </a>
    <BaseSubtitle>
      {{ title }}
    </BaseSubtitle>
    <p v-if="discount" class="card-product__price card-product__old-price">
      <span class="visually-hidden">Старая цена</span>
      &#36;{{ oldPrice }}
    </p>
    <p class="card-product__price">
      <span v-if="discount" class="visually-hidden"> Новая цена </span>
      <span v-if="!discount" class="visually-hidden"> Цена </span>
      &#36;{{ price }}
    </p>
  </article>
</template>

<script>
import BaseSubtitle from "./BaseSubtitle.vue";

export default {
  components: {
    BaseSubtitle,
  },
  props: {
    product: {
      type: Object,
      required: true,
      default() {
        return {};
      },
    },
  },
  computed: {
    title() {
      const { title = "Womazing" } = this.product;

      return title;
    },
    price() {
      const { price = 80 } = this.product;

      return price;
    },
    discount() {
      return this.product.discount;
    },
    oldPrice() {
      return Math.round((100 * this.price) / (100 - this.discount));
    },
    srcImg() {
      const img = this.product.gallery?.path["1x"];
      const stub = require("@/assets/img/stubForProduct.svg");

      return img || stub;
    },
    srcsetImg() {
      const imgs = this.product.gallery?.path || {};

      return Object.keys(imgs).reduce((acc, key) => {
        acc += `${imgs[key]} ${key},`;

        return acc;
      }, "");
    },
    altImg() {
      const alt = this.product.gallery?.alt;
      const stubAlt = "Womazing";

      return alt || stubAlt;
    },
  },
};
</script>

<style lang="scss">
.card-product {
  text-align: center;

  &__link {
    position: relative;
    display: block;
    margin: 0 0 rem(24);
    outline: none;

    &::before {
      content: "";
      position: absolute;
      left: 0;
      right: 0;
      top: 0;
      bottom: 0;
      background-color: transparent;
      transition: background var(--transition-duration);
    }

    &::after {
      content: "";
      position: absolute;
      left: 50%;
      top: 50%;
      z-index: 1;
      width: rem(31);
      height: rem(22);
      background-image: url("@/assets/img/arrow.svg");
      background-size: cover;
      background-repeat: no-repeat;
      opacity: 0;
      transform: translate(-50%);
      transition: opacity var(--transition-duration);
    }

    @include mouse-device {
      &:hover,
      &:focus {
        &::before {
          background-color: rgba(110, 156, 159, 65%);
        }

        &::after {
          opacity: 1;
        }
      }
    }
  }

  &__img {
    display: block;
    width: 100%;
    height: 100%;
  }

  .subtitle {
    margin: 0 0 0.5rem;
  }

  &__price {
    display: inline-block;
    margin: 0;
    font-weight: 500;
    font-size: 1rem;
    line-height: lh(21, 16);
    letter-spacing: 0.02em;
    color: var(--color-gothic);
  }

  &__old-price {
    margin: 0 rem(10) 0 0;
    text-decoration: line-through;
  }
}
</style>
