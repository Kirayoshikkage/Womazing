<template>
  <section class="catalog-filters">
    <div class="container">
      <LoadStatusHandler
        ref="loadStatusHandler"
        @status-change="loadStatusChangeHandler"
        @attempt="attemptHandler"
      />
      <div class="catalog-filters__content" :inert="contentIsLock">
        <BaseTitle>Фильтры:</BaseTitle>
        <div class="catalog-filters__filters">
          <BaseSelect
            ref="category"
            v-model:value="filters.category"
            class="select-category"
            title="Категория"
            :items="valuesForFilters.category"
          />
          <BaseSelect
            ref="colors"
            v-model:value="filters.colors"
            class="select-color"
            title="Цвет"
            :items="valuesForFilters.colors"
            :multiple="true"
          />
          <BaseBtn
            class="button_filled"
            @pointerup="applyingFiltersHandler"
            @keydown.enter="applyingFiltersHandler"
            @keydown.space="applyingFiltersHandler"
          >
            Применить
          </BaseBtn>
        </div>
        <SelectedItems
          :items="listFiltersValue"
          @deleting-item="itemDeletionHandler"
          @deleting-all="handlerDeletionAll"
        >
          <template #title> Выбранные фильтры </template>
          <template #text-stub> Фильтры не выбраны </template>
        </SelectedItems>
      </div>
    </div>
  </section>
</template>

<script>
import { getValuesForFilters } from "../Api.js";

import LoadStatusHandler from "./LoadStatusHandler.vue";
import BaseTitle from "./BaseTitle.vue";
import BaseSelect from "./BaseSelect.vue";
import BaseBtn from "./BaseBtn.vue";
import SelectedItems from "./SelectedItems.vue";

export default {
  components: {
    LoadStatusHandler,
    BaseTitle,
    BaseSelect,
    BaseBtn,
    SelectedItems,
  },
  emits: {
    "applying-filters": null,
  },
  data() {
    return {
      filters: {
        category: [],
        colors: [],
      },
      valuesForFilters: {},
      contentIsLock: false,
    };
  },
  computed: {
    validatedFilters() {
      return Object.fromEntries(
        Object.entries(this.filters).filter(([, value]) => {
          const valueIsEmpty = !value || !Object.keys(value).length;

          return !valueIsEmpty;
        })
      );
    },
    listFiltersValue() {
      return Object.values(this.filters).flat();
    },
  },
  mounted() {
    this.setsValuesForFilters();
  },
  methods: {
    setsValuesForFilters() {
      this.$refs.loadStatusHandler.setsPendingStatus();

      getValuesForFilters()
        .then((data) => {
          if (!Object.keys(data).length) {
            this.$refs.loadStatusHandler.setsRejectedStatus();

            return;
          }

          this.valuesForFilters = data;

          this.$refs.loadStatusHandler.setsFulfilledStatus();
        })
        .catch(() => {
          this.$refs.loadStatusHandler.setsRejectedStatus();
        });
    },
    applyingFiltersHandler() {
      this.$emit("applying-filters", this.validatedFilters);
    },
    attemptHandler() {
      this.setsValuesForFilters();
    },
    loadStatusChangeHandler(status) {
      this.contentIsLock = status !== "fulfilled";
    },
    itemDeletionHandler(item) {
      for (let key in this.filters) {
        if (!this.valuesForFilters[key]?.includes(item)) {
          continue;
        }

        this.$refs[key].resetValue(item);
      }
    },
    handlerDeletionAll() {
      for (let key in this.filters) {
        this.$refs[key].resetValue();
      }
    },
  },
};
</script>

<style lang="scss">
.catalog-filters {
  padding: 2rem 0;

  .container {
    position: relative;
  }

  .load-status-handler {
    z-index: 10;
  }

  .title {
    margin: 0 0 2rem;
  }

  &__filters {
    display: flex;
    flex-wrap: wrap;
    gap: 2rem;
    margin: 0 0 2rem;

    .button {
      padding: 1rem 1.5rem;
    }
  }

  &__filters > * {
    flex: 1 1 calc(33.33% - 2rem);
    min-width: rem(210);
  }

  .select {
    position: relative;

    &__content {
      position: absolute;
      width: 100%;
      max-height: rem(192);
      overflow-y: scroll;
    }
  }

  .select-category {
    z-index: 2;
  }

  .select-color {
    z-index: 1;
  }

  .selected-items {
    min-height: rem(58);
  }

  @include small {
    padding: 1rem 0;
  }
}
</style>
