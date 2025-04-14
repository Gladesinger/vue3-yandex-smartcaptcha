<script setup lang="ts">
import { ref, computed, onMounted, onBeforeUnmount, h } from "vue";

import type {
	TCaptchaEvents,
	TWidgetId,
	IRenderParams,
	IYandexSmartCaptcha,
	IYandexSmartCaptchaProps,
	IYandexSmartCaptchaEmits,
} from "../types/types";

defineOptions({
	name: "YandexSmartCaptcha",
});

const props = withDefaults(defineProps<IYandexSmartCaptchaProps>(), {
	language: "ru",
	test: false,
	webview: false,
	invisible: false,
	shieldPosition: "bottom-right",
	hideShield: false,
	loadWidget: true,
	defer: true,
	async: true,
});

const emit = defineEmits<IYandexSmartCaptchaEmits>();

const widgetId = ref<TWidgetId>(1);
let script: HTMLScriptElement | undefined;

const initializeCaptcha = () => {
	if (window && document && window?.smartCaptcha && widgetId.value) {
		const container = document?.getElementById(`smart-captcha-${widgetId.value}`);
		
		if (container) {
			widgetId.value = window?.smartCaptcha?.render(container, {
				sitekey: props.siteKey,
				hl: props.language,
				test: props.test,
				webview: props.webview,
				invisible: props.invisible,
				shieldPosition: props.shieldPosition,
				hideShield: props.hideShield,
				callback: callback,
			} as IRenderParams);

			window?.smartCaptcha?.subscribe(widgetId.value, "success", success);
			window?.smartCaptcha?.subscribe(widgetId.value, "challenge-visible", challengeVisible);
			window?.smartCaptcha?.subscribe(widgetId.value, "challenge-hidden", challengeHidden);
			window?.smartCaptcha?.subscribe(widgetId.value, "network-error", netError);
			window?.smartCaptcha?.subscribe(widgetId.value, "javascript-error", jsError);
			window?.smartCaptcha?.subscribe(widgetId.value, "token-expired", tokenExpired);
		}
	}
};

const callback = (token: string) => {
	emit("callback", token);
};

const challengeVisible = () => {
	emit("onChallengeVisible");
};

const challengeHidden = () => {
	emit("onChallengeHidden");
};

const netError = () => {
	emit("onNetworkError", { message: "Network error occured" });
};

const jsError = (error: any) => {
	emit("onJavaScriptError", error);
};

const success = (token: string) => {
	emit("onSuccess", token);
};

const tokenExpired = () => {
	emit("onTokenExpired");
};

const execute = () => {
	if (window?.smartCaptcha) {
		window.smartCaptcha.execute(widgetId.value);
	}
};

const getResponse = () => {
	if (window?.smartCaptcha) {
		return window.smartCaptcha.getResponse(widgetId.value);
	}
	return undefined;
};

const reset = () => {
	if (window?.smartCaptcha) {
		window.smartCaptcha.reset(widgetId.value);
	}
};

const destroy = () => {
	if (window?.smartCaptcha) {
		window.smartCaptcha.destroy(widgetId.value);
	}
};

const subscribe = (eventName: TCaptchaEvents, callbackFun: Function) => {
	if (window?.smartCaptcha) {
		window.smartCaptcha.subscribe(widgetId.value, eventName, callbackFun);
	}
};

const captchaStyles = computed(() => {
	return props.invisible ? { height: 0, width: 0 } : { width: "100px" };
});

onMounted(() => {
	if (!props.loadWidget) return;

	script = Array.from(document.getElementsByTagName("script")).find((s) =>
		s.src.includes("smartcaptcha.yandexcloud.net/captcha.js")
	);

	if (script) {
		if (script.loaded) {
			initializeCaptcha();
		} else {
			// script.addEventListener("load", initializeCaptcha);
			script.addEventListener("load", function onLoad() {
				if (script) {
					script.removeEventListener("load", onLoad);
					script.loaded = true;
					initializeCaptcha();
				}
			});
		}
	} else {
		script = document.createElement("script");
		script.src = "https://smartcaptcha.yandexcloud.net/captcha.js?render=onload";
		script.type = "text/javascript";
		script.crossOrigin = "anonymous";

		if (props.defer) {
			script.defer = true;
		}

		if (props.async) {
			script.async = true;
		}

		document.head.appendChild(script);

		script.onload = function () {
			script!.loaded = true;
			initializeCaptcha();
		};
	}
});

onBeforeUnmount(() => {
	if (window && window?.smartCaptcha) {
		try {
			window.smartCaptcha.destroy(widgetId.value);
		} catch {}
	}
	if (document && document.getElementsByClassName("smart-captcha").length == 1) {
		if (script) script.remove();
	}
});

defineExpose<IYandexSmartCaptcha>({
	widgetId,
	subscribe,
	execute,
	getResponse,
	reset,
	destroy,
});

const YaCaptcha = () =>
	h("div", {
		style: captchaStyles.value,
		id: `smart-captcha-${widgetId.value}`,
		class: "smart-captcha",
		"data-widget-id": widgetId.value,
	});
</script>

<template>
	<YaCaptcha />
</template>
