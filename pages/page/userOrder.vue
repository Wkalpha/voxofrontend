<template>
  <Head>
    <Title>訂單</Title>
  </Head>
  <header1 :iconBgColor="iconBgColor" />
  <div>
    <h2>我的訂單</h2>
    <ul>
      <li v-for="order in orders" :key="order.orderId">
        <div>訂單編號: {{ order.orderId }}</div>
        <div>訂單日期: {{ order.orderDate }}</div>
        <div>總金額: {{ order.totalAmount }}</div>
        <div>狀態: {{ order.orderStatus }}</div>
        <div>寄送地址: {{ order.shippingAddress }}</div>
        <div>付款方式: {{ order.paymentMethod }}</div>
        <div>備註: {{ order.orderNotes }}</div>
        <hr>
      </li>
    </ul>
    <div v-if="orders.length === 0">目前沒有訂單資料。</div>
  </div>
  <footer1>
      <footerRight1 :formControlColor="formControlColor" />
    </footer1>
</template>

<script>
import header1 from "~/layout/common/headers/header1.vue";
import footer1 from "~/layout/common/footers/footer1.vue";
import footerRight1 from "~/layout/elements/footerElements/footerRight1.vue";
import { useLayout } from "~~/store/layout";
import { useClickStore } from "~~/store/clickEvents";
import axios from 'axios';
import { useRoute } from 'vue-router';
import { useUserDashboardStore } from "~~/store/userDashboard";

export default {
  props: ["iconBgColor", "formControlColor"],
  components: {
    header1,
    footer1,
    footerRight1
  },
  data() {
    return {
      values: [1, 2, 3, 4, 5],
      themeCss: "/demo2.css",
      orders: [],
    };
  },
  methods: {
    async fetchUserOrder() {
      try {
        const response = await axios.post(
          `${useRuntimeConfig().public.apiUrl}/payment/queryOrderByUser`,
          {
            userId: 'U2024070100000001' // 將用戶 ID 作為 POST 請求的 body 傳遞
          }
        );
        if (Array.isArray(response.data)) {
          this.orders = response.data;
        } else {
          console.error('Unexpected response format:', response.data);
        }
      } catch (error) {
        console.error('Failed to fetch products:', error);
        this.orders = []; // 確保在無法獲取數據時清空數據
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
    this.fetchUserOrder();
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
@import "@/assets/scss/demo2.scss";
</style>