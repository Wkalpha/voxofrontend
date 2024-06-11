// plugins/liff.js
import liff from '@line/liff';

export default defineNuxtPlugin((nuxtApp) => {
  const liffId = '2005595080-kRrvbdeB'; // 替換為你的 LIFF ID

  nuxtApp.provide('liffInit', async () => {
    try {
      await liff.init({ liffId });
      nuxtApp.provide('liff', liff);
    } catch (error) {
      console.error('LIFF initialization failed', error);
    }
  });
});
