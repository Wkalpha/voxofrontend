<template>
  <Head>
    <div v-if="product"><Title>{{ product.name }}</Title></div>
  </Head>
  <layout6 parent="Products" pageName="Product No Sidebar" :product="product">
    <ProductProductNoSidebarShopSection v-if="product" :product="product" />
    <div v-else>Loading...</div>
    <div class="section-b-space"></div>
  </layout6>
</template>

<script>
import layout6 from "~/layout/layouts/layout6.vue";
import axios from 'axios';
import { ref, onMounted } from 'vue';
import { useRoute } from 'vue-router';

export default {
  components: { layout6 },
  head() {
    return {
      title: "Product No Sidebar",
    };
  },
  setup() {
    const product = ref(null);
    const route = useRoute();

    const fetchProduct = async () => {
      try {
        const productId = route.params.id || 1;
        const response = await axios.get(`${useRuntimeConfig().public.apiUrl}/Product/getById?id=${productId}`);
        product.value = response.data;
      } catch (error) {
        console.error('Error fetching product:', error);
      }
    };

    onMounted(() => {
      fetchProduct();
    });

    return {
      product
    };
  }
};
</script>

<style lang="scss">
</style>
