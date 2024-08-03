<script setup>
import { ref, computed, onMounted, onBeforeUnmount, h } from 'vue';

const props = defineProps({
    siteKey: {
        type: String,
        required: true
    },
    language: {
        type: String,
        default: 'ru',
        validator: (lang) => {
            const supportedLanguages = ['ru', 'en', 'be', 'kk', 'tt', 'uk', 'uz', 'tr']

            return supportedLanguages.includes(lang)
        }
    },
    test: {
        type: Boolean,
        default: false
    },
    webview: {
        type: Boolean,
        default: false
    },
    invisible: {
        type: Boolean,
        default: false
    },
    shieldPosition: {
        type: String,
        default: 'bottom-right'
    },
    hideShield: {
        type: Boolean,
        default: false
    },
    loadWidget: {
        type: Boolean,
        default: true
    }
})

const emit = defineEmits([
    'callback',
    'onChallengeVisible',
    'onChallengeHidden',
    'onNetworkError',
    'onJavaScriptError',
    'onSuccess',
    'onTokenExpired'
])

const widgetId = ref('captcha-container');
let script;

const initializeCaptcha = () => {
    if (window && document && window?.smartCaptcha && widgetId.value) {
        const container = document?.getElementById(widgetId.value);

        if(container){
            widgetId.value = window?.smartCaptcha?.render(container, {
                sitekey: props.siteKey,
                hl: props.language,
                test: props.test,
                webview: props.webview,
                invisible: props.invisible,
                shieldPosition: props.shieldPosition,
                hideShield: props.hideShield,
                callback: callback
            });

            window?.smartCaptcha?.subscribe(widgetId.value, 'success', success)
            window?.smartCaptcha?.subscribe(widgetId.value, 'challenge-visible', challengeVisible)
            window?.smartCaptcha?.subscribe(widgetId.value, 'challenge-hidden', challengeHidden)
            window?.smartCaptcha?.subscribe(widgetId.value, 'network-error', netError)
            window?.smartCaptcha?.subscribe(widgetId.value, 'javascript-error', jsError)
            window?.smartCaptcha?.subscribe(widgetId.value, 'token-expired', tokenExpired)
        }
    }
};

const callback = (token) => {
    emit('callback', token);
}

const challengeVisible = () => {
    emit('onChallengeVisible');
}

const challengeHidden = () => {
    emit('onChallengeHidden');
}

const netError = () => {
    emit('onNetworkError', { message: 'Network error occured' });
}

const jsError = (error) => {
    emit('onJavaScriptError', error);
}

const success = (token) => {
    emit('onSuccess', token)
}

const tokenExpired = () => {
    emit('onTokenExpired');
}

const execute = () => {
    if (window?.smartCaptcha) {
        window.smartCaptcha.execute(widgetId.value);
    }
}

const getResponse = () => {
    if (window?.smartCaptcha) {
        window.smartCaptcha.getResponse(widgetId.value);
    }
}

const reset = () => {
    if (window?.smartCaptcha) {
        window.smartCaptcha.reset(widgetId.value);
    }
}

const destroy = () => {
    if (window?.smartCaptcha) {
        window.smartCaptcha.destroy(widgetId.value);
    }
}

const subscribe = (eventName, callbackFun) => {
    if (window?.smartCaptcha) {
        window.smartCaptcha.subscribe(widgetId.value, eventName, callbackFun);
    }
}

const captchaStyles = computed(() => {
    return props.invisible ? { height: 0, width: 0 } : { width: '100px' }
})

onMounted(() => {
    if(!props.loadWidget)
        return

    script = Array.from(document.getElementsByTagName('script')).find(s => s.src.includes('smartcaptcha.yandexcloud.net/captcha.js'));

    if (script) {
        if (script.loaded) {
            initializeCaptcha();
        } else {
            script.addEventListener('load', initializeCaptcha);
        }
    } else {
        script = document.createElement('script');
        script.src = 'https://smartcaptcha.yandexcloud.net/captcha.js?render=onload&onload=onloadFunction';
        script.type = 'text/javascript';
        script.defer = true;
        script.crossOrigin = 'anonymous';
        document.head.appendChild(script);

        script.onload = function() {
            script.loaded = true;
            initializeCaptcha();
        }
    }
});

onBeforeUnmount(() => {
    if (window && window?.smartCaptcha) {
        try{
            window.smartCaptcha.destroy(widgetId.value);
        }catch{}
    }
    if(document && document.getElementsByClassName('smart-captcha').length == 1){
        if (script) script.remove();
    }
});

