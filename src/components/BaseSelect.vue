<template>
  <template v-if="itemsIsEmpty">
    <div class="select">
      <BaseBtn class="button_hollow-gothic select__trigger" disabled>
        <span class="select__title">{{ title }}</span>
      </BaseBtn>
    </div>
  </template>
  <template v-else>
    <div ref="select" class="select">
      <BaseBtn
        ref="trigger"
        aria-haspopup="true"
        :aria-expanded="isOpen"
        class="button_hollow-gothic select__trigger"
        @pointerup="toggle"
        @keydown.enter="toggle"
        @keydown.space="toggle"
        @keydown.down.prevent="pagedownHandlerOnTrigger"
      >
        <span class="select__title">{{ title }}</span>
        <SelectIcon aria-hidden="true" class="select__icon" />
      </BaseBtn>
      <div
        class="select__content"
        :class="visibilityClass"
        tabindex="-1"
        role="listbox"
        :aria-multiselectable="multiple"
        @keydown.esc="escapeHandlerOnContent"
        @keydown.down.prevent="increasesFocusIndex"
        @keydown.up.prevent="decreasesFocusIndex"
      >
        <button
          v-for="item of items"
          ref="items"
          :key="item"
          role="option"
          class="select__item"
          :class="{ select__item_selected: isSelected(item) }"
          :aria-selected="isSelected(item)"
          tabindex="-1"
          @pointerup="makesElementChosen(item)"
          @keydown.enter="makesElementChosen(item)"
        >
          {{ item }}
        </button>
      </div>
    </div>
  </template>
</template>

<script>
import BaseBtn from "./BaseBtn.vue";
import SelectIcon from "./icons/SelectIcon.vue";

export default {
  components: {
    SelectIcon,
    BaseBtn,
  },
  props: {
    value: {
      type: Array,
      required: true,
      default() {
        return [];
      },
    },
    items: {
      type: Array,
      required: true,
      default() {
        return [];
      },
    },
    title: {
      type: String,
      default: "Выберите значение",
    },
    multiple: {
      type: Boolean,
      default: false,
    },
  },
  emits: {
    "update:value": null,
  },
  data() {
    return {
      isOpen: false,
      focusIndex: 0,
    };
  },
  computed: {
    visibilityClass() {
      return [this.isOpen ? "visible" : "hidden"];
    },
    itemsIsEmpty() {
      return !this.items.length;
    },
  },
  watch: {
    focusIndex() {
      this.setsFocusToItem();
    },
  },
  mounted() {
    window.addEventListener("pointerup", this.closesSelectOnClickOutside);
  },
  beforeUnmount() {
    window.removeEventListener("pointerup", this.closesSelectOnClickOutside);
  },
  methods: {
    open() {
      this.isOpen = true;
    },
    close() {
      this.isOpen = false;
    },
    toggle() {
      if (this.isOpen) {
        this.close();

        return;
      }

      this.open();
    },
    closesSelectOnClickOutside({ target }) {
      const targetIsNotCurrentSelect =
        target.closest(".select") !== this.$refs.select;

      if (targetIsNotCurrentSelect && this.isOpen) {
        this.close();
      }
    },
    escapeHandlerOnContent() {
      this.close();

      this.setsFocusOnTrigger();
    },
    setsFocusOnTrigger() {
      this.$refs.trigger.$el.focus();
    },
    pagedownHandlerOnTrigger() {
      if (!this.isOpen) return;

      this.setsFocusToItem();
    },
    setsFocusToItem() {
      this.$refs.items[this.focusIndex].focus();
    },
    increasesFocusIndex() {
      if (this.focusIndex === this.items.length - 1) {
        this.focusIndex = 0;

        return;
      }

      this.focusIndex += 1;
    },
    decreasesFocusIndex() {
      if (this.focusIndex === 0) {
        this.focusIndex = this.items.length - 1;

        return;
      }

      this.focusIndex -= 1;
    },
    makesElementChosen(item) {
      if (this.value.includes(item)) {
        this.updatesValue(this.value.filter((i) => i !== item));

        return;
      }

      this.updatesValue(this.multiple ? [...this.value, item] : [item]);
    },
    updatesValue(value) {
      this.$emit("update:value", value);
    },
    isSelected(item) {
      return this.value.includes(item);
    },
    resetValue(item = null) {
      if (!item) {
        this.updatesValue([]);

        return;
      }

      this.updatesValue(this.value.filter((i) => i !== item));
    },
  },
};
</script>

<style lang="scss">
.select {
  &__trigger {
    display: flex;
    align-items: center;
    justify-content: space-between;
    gap: 3rem;
    width: 100%;
    padding: 1rem 1.5rem;

    @include mouse-device {
      &:hover,
      &:focus {
        .select__icon {
          fill: var(--color-white);
        }
      }
    }

    @include touch-device {
      &:active {
        .select__icon {
          fill: var(--color-white);
        }
      }
    }
  }

  &__trigger[aria-expanded="true"] {
    .select__icon {
      transform: rotate(180deg);
    }
  }

  &__title {
    overflow: hidden;
    white-space: nowrap;
    text-overflow: ellipsis;
  }

  &__icon {
    flex-shrink: 0;
    transition-property: transform, fill;
    transition-duration: var(--transition-duration);
  }

  &__content {
    background-color: var(--color-ecru);
    transition-property: opacity, visibility;
    transition-duration: 0.2s;

    &.visible {
      visibility: visible;
      opacity: 1;
    }

    &.hidden {
      visibility: hidden;
      opacity: 0;
    }
  }

  &__item {
    position: relative;
    padding: 1rem 1.5rem;
    width: 100%;
    text-align: start;
    font-size: rem(14);
    letter-spacing: 0.02em;
    color: var(--color-gothic);
    transition-property: color, background;
    transition-duration: var(--transition-duration);

    &::before {
      content: "";
      position: absolute;
      top: 50%;
      left: 0.5rem;
      width: rem(5);
      height: rem(5);
      border-radius: 50%;
      background-color: var(--color-gothic);
      transform: translateY(-75%);
      opacity: 0;
      transition-property: opacity, background;
      transition-duration: var(--transition-duration);
    }

    &_selected::before {
      opacity: 1;
    }

    @include mouse-device {
      &:hover,
      &:focus {
        background-color: var(--color-gothic);
        color: var(--color-white);

        &::before {
          background-color: var(--color-white);
        }
      }
    }

    @include touch-device {
      &:active {
        background-color: var(--color-gothic);
        color: var(--color-white);

        &::before {
          background-color: var(--color-white);
        }
      }
    }
  }
}
</style>
