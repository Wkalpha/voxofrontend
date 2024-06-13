import liff from '@line/liff';
import {useUserDashboardStore} from "@/store/userDashboard"
import axios from 'axios';

export default defineNuxtPlugin(async (nuxtApp) => {
  const liffId = '2005595080-kRrvbdeB'; // 替換為你的 LIFF ID

  try {
    console.log('Initializing LIFF');
    await liff.init({ liffId });
    console.log('LIFF ok');
    nuxtApp.provide('liff', liff);
    if (liff.isLoggedIn()) {
      const profile = await liff.getProfile();
      const idToken = await liff.getDecodedIDToken(); // 裡面有email

      // 使用 axios 發送請求到後端
      try {
        const response = await axios.post(`${useRuntimeConfig().public.const.apiUrl}/User/findUser`, {
          email: idToken.email
        });

        if (response.data.email) {
          console.log('User exists');
          useUserDashboardStore().setUser({email:response.data.email,isLoggedIn:true})
        } else {
          console.log('User does not exist');
          const response = await axios.post(`${useRuntimeConfig().public.const.apiUrl}/User/lineCreate`, {
              oauthProvider : 'line',
              oauthId : profile.userId,
              email : idToken.email,
            })
          useUserDashboardStore().setUser({email:response.data.email,isLoggedIn:true})
        }
      } catch (error) {
        console.error('Error checking user', error);
      }
    }
  } catch (error) {
    console.error('LIFF initialization failed', error);
  }
});
