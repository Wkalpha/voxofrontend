<template>
  <div class="tab-pane fade dashboard-profile dashboard show active" id="profile">
    <div class="box-head">
      <h3>Profile</h3>
      <a href="javascript:void(0)" data-bs-toggle="modal" data-bs-target="#addAddress">Edit</a>
    </div>
    <ul class="dash-profile">
      <li>
        <div class="left">
          <h6 class="font-light">Company Name</h6>
        </div>
        <div class="right">
          <h6>Voxo Fashion</h6>
        </div>
      </li>

      <li>
        <div class="left">
          <h6 class="font-light">{{ useRuntimeConfig().public.const.Country }} / Region</h6>
        </div>
        <div class="right">
          <h6>Downers Grove, IL</h6>
        </div>
      </li>

      <li>
        <div class="left">
          <h6 class="font-light">Year Established</h6>
        </div>
        <div class="right">
          <h6>2018</h6>
        </div>
      </li>

      <li>
        <div class="left">
          <h6 class="font-light">Total Employees</h6>
        </div>
        <div class="right">
          <h6>101 - 200 People</h6>
        </div>
      </li>

      <li>
        <div class="left">
          <h6 class="font-light">Category</h6>
        </div>
        <div class="right">
          <h6>Clothing</h6>
        </div>
      </li>

      <li>
        <div class="left">
          <h6 class="font-light">Street Address</h6>
        </div>
        <div class="right">
          <h6>549 Sulphur Springs Road</h6>
        </div>
      </li>

      <li>
        <div class="left">
          <h6 class="font-light">City/State</h6>
        </div>
        <div class="right">
          <h6>Downers Grove, IL</h6>
        </div>
      </li>

      <li>
        <div class="left">
          <h6 class="font-light">Zip</h6>
        </div>
        <div class="right">
          <h6>60515</h6>
        </div>
      </li>
    </ul>

    <div class="box-head mt-lg-5 mt-3">
      <h3>Login Details</h3>
      <a href="javascript:void(0)" data-bs-toggle="modal" data-bs-target="#addAddress">Edit</a>
    </div>

    <ul class="dash-profile">
      <li>
        <div class="left">
          <h6 class="font-light">Email Address</h6>
        </div>
        <div class="right">
          <h6>mark.jugal@gmail.com</h6>
        </div>
        <a href="javascript:void(0)" data-bs-toggle="modal" data-bs-target="#addAddress">Edit</a>
      </li>

      <li>
        <div class="left">
          <h6 class="font-light">Phone No.</h6>
        </div>
        <div class="right">
          <h6>+1-202-555-0198</h6>
        </div>
        <a href="javascript:void(0)" data-bs-toggle="modal" data-bs-target="#addAddress">Edit</a>
      </li>

      <li class="mb-0">
        <div class="left">
          <h6 class="font-light">Password</h6>
        </div>
        <div class="right">
          <h6>●●●●●●</h6>
        </div>
        <a href="javascript:void(0)" data-bs-toggle="modal" data-bs-target="#addAddress">Edit</a>
      </li>
    </ul>
  </div>
</template>

<script>
export default {};
</script>
