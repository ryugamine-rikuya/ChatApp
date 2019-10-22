<template>
  <div class="main_body_message" v-if="$props.id === $props.myId">
    <li class="main_body_my_message_li">
      <p class="my_message">{{ $props.message }}</p>
      <p class="my_time">{{ $props.hour }}:{{ $props.min }}</p>
    </li>
  </div>
  <div class="main_body_message" v-else-if="$props.type === 'login'">
    <li class="main_body_login_message_li">
      <p class="login">{{ $props.user }} {{ $props.message }} {{ $props.hour }}:{{ $props.min }}</p>
    </li>
  </div>
  <div class="main_body_message" v-else>
    <li class="main_body_message_li">
      <p class="user">{{ $props.user }}</p>
      <p class="message">{{ $props.message }}</p>
      <p class="time">{{ $props.hour }}:{{ $props.min }}</p>
    </li>
  </div>
</template>
<script>
import VueTypes from 'vue-types'

export default {
  props: {
    type: VueTypes.string.isRequired,
    message: VueTypes.string.isRequired,
    id: VueTypes.string.isRequired,
    user: VueTypes.string.isRequired,
    myId: VueTypes.string.isRequired,
    hour: VueTypes.string.isRequired,
    min: VueTypes.string.isRequired
  }
}
</script>
<style>

</style>
