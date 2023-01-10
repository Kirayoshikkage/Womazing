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
import {
  pushesQueryParameters,
  getsQueryParams,
  deletesQueryParams,
} from "@/assets/scripts/helpers/queryParameters";
import isEqual from "@/assets/scripts/helpers/isEqual";

import LoadStatusHandler from "./LoadStatusHandler.vue";
import BaseTitle from "./BaseTitle.vue";
import BaseSelect from "./BaseSelect.vue";
import SelectedItems from "./SelectedItems.vue";

export default {
  components: {
    LoadStatusHandler,
    BaseTitle,
    BaseSelect,
    SelectedItems,
  },
  emits: {
    "changing-filters": null,
  },
  data() {
    return {
      filters: {
        category: [],
        colors: [],
      },
      valuesForFilters: {},
      contentIsLock: false,
      nameQueryParam: "filters",
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
  watch: {
    filters: {
      handler() {
        this.filterChangeHandler();

        this.savesFiltersInQueryParams();
      },
      deep: true,
    },
  },
  mounted() {
    this.setsFiltersByQueryParams();

    this.setsValuesForFilters();

    window.addEventListener("popstate", this.setsFiltersByQueryParams);
  },
  beforeUnmount() {
    window.removeEventListener("popstate", this.setsFiltersByQueryParams);
  },
  methods: {
    filterChangeHandler() {
      this.$emit("changing-filters", this.validatedFilters);
    },
    savesFiltersInQueryParams() {
      let validatedFiltersFromQueryParams =
        this.validatesFiltersFromQueryParams(
          getsQueryParams(this.nameQueryParam) ?? {}
        );

      if (isEqual(validatedFiltersFromQueryParams, this.validatedFilters)) {
        return;
      }

      if (Object.keys(this.validatedFilters).length) {
        pushesQueryParameters(this.nameQueryParam, this.validatedFilters);

        return;
      }

      deletesQueryParams(this.nameQueryParam);
    },
    validatesFiltersFromQueryParams(filtersFromQueryParams) {
      return Object.fromEntries(
        Object.entries(filtersFromQueryParams).filter(([key, value]) => {
          const keyIsNotThirdParty = Object.prototype.hasOwnProperty.call(
            this.filters,
            key
          );
          const valueIsNotThirdParty =
            Object.prototype.toString.call(this.filters[key]) ===
            Object.prototype.toString.call(value);

          return keyIsNotThirdParty && valueIsNotThirdParty;
        })
      );
    },
    setsFiltersByQueryParams() {
      try {
        let validatedFiltersFromQueryParams =
          this.validatesFiltersFromQueryParams(
            getsQueryParams(this.nameQueryParam) ?? {}
          );

        if (!Object.keys(validatedFiltersFromQueryParams).length) {
          deletesQueryParams(this.nameQueryParam);

          return;
        }

        for (let key in this.filters) {
          if (
            Object.prototype.hasOwnProperty.call(
              validatedFiltersFromQueryParams,
              key
            )
          ) {
            this.filters[key] = validatedFiltersFromQueryParams[key];

            continue;
          }

          this.$refs[key].resetValue();
        }
      } catch (err) {
        deletesQueryParams(this.nameQueryParam);
      }
    },
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
