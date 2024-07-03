<template>
  <section class="section-b-space">
    <div class="container">
      <div class="row g-4">
        <div class="col-lg-8">
          <h3 class="mb-3">寄送資訊</h3>
          <form class="needs-validation">
            <PageCheckoutTopForm ref="checkoutForm" @formSubmitted="order" />
            <hr class="my-lg-5 my-4" />
            <button class="btn btn-solid-default mt-4" type="button" @click.prevent="handleSubmitClick">
              結帳
            </button>
          </form>
        </div>

        <PageCheckoutYourCart :cartItems="cartItems" />
      </div>
    </div>
  </section>
</template>

<script setup>
import { storeToRefs } from "pinia";
import { useCartStore } from "~~/store/cart";
import Swal from "sweetalert2";
import axios from 'axios';
import { useUserDashboardStore } from "~~/store/userDashboard";

let props = defineProps({
  cartItems: Array
});

let saveUserInfo = ref(false), validInfo = ref(false), checkoutForm = ref(null), isLogin = ref(false), paymentMethod = ref('stripe'), userInfo = ref({}), user = ref({});
let { cartTotal } = storeToRefs(useCartStore());


function changePaymentMethod(method) {
  paymentMethod.value = method;
};

function handleSubmitClick() {
  checkoutForm.value.onSubmit()
}

function order(info) {
  isLogin.value = useCookie('user').value.isLoggedIn || false;
  userInfo.value = info;
  if (saveUserInfo.value) {
    useCartStore().saveUserInfo(userInfo.value)
  }
  if (isLogin.value) {
    // payWithStripe();
    payWithCreditCard();
  } else {
    useRouter().push("/page/login");
  }

}

function payWithCreditCard() {
  const orderData = {
    MerchantIdNo: useUserDashboardStore().user.merchantIdNo,
    Email: useUserDashboardStore().user.email,
    OrderStatus: '已建立',
    PaymentMethod: 'creditCard',
    TotalAmount: cartTotal.value,
  };

  // 將相關資訊送至後端
  axios.post(`${useRuntimeConfig().public.apiUrl}/Payment/createOrder`, orderData)
    .then(response => {
      // 第一次 API 請求成功後打第二次 API
      // return axios.get(`${useRuntimeConfig().public.apiUrl}/CreditCardPayOrder/NewPay`, {
      //   params: {
      //     OrderCode: response.data.orderId
      //   },
      //   responseType: 'text'
      // });
      // 構建第二次 API 請求的 URL
      const redirectUrl = `${useRuntimeConfig().public.apiUrl}/CreditCardPayOrder/NewPay?OrderCode=${response.data.orderId}`;
      // 直接跳轉到第二次 API 的 URL
      window.location.href = redirectUrl;
    }).catch(error => {
      console.error('Error creating order:', error);
      // 處理錯誤，例如顯示錯誤信息
      Swal.fire('錯誤', '建立訂單失敗，請稍後再試', 'error');
    });
}

function isFormValid(value) {
  validInfo.value = value.infoValid;
}
onMounted(() => {
  isLogin.value = useCookie('user').value?.isLoggedIn || false;
  user.value = useCookie('user').value
  if (!user.value?.isLoggedIn) {
    useRouter().push("/page/login");
  }
})
</script>
