// export type CaptchaEvents =
// 	| "callback"
// 	| "onChallengeVisible"
// 	| "onChallengeHidden"
// 	| "onNetworkError"
// 	| "onJavaScriptError"
// 	| "onSuccess"
// 	| "onTokenExpired";


declare global {
	interface Window {
		smartCaptcha?: SmartCaptcha;
	}
	interface HTMLScriptElement {
		loaded?: boolean;
	}
}

export type CaptchaEvents =
	| "callback"
	| "challenge-visible"
	| "challenge-hidden"
	| "network-error"
	| "javascript-error"
	| "success"
	| "token-expired";

export interface SmartCaptchaOptions {
	sitekey: string;
	hl?: string;
	test?: boolean;
	webview?: boolean;
	invisible?: boolean;
	shieldPosition?: ShieldPosition;
	hideShield?: boolean;
	callback?: (token: string) => void;
}

export type SupportedLanguage = "ru" | "en" | "be" | "kk" | "tt" | "uk" | "uz" | "tr";

export type ShieldPosition = "bottom-right" | "top-left";

export interface IYandexSmartCaptcha {
	subscribe: (eventName: CaptchaEvents, callback: Function) => void;
	execute: () => void;
	getResponse: () => string;
	reset: () => void;
	destroy: () => void;
}

export interface SmartCaptcha {
	render: (container: HTMLElement, options: SmartCaptchaOptions) => string;
	subscribe: (widgetId: string, eventName: CaptchaEvents, callback: Function) => void;
	execute: (widgetId: string) => void;
	getResponse: (widgetId: string) => string;
	reset: (widgetId: string) => void;
	destroy: (widgetId: string) => void;
}

export type YandexSmartCaptchaProps = {
	siteKey: string;
	language?: SupportedLanguage;
	test?: boolean;
	webview?: boolean;
	invisible?: boolean;
	shieldPosition?: ShieldPosition;
	hideShield?: boolean;
	loadWidget?: boolean;
};

export type YandexSmartCaptchaEmits = {
	(event: "callback", token: string): void;
	(event: "onChallengeVisible"): void;
	(event: "onChallengeHidden"): void;
	(event: "onNetworkError", error: { message: string }): void;
	(event: "onJavaScriptError", error: any): void;
	(event: "onSuccess", token: string): void;
	(event: "onTokenExpired"): void;
};
