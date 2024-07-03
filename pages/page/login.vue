<template>
  <Head>
    <Title>Login</Title>
  </Head>
  <div class="login-section">
    <div class="materialContainer">
      <div class="box">
        <div class="login-title">
          <h2>{{ useRuntimeConfig().public.const.LogIn }}</h2>
        </div>
        <div class="input">
          <label for="email" :style="[{ 'line-height': selected['email'] ? '18px' : '60px' }]">{{
            useRuntimeConfig().public.const.Email
          }}</label>
          <input type="email" name="email" id="email" required v-on:blur="handleFocusOut('email')" v-model="auth.email"
            @focus.prevent="select('email')" />
          <span class="spin" :style="[{ width: selected['email'] ? '100%' : '0%' }]"></span>
          <div class="valid-feedback">Please fill the name</div>
        </div>
        <div class="input">
          <label for="password" :style="[{ 'line-height': selected['password'] ? '18px' : '60px' }]">Password</label>
          <input type="password" name="password" id="password" v-on:blur="handleFocusOut('password')"
            v-model="auth.password" @focus.prevent="select('password')" />
          <span class="spin" :style="[{ width: selected['password'] ? '100%' : '0%' }]"></span>
          <div class="valid-feedback">Please fill the name</div>
        </div>
        <a href="javascript:void(0)" @click.prevent="$router.push('/page/forgot_password')" class="pass-forgot">Forgot
          your password?</a>
        <div class="button login">
          <button href="javascript:void(0)" @click.prevent="login" type="submit">
            <span>Log In</span>
            <i class="fa fa-check"></i>
          </button>
        </div>

        <p class="sign-category">
          <span>{{ useRuntimeConfig().public.const.Orsigninwith }}</span>
        </p>

        <div class="row gx-md-3 gy-3">
          <div class="col-md-12">
            <a href="javascript:void(0)" @click.prevent="loginWithLine">
              <div class="social-media fb-media">
                <img src="/images/inner-page/linelogo.png" class="img-fluid" alt="" />
                <h6>Line</h6>
              </div>
            </a>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import {useUserDashboardStore} from "@/store/userDashboard"
import { useNuxtApp } from "#app";

export default {
  data() {
    return {
      themeCss: "/demo2.css",
      auth: { email: "test@gmail.com", password: "test@123" },
      selected: { email: false, password: false },
    };
  },
  head() {
    return {
      title: "Login",
      link: [{ rel: "icon", type: "image/x-icon", href: "/favicon.png" }],
    };
  },
  methods: {
    select(textbox) {
      this.selected[textbox] = true;
    },
    login() {
      if(this.auth.email == 'test@gmail.com' && this.auth.password == 'test@123')
      {
        useUserDashboardStore().setUser({email:this.auth.email,isLoggedIn:true})
        this.$router.back()
      }
    },
    async loginWithLine() {
      try {
        const { $liff } = useNuxtApp();

        console.log("liff", $liff); // 確保這裡不是 undefined
        if (!$liff.isLoggedIn()) {
          $liff.login();
        }else{
          console.log("isLoggedIn");
        }
      } catch (error) {
        console.error('Login with LINE failed', error);
      }
    },
    handleFocusOut(field) {
      this.auth[field] === "" && (this.selected[field] = false);
    },
  },
  mounted() {
    let layoutMode = useCookie("layoutType").value || "light";
    if (layoutMode === "dark") this.themeCss = "/css/demo2_dark.css";
    else this.themeCss = "/css/demo2.css";
    this.auth.email.length != 0 ? this.select("email") : false;
    this.auth.password.length != 0 ? this.select("password") : false;
  },
};
</script>

<style lang="scss">
@import "@/assets/scss/demo2.scss";
</style>