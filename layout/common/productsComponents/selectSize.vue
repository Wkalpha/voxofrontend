<template>
  <div id="selectSize" class="addeffect-section product-description border-product"
    :class="submited && selectedSize === '' ? 'cartMove' : ''">
    <h6 class="product-title product-title-2 d-block">quantity</h6>

    <div class="qty-box">
      <div class="input-group">
        <span class="input-group-prepend">
          <button type="button" class="btn quantity-left-minus" data-type="minus" data-field=""
            @click="changeQuantityTo(productQuantity - 1)">
            <i class="fas fa-minus"></i>
          </button>
        </span>
        <input type="text" name="quantity" class="form-control input-number" v-model="productQuantity" />
        <span class="input-group-prepend">
          <button type="button" class="btn quantity-right-plus" data-type="plus" data-field=""
            @click="changeQuantityTo(productQuantity + 1)">
            <i class="fas fa-plus"></i>
          </button>
        </span>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  props: ["product", "submited"],
  data() {
    return {
      selectedSize: "",
      productQuantity: 1,
    };
  },
  methods: {
    changeQuantityTo(quantity) {
      if (quantity <= this.product.inStock && quantity > 0) {
        this.$emit("changeQuantityTo", quantity);
        this.productQuantity = quantity;
      }
    },
    showSizeChart() {
      useClickStore().toggleSizeChart()
    },
    selectSize(size) {
      this.selectedSize = size;
      this.$emit("setSelectedSize", this.selectedSize);
      
    },
  },
  mounted() {
    this.productQuantity = this.product.quantity ? this.product.quantity : 1;
  },
};
</script>