defineExpose({
    widgetId,
    execute,
    getResponse,
    reset,
    destroy,
    subscribe
})

const yaCaptcha = () => 
    h(
        'div',
        {
          style: captchaStyles.value,
          id: widgetId.value,
          class: 'smart-captcha'
        }
    );
</script>

<template>
    <yaCaptcha />
</template>

<!-- <script setup lang="ts">
import { ref, computed, onMounted, onBeforeUnmount, h } from 'vue';
import type { YandexSmartCaptchaProps, YandexSmartCaptchaEmits, CaptchaEvents } from './types';

const props = defineProps<YandexSmartCaptchaProps>();

const emit = defineEmits<YandexSmartCaptchaEmits>();

const widgetId = ref('captcha-container');
let script: HTMLScriptElement | null | undefined = null;

const initializeCaptcha = () => {
    if (window && document && window.smartCaptcha && widgetId.value) {
        const container = document.getElementById(widgetId.value);

        if (container) {
            widgetId.value = window.smartCaptcha.render(container, {
                sitekey: props.siteKey,
                hl: props.language,
                test: props.test,
                webview: props.webview,
                invisible: props.invisible,
                shieldPosition: props.shieldPosition,
                hideShield: props.hideShield,
                callback: callback
            });

            window.smartCaptcha.subscribe(widgetId.value, 'success', success);
            window.smartCaptcha.subscribe(widgetId.value, 'challenge-visible', challengeVisible);
            window.smartCaptcha.subscribe(widgetId.value, 'challenge-hidden', challengeHidden);
            window.smartCaptcha.subscribe(widgetId.value, 'network-error', netError);
            window.smartCaptcha.subscribe(widgetId.value, 'javascript-error', jsError);
            window.smartCaptcha.subscribe(widgetId.value, 'token-expired', tokenExpired);
        }
    }
};

const callback = (token: string) => {
    emit('callback', token);
};

const challengeVisible = () => {
    emit('onChallengeVisible');
};

const challengeHidden = () => {
    emit('onChallengeHidden');
};

const netError = () => {
    emit('onNetworkError', { message: 'Network error occurred' });
};

const jsError = (error: any) => {
    emit('onJavaScriptError', error);
};

const success = (token: string) => {
    emit('onSuccess', token);
};

const tokenExpired = () => {
    emit('onTokenExpired');
};

const execute = () => {
    if (window.smartCaptcha) {
        window.smartCaptcha.execute(widgetId.value);
    }
};

const getResponse = () => {
    if (window.smartCaptcha) {
        return window.smartCaptcha.getResponse(widgetId.value);
    }
    return '';
};

const reset = () => {
    if (window.smartCaptcha) {
        window.smartCaptcha.reset(widgetId.value);
    }
};

const destroy = () => {
    if (window.smartCaptcha) {
        window.smartCaptcha.destroy(widgetId.value);
    }
};

const subscribe = (eventName: CaptchaEvents, callbackFun: Function) => {
    if (window.smartCaptcha) {
        window.smartCaptcha.subscribe(widgetId.value, eventName, callbackFun);
    }
};

const captchaStyles = computed(() => {
    return props.invisible ? { height: '0', width: '0' } : { width: '100px' }
});

onMounted(() => {
    if (!props.loadWidget) return;

    script = Array.from(document.getElementsByTagName('script')).find(s => s.src.includes('smartcaptcha.yandexcloud.net/captcha.js'));

    if (script) {
        if (script.onload) {
            initializeCaptcha();
        } else {
            script.addEventListener('load', initializeCaptcha);
        }
    } else {
        script = document.createElement('script');
        script.src = 'https://smartcaptcha.yandexcloud.net/captcha.js?render=onload&onload=onloadFunction';
        script.type = 'text/javascript';
        script.defer = true;
        script.crossOrigin = 'anonymous';
        document.head.appendChild(script);

        script.onload = function() {
            script!.loaded = true;
            initializeCaptcha();
        };
    }
});

onBeforeUnmount(() => {
    if (window && window.smartCaptcha) {
        try {
            window.smartCaptcha.destroy(widgetId.value);
        } catch {}
    }
    if (document && document.getElementsByClassName('smart-captcha').length === 1) {
        if (script) script.remove();
    }
});

defineExpose({
    execute,
    getResponse,
    reset,
    destroy,
    subscribe
});

const yaCaptcha = () => 
    h(
        'div',
        {
            style: captchaStyles.value,
            id: widgetId.value,
            class: 'smart-captcha'
        }
    );
</script>

<template>
    <yaCaptcha />
</template> -->