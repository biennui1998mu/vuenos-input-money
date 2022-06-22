<script lang="ts">
import { defineComponent } from 'vue';
import VuenosInputMoney from '@/vuenos-input-money.vue';

export default defineComponent({
  name: 'ServeDev',
  components: {
    VuenosInputMoney
  }
});
</script>

<template>
  <div id="app">
    <vuenos-input-money />
  </div>
</template>
