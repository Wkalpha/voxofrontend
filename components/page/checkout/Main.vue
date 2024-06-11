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
    payWithTransfer();
  } else {
    useRouter().push("/page/login");
  }

}

function payWithTransfer() {
  console.log(props.cartItems); // 輸出 cartItems
  let transferAccount = '1234567890'; // 轉帳帳號
  Swal.fire({
    title: '銀行轉帳資訊',
    html: `
      <p>轉帳金額: ${cartTotal.value}元</p>
      <p>轉帳帳號: ${transferAccount}</p>
      <p>確認後將成立訂單</p>
    `,
    icon: 'info',
    showCancelButton: true,
    confirmButtonText: '確認',
    cancelButtonText: '取消',
  }).then((result) => {
    if (result.isConfirmed) {
      // 準備要發送的訂單資料
      const orderData = {
        UserId: "testJimmy",
        ShippingCartId: 1,
        ShippingDate: null, // 如果有具體發貨日期，這裡可以修改
        ShippingAddress: null, // 如果有具體地址，這裡可以修改
        Email: "Jimmy@gmail.com",
        BillingAddress: null, // 如果有具體地址，這裡可以修改
        OrderStatus: '已建立',
        PaymentMethod: 'transfer',
        TotalAmount: cartTotal.value,
        ShippingCost: null, // 如果有具體運費，這裡可以修改
        DiscountAmount: null, // 如果有具體折扣金額，這裡可以修改
        OrderNotes: `轉帳帳號:${transferAccount}`, // 如果有具體訂單備註，這裡可以修改
      };

      // 將相關資訊送至後端
      axios.post('https://localhost:7279/api/Payment/createOrder', orderData)
        .then(response => {
          // 導轉至訂單成功頁面
          useRouter().push("/page/order_success");
        })
        .catch(error => {
          console.error('Error creating order:', error);
          // 處理錯誤，例如顯示錯誤信息
          Swal.fire('錯誤', '建立訂單失敗，請稍後再試', 'error');
        });
      useRouter().push('/page/order_success');
    }
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
