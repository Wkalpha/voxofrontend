<template>
  <section class="section-b-space">
    <div class="container">
      <div class="row">
        <div class="col-lg-12 col-12 ratio_30">
          <!-- filter button -->
          <div class="hide-button mb-3">
            <button class="danger-button danger-center btn btn-sm" @click.prevent="toggleFilterBar">
              <vue-feather type="align-left"></vue-feather>{{ useRuntimeConfig().public.const.Filter }}
            </button>
          </div>
          <!-- filter button -->
          <div class="row g-4">
            <!-- label and featured section -->
            <div class="col-12" v-if="filtersList.length != 0">
              <ul class="short-name">
                <li v-for="(filter, index) in filtersList" :key="index">
                  <div class="label-tag">
                    <span>{{ filter }}</span>
                    <button type="button" class="btn-close" aria-label="Close" @click="removeFilter(filter)"></button>
                  </div>
                </li>
                <li>
                  <div class="label-tag" v-if="filtersList.length != 0">
                    <a href="javascript:void(0)" @click.prevent="clearAllFilters"><span>Clear All</span></a>
                  </div>
                </li>
              </ul>
            </div>

            <options @changeCardLayout="changeCardLayout" @changeProductsPerPage="changeProductsPerPage" />
          </div>
          <!-- label and featured section -->

          <!-- Product section -->
          <div class="row g-sm-4 g-3 gx-sm-4 gx-3 mt-1 custom-gy-5 product-style-2 ratio_asos product-list-section"
            :class="[
              { 'row-cols-2': cardsLayout === 2 },
              { 'row-cols-md-3 row-cols-2': cardsLayout === 3 },
              { 'row-cols-lg-4 row-cols-md-3 row-cols-2': cardsLayout === 4 },
              { 'row-cols-xl-5 row-cols-lg-4 row-cols-md-3 row-cols-2': cardsLayout === 5 },
              { 'list-style': cardsLayout === 6 },
            ]">
            <div v-for="(product, index) in paginatedCards" :key="index">
              <productBox1 :product="product" />
            </div>
          </div>
          <!-- Product section -->

          <nav class="page-section">
            <ul class="pagination">
              <li class="page-item">
                <a href="javascript:void(0)" class="page-link" @click="changePage(currentPage - 1)">
                  <i class="fas fa-chevron-left"></i>
                </a>
              </li>
              <li class="page-item" v-for="i in pages" :key="i" :class="i === currentPage ? 'active' : ''">
                <a class="page-link" href="javascript:void(0)" @click.prevent="changePage(i)">{{ i }}</a>
              </li>
              <li class="page-item">
                <a href="javascript:void(0)" class="page-link" @click="changePage(currentPage + 1)">
                  <i class="fas fa-chevron-right"></i>
                </a>
              </li>
            </ul>
          </nav>
        </div>
      </div>
    </div>
  </section>
</template>

<script>
import axios from 'axios';
import VueFeather from 'vue-feather';
import productBox1 from '~/layout/elements/productBox/product-box1.vue';
import options from '~/layout/elements/shopSections/options1.vue';
import { mapState } from 'pinia';
import { useClickStore } from '~~/store/clickEvents';
import { usefilterStore } from '~~/store/filters';

export default {
  components: { VueFeather, productBox1, options },
  props: ['category'],
  data() {
    return {
      cardsLayout: 4,
      pages: [],
      cards: [],
      cardsToShow: 12,
      currentPage: 1,
      totalPages: 2,
    };
  },
  computed: {
    paginatedCards() {
      return this.cards.slice(
        this.cardsToShow * (this.currentPage - 1),
        this.cardsToShow * this.currentPage
      );
    },
    ...mapState(usefilterStore, {
      filtersList: 'filtersList',
      appliedFiltersList: 'appliedFilters',
    }),
  },
  watch: {
    initCards: function () {
      this.cards = this.initCards.filter(item => item.category !== 'vr');
    },
    cards: function () {
      this.totalPages = Math.ceil(this.cards.length / this.cardsToShow);
      this.changePage(1);
    },
  },
  methods: {
    changePage(toPage) {
      if (toPage > 0 && toPage <= this.totalPages) {
        this.currentPage = toPage;
        this.calculatePages();
      }
    },
    calculatePages() {
      this.pages = [];
      let startPage, endPage;
      if (this.currentPage === 1) {
        startPage = 1;
        endPage = 4;
      } else {
        startPage = this.currentPage - 1;
        endPage = this.currentPage + 2;
      }
      for (let i = startPage; i < endPage; i++) {
        if (i <= this.totalPages) {
          this.pages.push(i);
        }
      }
    },
    toggleFilterBar() {
      useClickStore().toggleShopFilterBar({ overlay: true });
    },
    removeFilter(title) {
      usefilterStore().removeFilter(title);
    },
    clearAllFilters() {
      usefilterStore().clearAllFilters();
    },
    changeCardLayout(toLayout) {
      this.cardsLayout = toLayout;
    },
    changeProductsPerPage(productsToShow) {
      this.cardsToShow = productsToShow;
      this.totalPages = Math.ceil(this.cards.length / this.cardsToShow);
      this.calculatePages();
    },
    async fetchProducts() {
      try {
        const response = await axios.get(`${useRuntimeConfig().public.const.apiUrl}/product/getAll`); // 根據實際情況調整URL
        if (Array.isArray(response.data)) {
          this.cards = response.data;
        } else {
          console.error('Unexpected response format:', response.data);
        }
      } catch (error) {
        console.error('Failed to fetch products:', error);
        this.cards = []; // 確保在無法獲取數據時清空數據
      }
    },
  },
  created() {
    usefilterStore().setCategory(this.category);
    this.fetchProducts(); // 從後端抓取資料
  },
  mounted() {
    this.totalCards = this.cards.length;
    this.totalPages = Math.ceil(this.totalCards / this.cardsToShow);
    this.calculatePages();
  },
};
</script>

<style lang="scss" scoped>
/* 你的樣式 */
</style>
