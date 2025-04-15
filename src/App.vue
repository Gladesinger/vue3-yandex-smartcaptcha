<script setup lang="ts">
import { ref } from "vue";

import { YandexSmartCaptcha } from './index'
import type { IYandexSmartCaptcha } from "./types";

const token = ref<string | null>(null);
const yaCaptcha = ref<IYandexSmartCaptcha | null>(null);

const success = (tok: string) => {
	token.value = tok;
};

const expired = () => {
	console.log("expired");
};

const fireCaptcha = () => {
	if (yaCaptcha.value) yaCaptcha.value.execute();
};
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
</style>
