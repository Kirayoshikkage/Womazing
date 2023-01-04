<template>
  <div class="load-status-handler" :class="hidingClass">
    <BasePreloader ref="preloader" />
    <TryAgain ref="tryAgain" @attempt="attemptHandler" />
  </div>
</template>

<script>
import BasePreloader from "./BasePreloader.vue";
import TryAgain from "./TryAgain.vue";

export default {
  components: {
    BasePreloader,
    TryAgain,
  },
  emits: {
    attempt: null,
    "status-change": null,
  },
  data() {
    return {
      status: "fulfilled",
      statusHandlers: {
        pending: this.pendingStatusHandler,
        fulfilled: this.fulfilledStatusHandler,
        rejected: this.rejectedStatusHandler,
      },
    };
  },
  computed: {
    hidingClass() {
      return {
        hide: this.status === "fulfilled",
      };
    },
  },
  watch: {
    status() {
      this.callsTheStatusHandler();

      this.$emit("status-change", this.status);
    },
  },
  methods: {
    setsPendingStatus() {
      this.status = "pending";
    },
    setsFulfilledStatus() {
      this.status = "fulfilled";
    },
    setsRejectedStatus() {
      this.status = "rejected";
    },
    callsTheStatusHandler() {
      const statusHandler = this.statusHandlers[this.status];

      statusHandler();
    },
    pendingStatusHandler() {
      this.$refs.preloader.showPreloader();

      this.$refs.tryAgain.hideTryAgain();
    },
    fulfilledStatusHandler() {
      this.$refs.preloader.hidePreloader();

      this.$refs.tryAgain.hideTryAgain();
    },
    rejectedStatusHandler() {
      this.$refs.tryAgain.showTryAgain();

      this.$refs.preloader.hidePreloader();
    },
    attemptHandler() {
      this.$emit("attempt");
    },
  },
};
</script>

<style lang="scss">
.load-status-handler {
  position: absolute;
  top: 0;
  right: 0;
  bottom: 0;
  left: 0;
  display: flex;
  align-items: center;
  justify-content: center;
  background-color: rgba(110, 156, 159, 0.8);
  transition-property: opacity, visibility;
  transition-duration: var(--transition-duration);

  &.hide {
    visibility: hidden;
    opacity: 0;
  }

  .preloader,
  .try-again {
    position: absolute;
  }
}
</style>
