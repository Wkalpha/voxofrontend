<template>
  <section>
    <div class="container">
      <div class="row gx-4 gy-sm-5">
        <div class="col-12">
          <div class="details-items">
            <div class="row g-4">
              <productRightSection :product="product"/>
            </div>
          </div>
        </div>
        <tabs :product="product" />
      </div>
    </div>
  </section>
</template>
<script>
import productRightSection from "~/layout/common/productsComponents/productRightSection.vue";
import tabs from "~/layout/common/productsComponents/tabs.vue";

export default {
  components: {
    productRightSection,
    tabs,
  },
  props: {
    product: {
      type: Object,
      required: true
    }
  }
};
</script>