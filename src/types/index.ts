import type { Ref } from "vue";

export type TCaptchaEvents =
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

/**
 * Exposed methods and properties of YandexSmartCaptcha component
 * @description_ru Методы и свойства компонента YandexSmartCaptcha
 */
export interface IYandexSmartCaptcha {
	/** @description Unique widget ID
	 * @description_ru Уникальный идентификатор виджета */
	widgetId: Ref<TWidgetId | null>;
	/** @description Captcha container ID
	 * @description_ru ID контейнера капчи */
	containerId: string;
	/** @description Method for subscription to events. Available events: : "challenge-visible" | "challenge-hidden" | "network-error" | "javascript-error" | "success" | "token-expired"
	 * @description_ru Метод для подписки на события. Доступные события: "challenge-visible" | "challenge-hidden" | "network-error" | "javascript-error" | "success" | "token-expired" */
	subscribe: (eventName: TCaptchaEvents, callback: Function) => void;
	/** @description Start user verification
	 * @description_ru Начать проверку пользователя */
	execute: () => void;
	/** @description Get current token
	 * @description_ru Получить текущий токен */
	getResponse: () => string | undefined;
	/** @description Reset widget
	 * @description_ru Сбросить виджет */
	reset: () => void;
	/** @description Remove widget
	 * @description_ru Удалить виджет */
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

/**
 * Props for YandexSmartCaptcha component
 * @description_ru Пропсы компонента YandexSmartCaptcha
 */
export interface IYandexSmartCaptchaProps {
	/** @description Client-side key for Yandex SmartCaptcha
	 * @description_ru Ключ клиентской части капчи */
	siteKey: string;
	/** @description Widget language. Available values: "ru" | "en" | "be" | "kk" | "tt" | "uk" | "uz" | "tr"
	 * @description_ru Язык виджета. Доступные значения: "ru" | "en" | "be" | "kk" | "tt" | "uk" | "uz" | "tr" */
	language?: TSupportedLanguages;
	/** @description Enable testing mode. User will always get the challenge
	 * @description_ru Включить тестовый режим. Пользователь всегда будет получать задание */
	test?: boolean;
	/** @description Run in WebView for mobile apps
	 * @description_ru Запуск в WebView для мобильных приложений */
	webview?: boolean;
	/** @description Invisible captcha mode
	 * @description_ru Невидимый режим капчи */
	invisible?: boolean;
	/** @description Position of the notification block. Available values: "top-left" | "center-left" | "bottom-left" | "top-right" | "center-right" | "bottom-right"
	 * @description_ru Позиция блока уведомлений. Доступные значения: "top-left" | "center-left" | "bottom-left" | "top-right" | "center-right" | "bottom-right" */
	shieldPosition?: TShieldPositions;
	/** @description Hide notification block
	 * @description_ru Скрыть блок уведомлений */
	hideShield?: boolean;
	/** @description Load widget on mount
	 * @description_ru Загрузить виджет при монтировании */
	loadWidget?: boolean;
	/** @description Load script with defer
	 * @description_ru Загрузить скрипт с defer */
	defer?: boolean;
	/** @description Load script with async
	 * @description_ru Загрузить скрипт с async */
	async?: boolean;
}

export interface IJavascriptErrorData {
	filename: string;
	message: string;
	col: number;
	line: number;
}

/**
 * Emits for YandexSmartCaptcha component
 * @description_ru Эмиты компонента YandexSmartCaptcha
 */
export interface IYandexSmartCaptchaEmits {
	/** @description Returns token on success
	 * @description_ru Возвращает токен при успехе */
	(event: "callback", token: string): void;
	/** @description Challenge window visible
	 * @description_ru Окно с заданием открыто */
	(event: "onChallengeVisible"): void;
	/** @description Challenge window hidden
	 * @description_ru Окно с заданием закрыто */
	(event: "onChallengeHidden"): void;
	/** @description Network error occurred
	 * @description_ru Произошла сетевая ошибка */
	(event: "onNetworkError", error: { message: string }): void;
	/** @description JavaScript error occurred
	 * @description_ru Произошла ошибка JavaScript */
	(event: "onJavaScriptError", error: IJavascriptErrorData): void;
	/** @description Captcha completed successfully
	 * @description_ru Капча успешно пройдена */
	(event: "onSuccess", token: string): void;
	/** @description Token expired
	 * @description_ru Токен истек */
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
