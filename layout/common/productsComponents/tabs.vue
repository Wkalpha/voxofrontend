<template>
  <div class="col-12">
    <div class="cloth-review">
      <nav>
        <div class="nav nav-tabs" id="nav-tab">
          <button class="nav-link" :class="tabActive['description'] ? 'active' : ''" id="nav-home-tab" type="button"
            @click="setActive('description')">
            Description
          </button>
        </div>
      </nav>

      <div class="tab-content" id="nav-tabContent">
        <transition>
          <div class="tab-pane show active" id="desc" v-if="tabActive['description']">
            <div class="shipping-chart">
              <div class="part">
                <p class="font-light">
                  {{product.description}}
                </p>
              </div>
            </div>
          </div>
        </transition>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    product: {
      type: Object,
      required: true
    }
  },
  data() {
    return {
      tabActive: { description: true },
    };
  },
  methods: {
    setActive(tab) {
      this.tabActive = {};
      this.tabActive[tab] = true;
    },
  },
};
</script>

<style scoped>
.v-enter-active,
.v-leave-active {
  transition: all 0.5s ease;
}

.v-enter-from,
.v-leave-to {
  opacity: 0;
}
</style>
