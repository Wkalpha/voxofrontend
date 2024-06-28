<template>
  <Head>
    <Title>鎮穩票券商城</Title>
  </Head>
  <layout1>
    <LazyHomeFashionOurCategory :categories="categories" :title="true" />
    <div class="section-b-space"></div>
  </layout1>
</template>

<script>
import layout1 from "~/layout/layouts/layout1.vue";
import { useLayout } from "~~/store/layout";
import { useClickStore } from "~~/store/clickEvents";
import axios from 'axios';

export default {
  components: {
    layout1,
  },

  data() {
    return {
      values: [1, 2, 3, 4, 5],
      themeCss: "/demo2.css",
      categories: [], // 定義 categories 變量
    };
  },
  methods: {
    async fetchProducts() {
      try {
        const response = await axios.get(`${useRuntimeConfig().public.apiUrl}/Product/getAllCategory`);
        if (Array.isArray(response.data)) {
          this.categories = response.data; // 假設返回的是產品數組
        } else {
          console.error('Unexpected response format:', response.data);
        }
      } catch (error) {
        console.error('Failed to fetch products:', error);
        this.categories = []; // 確保在無法獲取數據時清空數據
      }
    },
  },
  head() {
    return {
      title: "Fashion Store",
      htmlAttrs: {
        dir: "ltr",
      },
      link: [{ rel: "icon", type: "image/x-icon", href: "2.png" }],
    };
  },
  mounted() {
    useLayout().setPrimaryColor({ primaryColor: "#e22454" });
    this.fetchProducts();
  },
  created() {
    useClickStore().toggleNewsLetterModal
    let layoutMode = useCookie("layoutType").value || "light";
    if (layoutMode === "dark") this.themeCss = "/css/demo2_dark.css";
    else this.themeCss = "/css/demo2.css";
  },
  beforeUnmount() {
    document
      .getElementById("bootstrap-link")
      .setAttribute("href", "/css/bootstrap.min.css");
  },
};
</script>

<style lang="scss">
@import "~/assets/scss/demo2.scss";
</style>
