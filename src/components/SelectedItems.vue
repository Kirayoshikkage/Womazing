<template>
  <div class="selected-items">
    <div
      v-show="itemsIsNotEmpty"
      class="selected-items__wrapper selected-items__wrapper_list"
    >
      <h3 class="visually-hidden">
        <slot name="title"> Выбранные элементы </slot>
      </h3>
      <ul class="selected-items__list">
        <li v-for="(item, idx) of items" :key="item">
          <BaseBtn
            ref="items"
            class="selected-items__item button_filled"
            @pointerup="itemDeletionHandler(item, idx)"
            @keydown.enter="itemDeletionHandler(item, idx)"
            @keydown.space.prevent="itemDeletionHandler(item, idx)"
          >
            {{ item }}
            <CloseIcon aria-label="Сбросить" />
          </BaseBtn>
        </li>
      </ul>
      <BaseBtn
        class="selected-items__del-all button_filled"
        @pointerup="handlerDeletionAll"
        @keydown.enter="handlerDeletionAll"
        @keydown.space.prevent="handlerDeletionAll"
      >
        <CloseIcon aria-label="Сбросить всё" />
      </BaseBtn>
    </div>
    <div v-show="!itemsIsNotEmpty" class="selected-items__wrapper">
      <BaseSubtitle class="selected-items__text-stub">
        <slot name="text-stub">Элементы не выбраны</slot>
      </BaseSubtitle>
    </div>
  </div>
</template>

<script>
import BaseBtn from "./BaseBtn.vue";
import CloseIcon from "./icons/CloseIcon.vue";
import BaseSubtitle from "./BaseSubtitle.vue";

export default {
  components: {
    BaseBtn,
    CloseIcon,
    BaseSubtitle,
  },
  props: {
    items: {
      type: Array,
      required: true,
      default() {
        return [];
      },
    },
  },
  emits: {
    "deleting-all": null,
    "deleting-item": null,
  },
  computed: {
    itemsIsNotEmpty() {
      return this.items.length;
    },
  },
  methods: {
    itemDeletionHandler(item, idx) {
      this.$emit("deleting-item", item);

      this.$nextTick().then(() => {
        this.normalizesFocusAfterItemDeletion(idx);
      });
    },
    normalizesFocusAfterItemDeletion(idx) {
      if (!this.items.length) return;

      const normalizedIdx = idx !== this.items.length ? idx : idx - 1;

      this.$refs.items[normalizedIdx].$el.focus();
    },
    handlerDeletionAll() {
      this.$emit("deleting-all");
    },
  },
};
</script>

<style lang="scss">
.selected-items {
  &__wrapper_list {
    display: flex;
    align-items: flex-start;
    justify-content: space-between;
    gap: 2rem;
  }

  &__list {
    display: flex;
    gap: 1rem;
    overflow-x: auto;
    padding-bottom: 1rem;
  }

  .button {
    padding: 0.5rem 1rem;
  }

  &__item {
    display: flex;
    white-space: nowrap;
    align-items: center;
    gap: 1rem;
  }

  .close-icon {
    stroke: var(--color-white);
  }

  &__text-stub {
    align-self: center;
  }
}
</style>
