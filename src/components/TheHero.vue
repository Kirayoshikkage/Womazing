<template>
  <section class="hero">
    <div class="container">
      <LeadTitle>
        <slot name="title"></slot>
      </LeadTitle>
      <BaseCrumbs :crumbs="crumbs" />
    </div>
  </section>
</template>

<script>
import LeadTitle from "./LeadTitle.vue";
import BaseCrumbs from "./BaseCrumbs.vue";

export default {
  components: {
    LeadTitle,
    BaseCrumbs,
  },
  props: {
    crumbs: {
      type: Array,
      default() {
        return [];
      },
    },
  },
};
</script>

<style lang="scss">
.hero {
  padding: rem(64) 0;

  @include medium {
    padding: rem(32) 0;
  }

  @include x-small {
    padding: rem(24) 0;
  }

  .lead {
    margin: 0 0 rem(26);

    @include x-small {
      margin: 0 0 1rem;
    }
  }

  .crumbs {
    display: flex;
    flex-wrap: wrap;
    row-gap: rem(26);
  }
}
</style>
