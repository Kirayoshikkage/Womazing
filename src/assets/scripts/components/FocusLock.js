/* eslint-disable class-methods-use-this */
export default class FocusLock {
  constructor({
    exception = false, container = 'body', mutationObserver = false, disableOnMobileDevice = false,
  } = {}) {
    this.exception = exception;
    this.container = container;
    this.mutationObserver = mutationObserver;
    this.disableOnMobileDevice = disableOnMobileDevice;
  }

  listElementsToBlock = new Set();

  listChecksToBlock = [
    this.checkingForFocus,
    this.checkingForException.bind(this),
  ];

  isBlockFocus = false;

  linkOnMutationObserver;

  listHandlesMutationObserver = {
    childList: this.handlesMutationChildList,
    attributes: this.handlesMutationAttributes,
  };

  mutationAttributesFlag = false;

  init() {
    if (this.disableOnMobileDevice && this.userDeviceIsPhone()) {
      return;
    }

    this.throwsErrors();

    setTimeout(() => {
      this.populatesTheListElementsToBlock(
        document.querySelectorAll(`${this.container} *`),
      );
    }, 0);

    this.addsMutationObserver();
  }

  userDeviceIsPhone() {
    return /Android|webOS|iPhone|iPad|iPod|BlackBerry|BB|PlayBook|IEMobile|Windows Phone|Kindle|Silk|Opera Mini/i
      .test(navigator.userAgent);
  }

  throwsErrors() {
    if (
      this.exception
      && !Array.isArray(this.exception)
      && typeof this.exception !== 'string'
    ) {
      throw new Error('Exception wrong type');
    }

    if (this.container && typeof this.container !== 'string') {
      throw new Error('Container wrong type');
    }
  }

  populatesTheListElementsToBlock(listElements) {
    listElements.forEach((element) => {
      if (this.checksOneElement(element)) {
        this.addsElementToBlockList(element);
      }
    });
  }

  addsElementToBlockList(element) {
    this.listElementsToBlock.add(element);

    if (this.isBlockFocus) {
      this.blocksFocusElement(element);
    }
  }

  checksOneElement(element) {
    return this.listChecksToBlock.every((func) => func(element));
  }

  checkingForFocus(element) {
    return element.tabIndex === 0;
  }

  checkingForException(element) {
    if (!this.exception) {
      return true;
    }

    if (!Array.isArray(this.exception)) {
      return !element.closest(this.exception);
    }

    // eslint-disable-next-line no-restricted-syntax
    for (const exception of this.exception) {
      if (element.closest(exception)) {
        return false;
      }
    }

    return true;
  }

  blocksFocusElement(element) {
    element?.setAttribute('tabindex', -1);
  }

  blocksFocus() {
    if (this.disableOnMobileDevice && this.userDeviceIsPhone()) return;

    this.listElementsToBlock.forEach((element) => {
      this.blocksFocusElement(element);
    });

    this.isBlockFocus = true;
    this.mutationAttributesFlag = true;
  }

  unblocksFocus() {
    if (this.disableOnMobileDevice && this.userDeviceIsPhone()) return;

    this.listElementsToBlock.forEach((element) => {
      this.unblocksFocusElement(element);
    });

    this.isBlockFocus = false;
    setTimeout(() => {
      this.mutationAttributesFlag = false;
    });
  }

  unblocksFocusElement(element) {
    element?.setAttribute('tabindex', 0);
  }

  addsMutationObserver() {
    if (!this.mutationObserver) return;

    this.linkOnMutationObserver = new MutationObserver(
      this.handlesMutationObserver.bind(this),
    );

    this.linkOnMutationObserver.observe(document.querySelector(this.container), {
      childList: true,
      subtree: true,
      characterData: false,
      attributes: true,
      attributeFilter: ['tabindex'],
    });
  }

  handlesMutationObserver(listMutation) {
    listMutation.forEach((mutation) => {
      const { type } = mutation;

      this.listHandlesMutationObserver[type].call(this, mutation);
    });
  }

  handlesMutationChildList(mutation) {
    const { addedNodes, removedNodes } = mutation;
    const filteredAddedNodes = this.filtersElementsFromNodes(addedNodes);
    const filteredRemoveNodes = this.filtersElementsFromNodes(removedNodes);

    this.populatesTheListElementsToBlock(filteredAddedNodes);

    this.removesElementsFromBlockList(filteredRemoveNodes);
  }

  filtersElementsFromNodes(nodes) {
    return Array.from(nodes).filter((node) => node.nodeType === 1);
  }

  removesElementsFromBlockList(listElements) {
    listElements.forEach((element) => this.removesElementFromBlockList(element));
  }

  removesElementFromBlockList(element) {
    this.listElementsToBlock.delete(element);

    if (this.isBlockFocus) {
      this.unblocksFocusElement(element);
    }
  }

  handlesMutationAttributes(mutation) {
    if (this.mutationAttributesFlag) return;

    const { target } = mutation;

    if (this.checksOneElement(target)) {
      this.addsElementToBlockList(target);

      return;
    }

    this.removesElementFromBlockList(target);
  }

  disconnectsMutationObserver() {
    this.linkOnMutationObserver.disconnect();
  }
}
