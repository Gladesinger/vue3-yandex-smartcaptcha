Yandex Smart Captcha Vue component

# Vue 3 Yandex SmartCaptcha

[Русская версия](#описание) | [English version](#description)

## Описание

Компонент для работы с Yandex Smartcaptcha. Перед использованием нужно зарегистрироваться и получить ключ клиента. Вся документация капчи доступна по ссылке [Yandex Smartcaptcha](https://yandex.cloud/ru/docs/smartcaptcha/)

## Установка

Чтобы установить этот пакет, выполните следующую команду:

```bash
npm install @gladesinger/vue3-yandex-smartcaptcha
```

<!-- ## Использование -->

Вы можете использовать компонент `YandexSmartCaptcha` в вашем Vue 3 проекте следующим образом:

### Импорт компонента

Импортируйте компонент и используйте его в вашем файле Vue:

```javascript
import { YandexSmartCaptcha } from '@gladesinger/vue3-yandex-smartcaptcha'
```

Или зарегистрируйте его через плагин Vue:

```javascript
import { createApp } from 'vue'
import App from './App.vue'
import { YandexSmartCaptcha } from '@gladesinger/vue3-yandex-smartcaptcha'

const app = createApp(App)
app.component('YandexSmartCaptcha', YandexSmartCaptcha)
app.mount('#app')
```

Для использования в Nuxt оберните вызов компонента в ClientOnly.

## Пропсы

Вот список доступных пропсов для компонента `YandexSmartCaptcha`:

| Пропс              | Тип     | Значение по умолчанию | Описание                                                                                  |
|--------------------|---------|------------------------|-------------------------------------------------------------------------------------------|
| `siteKey`          | `String` | -                      | Ключ клиентской части.                                                                    |
| `language`         | `String` | `'ru'`                 | Язык виджета. Возможные значения: `'ru'`, `'en'`, `'be'`, `'kk'`, `'tt'`, `'uk'`, `'uz'`, `'tr'`. |
| `test`             | `Boolean`| `false`                | Включение работы капчи в режиме тестирования. Пользователь всегда будет получать задание. Используйте только для отладки и тестирования. |
| `webview`          | `Boolean`| `false`                | Запуск капчи в WebView для повышения точности оценки пользователей в мобильных приложениях. |
| `invisible`        | `Boolean`| `false`                | Невидимая капча.                                                                         |
| `shieldPosition`   | `String` | `'bottom-right'`       | Расположение блока с уведомлением об обработке данных.                                    |
| `hideShield`       | `Boolean`| `false`                | Скрыть блок с уведомлением об обработке данных.                                           |
| `loadWidget`       | `Boolean`| `true`                 | Загружать виджет при монтировании компонента.                                            |

## Эмиты

Компонент `YandexSmartCaptcha` поддерживает следующие события:

| Событие            | Описание                                                        | Аргумент                 |
|--------------------|-----------------------------------------------------------------|--------------------------|
| `callback`         | Функция-обработчик, возвращает токен в случае успеха             | `token: string`          |
| `onChallengeVisible` | Открытие всплывающего окна с заданием                            | `() => void`             |
| `onChallengeHidden` | Закрытие всплывающего окна с заданием                            | `() => void`             |
| `onNetworkError`   | Возникла сетевая ошибка                                         | `() => void`             |
| `onJavaScriptError`| Возникла критическая ошибка JS                                   | `error: { filename: string, message: string, col: number, line: number }` |
| `onSuccess`        | Успешная валидация пользователя                                  | `token: string`          |
| `onTokenExpired`   | Токен прохождения проверки стал невалидным                       | `() => void`             |

## Методы

Компонент экспортирует следующие методы, которые можно использовать:

| Метод       | Описание                                                                                           | Аргумент            |
|-------------|----------------------------------------------------------------------------------------------------|---------------------|
| `getResponse`| Возвращает текущее значение токена пользователя. |  |
| `execute`   | Запускает проверку пользователя. Используется для запуска невидимой капчи. |  |
| `reset`     | Сбрасывает состояние виджета до начального. |  |
| `destroy`   | Удаляет виджет и созданные им обработчики.  |  |
| `subscribe` | Подписывает обработчики на определенные события виджета. Например, для отслеживания открытия и закрытия всплывающего окна с заданием. | `eventName: SubscribeEvent, callbackFun: Function` |

Спосок возможных событий:
```javascript
type SubscribeEvent =
| 'challenge-visible'
| 'challenge-hidden'
| 'network-error'
| 'javascript-error'
| 'success'
| 'token-expired';
```

Компонент также предоставляет значение `widgetId`. 

## Примеры использования

### Обычная капча

```vue
<script setup>
import { YandexSmartCaptcha } from '@gladesinger/vue3-yandex-smartcaptcha'

const success = (token) => {
  console.log(token)
}

const expired = () => {
  console.log('expired')
}
</script>

<template>
  <div>
    <YandexSmartCaptcha 
      siteKey="ваш_ключ_сайта"
      @onSuccess="success"
      @onTokenExpired="expired"
    />
  </div>
</template>
```

### Невидимая капча

```vue
<script setup>
import { YandexSmartCaptcha } from '@gladesinger/vue3-yandex-smartcaptcha'
import { ref } from 'vue'

const yaCaptcha = ref(null)

const success = (token) => {
  console.log(token)
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
      siteKey="ваш_ключ_сайта"
      invisible="true"
      shieldPosition="top-left"
      @onSuccess="success"
      @onTokenExpired="expired"
    />
    <button @click="fireCaptcha">Тест</button>
  </div>
</template>
```

## Description

This package brings a component for Yandex Smartcaptcha. Before using it you need to get the user token from the official website. Smartcaptcha documentation available here [Yandex Smartcaptcha](https://yandex.cloud/en/docs/smartcaptcha/)

## Installation

To install this package, run the following command:

```bash
npm install @gladesinger/vue3-yandex-smartcaptcha
```

## Usage

You can use the `YandexSmartCaptcha` component in your Vue 3 project as follows:

### Importing the Component

Import the component and use it in your Vue file:

```javascript
import { YandexSmartCaptcha } from '@gladesinger/vue3-yandex-smartcaptcha'
```

Or register it as a Vue plugin:

```javascript
import { createApp } from 'vue'
import App from './App.vue'
import { YandexSmartCaptcha } from '@gladesinger/vue3-yandex-smartcaptcha'

const app = createApp(App)
app.component('YandexSmartCaptcha', YandexSmartCaptcha)
app.mount('#app')
```

For usage in Nuxt, wrap the component call in `ClientOnly`.

## Props

Here is a list of available props for the `YandexSmartCaptcha` component:

| Prop              | Type     | Default Value          | Description                                                                                  |
|-------------------|----------|------------------------|----------------------------------------------------------------------------------------------|
| `siteKey`         | `String`  | -                      | Client-side key.                                                                            |
| `language`        | `String`  | `'ru'`                 | Widget language. Possible values: `'ru'`, `'en'`, `'be'`, `'kk'`, `'tt'`, `'uk'`, `'uz'`, `'tr'`. |
| `test`            | `Boolean` | `false`                | Enables captcha testing mode. The user will always receive a challenge. Use only for debugging and testing. |
| `webview`         | `Boolean` | `false`                | Runs the captcha in WebView to improve accuracy in mobile applications using WebView.        |
| `invisible`       | `Boolean` | `false`                | Invisible captcha.                                                                          |
| `shieldPosition`  | `String`  | `'bottom-right'`       | Position of the data processing notification block.                                        |
| `hideShield`      | `Boolean` | `false`                | Hides the data processing notification block.                                               |
| `loadWidget`      | `Boolean` | `true`                 | Load the widget when the component is mounted.                                               |

## Events

The `YandexSmartCaptcha` component supports the following events:

| Event               | Description                                                    | Argument                 |
|---------------------|----------------------------------------------------------------|--------------------------|
| `callback`          | Callback function, returns the token on success                | `token: string`          |
| `onChallengeVisible`| Challenge window becomes visible                               | `() => void`             |
| `onChallengeHidden` | Challenge window becomes hidden                                | `() => void`             |
| `onNetworkError`    | Network error occurred                                         | `() => void`             |
| `onJavaScriptError` | Critical JavaScript error occurred                             | `error: { filename: string, message: string, col: number, line: number }` |
| `onSuccess`         | Successful user validation                                     | `token: string`          |
| `onTokenExpired`    | The token has expired                                          | `() => void`             |

## Methods

The component exposes the following methods:

| Method       | Description                                                                                           | Argument            |
|--------------|-------------------------------------------------------------------------------------------------------|---------------------|
| `getResponse`| Returns the current value of the user's token. |  |
| `execute`    | Starts the user verification process. Used to trigger the invisible captcha. |  |
| `reset`      | Resets the widget to its initial state. |  |
| `destroy`    | Removes the widget and its handlers. |  |
| `subscribe`  | Subscribes handlers to specific widget events. For example, to track the opening and closing of the challenge window. | `eventName: SubscribeEvent, callbackFun: Function` |

Possible events:

```javascript
type SubscribeEvent =
| 'challenge-visible'
| 'challenge-hidden'
| 'network-error'
| 'javascript-error'
| 'success'
| 'token-expired';
```

The component also exposes the `widgetId` state, if you need it for your case.

## Usage Examples

### Regular Captcha

```vue
<script setup>
import { YandexSmartCaptcha } from '@gladesinger/vue3-yandex-smartcaptcha'

const success = (token) => {
  console.log(token)
}

const expired = () => {
  console.log('expired')
}
</script>

<template>
  <div>
    <YandexSmartCaptcha 
      siteKey="your_site_key"
      @onSuccess="success"
      @onTokenExpired="expired"
    />
  </div>
</template>
```

### Invisible Captcha

```vue
<script setup>
import { YandexSmartCaptcha } from '@gladesinger/vue3-yandex-smartcaptcha'
import { ref } from 'vue'

const yaCaptcha = ref(null)

const success = (token) => {
  console.log(token)
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
      siteKey="your_site_key"
      invisible="true"
      shieldPosition="top-left"
      @onSuccess="success"
      @onTokenExpired="expired"
    />
    <button @click="fireCaptcha">Test</button>
  </div>
</template>
```