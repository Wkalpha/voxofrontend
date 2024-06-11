<template>
  <div class="col-md-6" :class="rightSectionClasses ? rightSectionClasses : ''">
    <div class="cloth-details-size">
      <!-- <productCount /> -->

      <div class="details-image-concept">
        <h2>{{ currentProduct.name }}</h2>
      </div>

      <selectSize :product="currentProduct" :submited="submited" @changeQuantityTo="changeQuantityTo"/>

      <div class="product-buttons">
        <a href="javascript:void(0)" @click="addToCart(currentProduct)" id="cartEffect"
          class="btn btn-solid hover-solid btn-animation">
          <i class="fa fa-shopping-cart" v-if="!addedToCart"></i>
          <span>{{
            addedToCart? useRuntimeConfig().public.const.AddedToBag : useRuntimeConfig().public.const.Addtocart
          }}</span>
        </a>
      </div>

      <slot></slot>
    </div>
  </div>
</template>

<script>
import selectColors from "./selectColors.vue";
import selectSize from "./selectSize.vue";
import productCount from "./productCount.vue";
import timer from "./timer.vue";
import shareIt from "./shareIt.vue";
import { useCartStore } from "~~/store/cart";
import { useLayout } from "~~/store/layout";
import { useClickStore } from "~~/store/clickEvents";
import { useProductStore } from "~~/store/products";

export default {
  components: {
    shareIt,
    productCount,
    selectColors,
    selectSize,
    timer,
  },
  props: ["rightSectionClasses", "product"],
  data() {
    return {
      currentProduct: {},
      quantity: 1,
      selectedSize: "",
      submited: false,
      validEntries: false,
      addedToCart: false,
    };
  },
  watch: {
    cartItems(item) {
      if (this.inCartProductIds.includes(this.product?.id))
        this.addedToCart = true;
    },
  },
  computed: {
    inCartProductIds() {
      return useCartStore().inCartProductIds
    },
    cartItems() {
      return useCartStore().getCartItems;

    },
    selectedCurrencySymbol() {
      return useLayout().selectedCurrencySymbol
    },
  },
  methods: {
    async addToCart(product) {
      this.submited = true;
      var item = { product: product, quantity: this.quantity };

      await useCartStore().fetchAllProducts();
      // await useClickStore().fetchProducts();

      useCartStore().addToCart(item)
      useClickStore().changeProductId(product.id)
      
      useClickStore().toggleSuccessfulModal({
        image: product.images[0].src,
        message: "已加入購物車",
        link: useRuntimeConfig().public.const.cartPagePath,
      })
    },
    changeQuantityTo(quantity) {
      this.quantity = quantity;
    },
  },
  created() {
    if (this.product === undefined)
      this.currentProduct = useProductStore().data[0]
    else this.currentProduct = this.product;

    let indexOfProductInCart = this.inCartProductIds.indexOf(
      this.currentProduct.id
    );
    if (indexOfProductInCart > -1) {
      this.currentProduct = this.cartItems[indexOfProductInCart];
    }
    if (this.inCartProductIds.includes(this.currentProduct.id))
      this.addedToCart = true;
  },
};
</script>
