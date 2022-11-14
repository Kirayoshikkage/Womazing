<template>
  <a class="link" :href="href">
    <slot />
  </a>
</template>

<script>
export default {
  props: {
    href: {
      type: String,
      default: "#",
    },
  },
};
</script>

<style lang="scss">
@import "../assets/styles/mixins/button-styles";

.link {
  @include button-styles;
}
</style>
