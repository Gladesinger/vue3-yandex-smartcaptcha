export type CaptchaEvents = 'callback' | 'onChallengeVisible' | 'onChallengeHidden' | 'onNetworkError' | 'onJavaScriptError' | 'onSuccess' | 'onTokenExpired';

export interface SmartCaptchaOptions {
    sitekey: string;
    hl?: string;
    test?: boolean;
    webview?: boolean;
    invisible?: boolean;
    shieldPosition?: string;
    hideShield?: boolean;
    callback?: (token: string) => void;
}

export interface SmartCaptcha {
    render: (container: HTMLElement, options: SmartCaptchaOptions) => string;
    subscribe: (widgetId: string, eventName: CaptchaEvents, callback: Function) => void;
    execute: (widgetId: string) => void;
    getResponse: (widgetId: string) => string;
    reset: (widgetId: string) => void;
    destroy: (widgetId: string) => void;
}

declare global {
    interface Window {
        smartCaptcha?: SmartCaptcha;
    }
}

export type YandexSmartCaptchaProps = {
    siteKey: string;
    language?: 'ru' | 'en' | 'be' | 'kk' | 'tt' | 'uk' | 'uz' | 'tr';
    test?: boolean;
    webview?: boolean;
    invisible?: boolean;
    shieldPosition?: string;
    hideShield?: boolean;
    loadWidget?: boolean;
}

export type YandexSmartCaptchaEmits = {
    (event: 'callback', token: string): void;
    (event: 'onChallengeVisible'): void;
    (event: 'onChallengeHidden'): void;
    (event: 'onNetworkError', error: { message: string }): void;
    (event: 'onJavaScriptError', error: any): void;
    (event: 'onSuccess', token: string): void;
    (event: 'onTokenExpired'): void;
}