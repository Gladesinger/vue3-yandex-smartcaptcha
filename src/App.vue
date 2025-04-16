<script setup lang="ts">
import { ref } from "vue";

import { YandexSmartCaptcha } from "./index";
import type { IYandexSmartCaptcha } from "./types";

const token = ref<string | null>(null);
const message = ref<string>("");
const yaCaptcha = ref<IYandexSmartCaptcha | null>(null);

const callback = (tokenValue: string) => {
	token.value = tokenValue;
};

const success = (tokenValue: string) => {
	token.value = tokenValue;
};

const expired = () => {
	message.value = "Token expired";
};

const challengeVisible = () => {
	message.value = "Challenge is visible";
};

const challengeHidden = () => {
	message.value = "Challenge hidden";
};

const captureError = () => {
	message.value = "Error encountered";
};

const fireCaptcha = () => {
	if (yaCaptcha.value) yaCaptcha.value.execute();
};

const resetCaptcha = () => {
	if (yaCaptcha.value) {
		yaCaptcha.value.reset();
		token.value = "";
	}
};

const destroyCaptcha = () => {
	if (yaCaptcha.value) yaCaptcha.value.destroy();
};

const getResponse = () => {
	if (yaCaptcha.value) {
		message.value = `The last token is ${yaCaptcha.value.getResponse()}`;
	}
};

const subscribeEvents = () => {
	if (yaCaptcha.value) {
		yaCaptcha.value.subscribe("challenge-hidden", () => alert("Challege hidden"));
		yaCaptcha.value.subscribe("challenge-visible", () => alert("Challege is visible"));
		yaCaptcha.value.subscribe("javascript-error", () => alert("JS error"));
		yaCaptcha.value.subscribe("network-error", () => alert("Network error"));
		yaCaptcha.value.subscribe("success", () => alert("Success"));
		yaCaptcha.value.subscribe("token-expired", () => alert("Token is expired"));
	}
};
</script>

<template>
	<div>
		<YandexSmartCaptcha
			ref="yaCaptcha"
			siteKey="your_site_key"
			language="en"
			:invisible="true"
			shieldPosition="bottom-right"
			@callback="callback"
			@onSuccess="success"
			@onTokenExpired="expired"
			@onChallengeVisible="challengeVisible"
			@onChallengeHidden="challengeHidden"
			@onJavaScriptError="captureError"
			@onNetworkError="captureError"
			class="captcha"
		/>
		<div class="info">{{ `WidgetId: ${yaCaptcha?.widgetId}, ContainerId: ${yaCaptcha?.containerId}` }}</div>
		<div class="token">{{ `Current token: ${token}` }}</div>
		<div v-if="message" class="message">{{ message }}</div>
		<div class="buttons-container">
			<button @click="fireCaptcha" class="button">Fire captcha</button>
			<button @click="resetCaptcha" class="button">Reset</button>
			<button @click="destroyCaptcha" class="button">Destroy</button>
			<button @click="getResponse" class="button">Get response</button>
			<button @click="subscribeEvents" class="button">Subscribe</button>
		</div>
	</div>
</template>

<style scoped>
.captcha {
	margin-bottom: 20px;
}

.info,
.token,
.message {
	margin-bottom: 20px;
	word-break: break-word;
}

.buttons-container {
	display: flex;
	flex-direction: column;
	gap: 10px;
}

.button {
	width: 100px;
	height: 30px;
}
</style>
