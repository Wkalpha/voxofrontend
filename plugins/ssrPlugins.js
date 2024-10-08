import { defineNuxtPlugin } from '#app';
import {
    Swiper,
    SwiperSlide
} from "swiper/vue";
import 'swiper/css';
import 'swiper/css/bundle';

export default defineNuxtPlugin(nuxtApp => {
    nuxtApp.vueApp.component('Swiper',Swiper)
    nuxtApp.vueApp.component('SwiperSlide',SwiperSlide)
})  