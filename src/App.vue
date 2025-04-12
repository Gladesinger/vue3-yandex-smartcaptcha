<script setup lang="ts">
import { ref } from 'vue';
import YandexSmartCaptcha from "./components/YandexSmartCaptcha.vue";

const token = ref(null)
const yaCaptcha = ref(null)

const success = (tok) => {
  token.value = tok
}

const expired = () => {
  console.log('expired')
}

const fireCaptcha = () => {
  yaCaptcha.value.execute()
}
</script>

<template>
  <div>
    <YandexSmartCaptcha 
      ref="yaCaptcha"
      siteKey=""
      language="ru"
      shieldPosition="top-left"
      @onSuccess="success"
      @onTokenExpired="expired"
    />
    {{ token }}
    <button @click="fireCaptcha">Войти</button>
    </div>
</template>

<style scoped>
.logo {
  height: 6em;
  padding: 1.5em;
  will-change: filter;
  transition: filter 300ms;
}
.logo:hover {
  filter: drop-shadow(0 0 2em #646cffaa);
}
.logo.vue:hover {
  filter: drop-shadow(0 0 2em #42b883aa);
}
</style>
