<template>
  <div class="modal fade payment-modal" id="addPayment" :class="showModal ? 'show d-block' : ''">
    <div class="modal-dialog modal-dialog-centered">
      <div class="modal-content">
        <button type="button" class="btn-close" data-bs-dismiss="modal" @click.prevent="closeOverlay"></button>
        <div class="modal-body">
          <form>
            <label for="name" class="form-label">Card Type</label>
            <select class="form-select form-select-lg mb-4">
              <option selected disabled>Choose Your Card</option>
              <option value="1">Creadit Card</option>
              <option value="2">Debit Card</option>
              <option value="3">Debit Card and ATM</option>
            </select>

            <div class="mb-4">
              <label for="card" class="form-label">Name On Card</label>
              <input type="text" class="form-control" id="card" placeholder="Name card" />
            </div>
            <div class="mb-4">
              <label for="cAddress" class="form-label">Card Number</label>
              <input type="number" class="form-control" id="cAddress" placeholder="XXXX-XXXX-XXXX-XXXX" />
            </div>
            <div class="row">
              <div class="col-md-8 mb-4">
                <label for="expiry" class="form-label">Expiry Date</label>
                <input type="date" class="form-control font-light" id="expiry" />
              </div>
              <div class="col-md-4 mb-4">
                <label for="cvv" class="form-label">CVV</label>
                <input type="number" class="form-control" id="cvv" placeholder="XX9" />
              </div>
            </div>
          </form>
        </div>
        <div class="modal-footer pt-0 text-end d-block">
          <button type="button" class="btn bg-secondary text-white rounded-1 modal-close-button" data-bs-dismiss="modal"
            @click.prevent="closeOverlay">
            {{ useRuntimeConfig().public.const.Close }}
          </button>
          <button class="btn btn-solid-default rounded-1" data-bs-dismiss="modal" @click.prevent="closeOverlay">
            Save Card Details
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { useClickStore } from '~~/store/clickEvents';

export default {
  props: ["showModal"],
  methods: {
    closeOverlay() {
      useClickStore().closeOverlay()
    },
  },
};
</script>

<style>

</style>
