<template>
  <ul class="pagination" :class="{ pagination_disabled: disabled }">
    <li v-for="pageIndex of pageIndexesForOutput" :key="pageIndex">
      <button
        class="pagination__item"
        :class="{
          active: pageIndex === page,
        }"
        :aria-label="paginationMessage.replace('${index}', pageIndex)"
        :aria-current="pageIndex === page"
        @pointerup="updatesPage(pageIndex)"
        @keydown.enter="updatesPage(pageIndex)"
        @keydown.space="updatesPage(pageIndex)"
      >
        {{ pageIndex }}
      </button>
    </li>
  </ul>
</template>

<script>
export default {
  props: {
    page: {
      type: Number,
      required: true,
      default: 1,
    },
    maxAmountPages: {
      type: Number,
      required: true,
      default: 1,
    },
    amountDisplayedPaginationButtons: {
      type: Number,
      default: 5,
    },
    a11y: {
      type: Object,
      default() {
        return {};
      },
    },
    disabled: {
      type: Boolean,
      default: false,
    },
  },
  emits: {
    "update:page": null,
  },
  computed: {
    pageIndexes() {
      return Array.from(Array(this.maxAmountPages), (item, idx) => idx + 1);
    },
    amountSideItems() {
      return Math.floor(this.amountDisplayedPaginationButtons / 2);
    },
    startIdx() {
      const idx = this.page - 1 - this.amountSideItems;
      let normalizedIdx = idx < 0 ? 0 : idx;

      if (this.page + this.amountSideItems >= this.maxAmountPages) {
        normalizedIdx -=
          this.amountSideItems - (this.maxAmountPages - this.page);
      }

      return normalizedIdx;
    },
    endIdx() {
      let idx = this.page + this.amountSideItems;

      if (this.startIdx == 0) {
        idx += this.amountSideItems - (this.page - 1);
      }

      return idx;
    },
    pageIndexesForOutput() {
      return this.pageIndexes.length <= this.amountDisplayedPaginationButtons
        ? this.pageIndexes
        : this.pageIndexes.slice(this.startIdx, this.endIdx);
    },
    paginationMessage() {
      return this.a11y.paginationMessage ?? "Перейти на ${index} страницу";
    },
  },
  methods: {
    updatesPage(idx) {
      if (this.disabled) return;

      this.$emit("update:page", idx);
    },
  },
};
</script>

<style lang="scss">
.pagination {
  &__item {
    position: relative;
    display: inline-block;
    border: rem(1) solid var(--color-black);
    padding: rem(7.5) 1rem;
    color: var(--color-black);
    transition-property: background, color;
    transition-duration: var(--transition-duration);

    &::before {
      content: "";
      position: absolute;
      bottom: rem(-8);
      left: 50%;
      border-radius: 100%;
      width: rem(6);
      height: rem(6);
      background-color: var(--color-black);
      transform: translate(-50%, 100%);
      opacity: 0;
      transition: opacity var(--transition-duration);
    }

    &.active {
      background-color: var(--color-black);
      color: var(--color-white);

      &::before {
        opacity: 1;
      }
    }

    @include mouse-device {
      &:hover,
      &:focus {
        background-color: var(--color-black);
        color: var(--color-white);
      }
    }

    @include touch-device {
      &:active {
        background-color: var(--color-black);
        color: var(--color-white);
      }
    }
  }
}
</style>
