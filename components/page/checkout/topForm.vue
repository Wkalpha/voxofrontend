<template>
  <div class="row g-4">
    <div class="col-md-6">
      <label for="email" class="form-label">Email</label>
      <Field type="email" class="form-control" v-model="information.emailAddress" id="email"
        placeholder="example@example.com" name="emailAddress" />
      <ErrorMessage class="text-danger" name="emailAddress" />
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted, onUpdated } from 'vue';
import * as yup from 'yup';
import { Field, ErrorMessage, useForm } from 'vee-validate';
import { useCartStore } from '~~/store/cart';

const information = ref({
  emailAddress: "",
});
const addressForm = ref(null);

const schema = yup.object({
  emailAddress: yup.string().required('Email is required').email('Email must be valid'),
});

const { handleSubmit } = useForm({
  validationSchema: schema,
});

const emit = defineEmits(['formSubmitted']);

const onSubmit = handleSubmit((values) => {
  emit('formSubmitted', information.value);
}, onInvalidSubmit);

defineExpose({
  onSubmit
});

function onInvalidSubmit({ values, errors }) {
  console.log("Invalid submit", values, errors);
}

onMounted(() => {
  if (Object.keys(useCartStore().userInfo).length) {
    information.value = useCartStore().userInfo;
  }
});

onUpdated(() => {
  if (Object.keys(useCartStore().userInfo).length) {
    information.value = useCartStore().userInfo;
  }
});
</script>

<style scoped>
/* 在這裡添加任何你需要的樣式 */
</style>
