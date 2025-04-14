import type { Ref } from "vue";

export type TCaptchaEvents =
	| "callback"
	| "challenge-visible"
	| "challenge-hidden"
	| "network-error"
	| "javascript-error"
	| "success"
	| "token-expired";

export type TSupportedLanguages = "ru" | "en" | "be" | "kk" | "tt" | "uk" | "uz" | "tr";
export type TShieldPositions =
	| "top-left"
	| "center-left"
	| "bottom-left"
	| "top-right"
	| "center-right"
	| "bottom-right";

export interface IRenderParams {
	sitekey: string;
	hl?: TSupportedLanguages;
	invisible?: boolean;
	test?: boolean;
	webview?: boolean;
	shieldPosition?: TShieldPositions;
	hideShield?: boolean;
	callback?: (token: string) => void;
}

export type TWidgetId = number;

export interface IYandexSmartCaptcha {
	widgetId: Ref<TWidgetId>;
	subscribe: (eventName: TCaptchaEvents, callback: Function) => void;
	execute: () => void;
	getResponse: () => string | undefined;
	reset: () => void;
	destroy: () => void;
}

export interface ISmartCaptchaApi {
	render: (container: HTMLElement, options: IRenderParams) => TWidgetId;
	reset: (widgetId?: TWidgetId) => void;
	destroy: (widgetId?: TWidgetId) => void;
	execute: (widgetId?: TWidgetId) => void;
	subscribe: (widgetId: TWidgetId, eventName: TCaptchaEvents, callback: Function) => void;
	getResponse: (widgetId?: TWidgetId) => string | undefined;
}

export interface IYandexSmartCaptchaProps {
	siteKey: string;
	language?: TSupportedLanguages;
	test?: boolean;
	webview?: boolean;
	invisible?: boolean;
	shieldPosition?: TShieldPositions;
	hideShield?: boolean;
	loadWidget?: boolean;
	defer?: boolean;
	async?: boolean;
}

export interface IJavascriptErrorData {
	filename: string;
	message: string;
	col: number;
	line: number;
}

export interface IYandexSmartCaptchaEmits {
	(event: "callback", token: string): void;
	(event: "onChallengeVisible"): void;
	(event: "onChallengeHidden"): void;
	(event: "onNetworkError", error: { message: string }): void;
	(event: "onJavaScriptError", error: IJavascriptErrorData): void;
	(event: "onSuccess", token: string): void;
	(event: "onTokenExpired"): void;
}

declare global {
	interface Window {
		smartCaptcha?: ISmartCaptchaApi;
	}
	interface HTMLScriptElement {
		loaded?: boolean;
	}
}
