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

## TypeScript Поддержка

Компонент полностью поддерживает TypeScript и предоставляет типы для всех пропсов, эмитов и методов. Типы доступны через импорт:

```typescript
import type { 
  IYandexSmartCaptchaProps,
  IYandexSmartCaptchaEmits,
  IYandexSmartCaptcha,
  TCaptchaEvents,
  TSupportedLanguages,
  TShieldPositions
} from '@gladesinger/vue3-yandex-smartcaptcha/types';
```

### Доступные типы:

- `IYandexSmartCaptchaProps` - типы для пропсов компонента
- `IYandexSmartCaptchaEmits` - типы для эмитов компонента
- `IYandexSmartCaptcha` - типы для методов и свойств компонента
- `TCaptchaEvents` - типы для событий капчи
- `TSupportedLanguages` - поддерживаемые языки
- `TShieldPositions` - возможные позиции щита

## Пропсы

Вот список доступных пропсов для компонента `YandexSmartCaptcha`:

| Пропс              | Тип     | Значение по умолчанию | Описание                                                                                  |
|--------------------|---------|------------------------|-------------------------------------------------------------------------------------------|
| `siteKey`          | `String` | -                      | Ключ клиентской части.                                                                    |
| `language`         | `TSupportedLanguages` | `'ru'`                 | Язык виджета. Возможные значения: `'ru'`, `'en'`, `'be'`, `'kk'`, `'tt'`, `'uk'`, `'uz'`, `'tr'`. |
| `test`             | `Boolean`| `false`                | Включение работы капчи в режиме тестирования. Пользователь всегда будет получать задание. Используйте только для отладки и тестирования. |
| `webview`          | `Boolean`| `false`                | Запуск капчи в WebView для повышения точности оценки пользователей в мобильных приложениях. |
| `invisible`        | `Boolean`| `false`                | Невидимая капча.                                                                         |
| `shieldPosition`   | `TShieldPositions` | `'bottom-right'`       | Расположение блока с уведомлением об обработке данных.                                    |
| `hideShield`       | `Boolean`| `false`                | Скрыть блок с уведомлением об обработке данных.                                           |
| `loadWidget`       | `Boolean`| `true`                 | Загружать виджет при монтировании компонента.                                            |
| `defer`            | `Boolean`| `true`                 | Загружать скрипт с атрибутом defer.                                                      |
| `async`            | `Boolean`| `true`                 | Загружать скрипт с атрибутом async.                                                      |

## Эмиты

Компонент `YandexSmartCaptcha` поддерживает следующие события:

| Событие            | Описание                                                        | Аргумент                 |
|--------------------|-----------------------------------------------------------------|--------------------------|
| `callback`         | Функция-обработчик, возвращает токен в случае успеха             | `token: string`          |
| `onChallengeVisible` | Открытие всплывающего окна с заданием                            | `() => void`             |
| `onChallengeHidden` | Закрытие всплывающего окна с заданием                            | `() => void`             |
| `onNetworkError`   | Возникла сетевая ошибка                                         | `error: { message: string }` |
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
| `subscribe` | Подписывает обработчики на определенные события виджета. Например, для отслеживания открытия и закрытия всплывающего окна с заданием. | `eventName: TCaptchaEvents, callbackFun: Function` |

Компонент также предоставляет значение `widgetId`. 

## Примеры использования

### Обычная капча

#### JavaScript
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

#### TypeScript
```vue
<script setup lang="ts">
import { YandexSmartCaptcha } from '@gladesinger/vue3-yandex-smartcaptcha'
import type { IYandexSmartCaptcha } from '@gladesinger/vue3-yandex-smartcaptcha/types'

const success = (token: string) => {
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

#### JavaScript
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
      :invisible="true"
      shieldPosition="top-left"
      @onSuccess="success"
      @onTokenExpired="expired"
    />
    <button @click="fireCaptcha">Тест</button>
  </div>
</template>
```

#### TypeScript
```vue
<script setup lang="ts">
import { YandexSmartCaptcha } from '@gladesinger/vue3-yandex-smartcaptcha'
import type { IYandexSmartCaptcha } from '@gladesinger/vue3-yandex-smartcaptcha/types'
import { ref } from 'vue'

const yaCaptcha = ref<IYandexSmartCaptcha | null>(null)

const success = (token: string) => {
  console.log(token)
}

const expired = () => {
  console.log('expired')
}

const fireCaptcha = () => {
  yaCaptcha.value?.execute()
}
</script>

<template>
  <div>
    <YandexSmartCaptcha 
      ref="yaCaptcha"
      siteKey="ваш_ключ_сайта"
      :invisible="true"
      shieldPosition="top-left"
      @onSuccess="success"
      @onTokenExpired="expired"
    />
    <button @click="fireCaptcha">Тест</button>
  </div>
</template>
```

### Полный пример с использованием всех возможностей

#### JavaScript
```vue
<script setup>
import { YandexSmartCaptcha } from '@gladesinger/vue3-yandex-smartcaptcha'
import { ref } from 'vue'

const token = ref(null)
const message = ref('')
const yaCaptcha = ref(null)

const callback = (tokenValue) => {
  token.value = tokenValue
}

const success = (tokenValue) => {
  token.value = tokenValue
}

const expired = () => {
  message.value = 'Token expired'
}

const challengeVisible = () => {
  message.value = 'Challenge is visible'
}

const challengeHidden = () => {
  message.value = 'Challenge hidden'
}

const captureError = () => {
  message.value = 'Error encountered'
}

const fireCaptcha = () => {
  yaCaptcha.value.execute()
}

const resetCaptcha = () => {
  yaCaptcha.value.reset()
  token.value = ''
}

const destroyCaptcha = () => {
  yaCaptcha.value.destroy()
}

const getResponse = () => {
  const response = yaCaptcha.value.getResponse()
  message.value = `The last token is ${response}`
}

const subscribeEvents = () => {
  const events = [
    'challenge-hidden',
    'challenge-visible',
    'javascript-error',
    'network-error',
    'success',
    'token-expired'
  ]
  
  events.forEach(event => {
    yaCaptcha.value.subscribe(event, () => alert(`Event: ${event}`))
  })
}
</script>

<template>
  <div>
    <YandexSmartCaptcha
      ref="yaCaptcha"
      siteKey="ваш_ключ_сайта"
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
    />
    <div>WidgetId: {{ yaCaptcha?.widgetId }}, ContainerId: {{ yaCaptcha?.containerId }}</div>
    <div>Current token: {{ token }}</div>
    <div v-if="message">{{ message }}</div>
    <div class="buttons">
      <button @click="fireCaptcha">Fire captcha</button>
      <button @click="resetCaptcha">Reset</button>
      <button @click="destroyCaptcha">Destroy</button>
      <button @click="getResponse">Get response</button>
      <button @click="subscribeEvents">Subscribe</button>
    </div>
  </div>
</template>

<style scoped>
.buttons {
  display: flex;
  gap: 10px;
  margin-top: 20px;
}
</style>
```

#### TypeScript
```vue
<script setup lang="ts">
import { YandexSmartCaptcha } from '@gladesinger/vue3-yandex-smartcaptcha'
import type { IYandexSmartCaptcha, TCaptchaEvents } from '@gladesinger/vue3-yandex-smartcaptcha/types'
import { ref } from 'vue'

const token = ref<string | null>(null)
const message = ref<string>('')
const yaCaptcha = ref<IYandexSmartCaptcha | null>(null)

const callback = (tokenValue: string) => {
  token.value = tokenValue
}

const success = (tokenValue: string) => {
  token.value = tokenValue
}

const expired = () => {
  message.value = 'Token expired'
}

const challengeVisible = () => {
  message.value = 'Challenge is visible'
}

const challengeHidden = () => {
  message.value = 'Challenge hidden'
}

const captureError = () => {
  message.value = 'Error encountered'
}

const fireCaptcha = () => {
  yaCaptcha.value?.execute()
}

const resetCaptcha = () => {
  yaCaptcha.value?.reset()
  token.value = ''
}

const destroyCaptcha = () => {
  yaCaptcha.value?.destroy()
}

const getResponse = () => {
  const response = yaCaptcha.value?.getResponse()
  message.value = `The last token is ${response}`
}

const subscribeEvents = () => {
  const events: TCaptchaEvents[] = [
    'challenge-hidden',
    'challenge-visible',
    'javascript-error',
    'network-error',
    'success',
    'token-expired'
  ]
  
  events.forEach(event => {
    yaCaptcha.value?.subscribe(event, () => alert(`Event: ${event}`))
  })
}
</script>

<template>
  <div>
    <YandexSmartCaptcha
      ref="yaCaptcha"
      siteKey="ваш_ключ_сайта"
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
    />
    <div>WidgetId: {{ yaCaptcha?.widgetId }}, ContainerId: {{ yaCaptcha?.containerId }}</div>
    <div>Current token: {{ token }}</div>
    <div v-if="message">{{ message }}</div>
    <div class="buttons">
      <button @click="fireCaptcha">Fire captcha</button>
      <button @click="resetCaptcha">Reset</button>
      <button @click="destroyCaptcha">Destroy</button>
      <button @click="getResponse">Get response</button>
      <button @click="subscribeEvents">Subscribe</button>
    </div>
  </div>
</template>

<style scoped>
.buttons {
  display: flex;
  gap: 10px;
  margin-top: 20px;
}
</style>
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

## TypeScript Support

The component fully supports TypeScript and provides types for all props, emits, and methods. Types are available through import:

```typescript
import type { 
  IYandexSmartCaptchaProps,
  IYandexSmartCaptchaEmits,
  IYandexSmartCaptcha,
  TCaptchaEvents,
  TSupportedLanguages,
  TShieldPositions
} from '@gladesinger/vue3-yandex-smartcaptcha/types';
```

### Available Types:

- `IYandexSmartCaptchaProps` - types for component props
- `IYandexSmartCaptchaEmits` - types for component emits
- `IYandexSmartCaptcha` - types for component methods and properties
- `TCaptchaEvents` - types for captcha events
- `TSupportedLanguages` - supported languages
- `TShieldPositions` - possible shield positions

## Props

Here is a list of available props for the `YandexSmartCaptcha` component:

| Prop              | Type     | Default Value          | Description                                                                                  |
|-------------------|----------|------------------------|----------------------------------------------------------------------------------------------|
| `siteKey`         | `String`  | -                      | Client-side key.                                                                            |
| `language`        | `TSupportedLanguages`  | `'ru'`                 | Widget language. Possible values: `'ru'`, `'en'`, `'be'`, `'kk'`, `'tt'`, `'uk'`, `'uz'`, `'tr'`. |
| `test`            | `Boolean` | `false`                | Enables captcha testing mode. The user will always receive a challenge. Use only for debugging and testing. |
| `webview`         | `Boolean` | `false`                | Runs the captcha in WebView to improve accuracy in mobile applications using WebView.        |
| `invisible`       | `Boolean` | `false`                | Invisible captcha.                                                                          |
| `shieldPosition`  | `TShieldPositions`  | `'bottom-right'`       | Position of the data processing notification block.                                        |
| `hideShield`      | `Boolean` | `false`                | Hides the data processing notification block.                                               |
| `loadWidget`      | `Boolean` | `true`                 | Load the widget when the component is mounted.                                               |
| `defer`           | `Boolean` | `true`                 | Load script with defer attribute.                                                           |
| `async`           | `Boolean` | `true`                 | Load script with async attribute.                                                           |

## Events

The `YandexSmartCaptcha` component supports the following events:

| Event               | Description                                                    | Argument                 |
|---------------------|----------------------------------------------------------------|--------------------------|
| `callback`          | Callback function, returns the token on success                | `token: string`          |
| `onChallengeVisible`| Challenge window becomes visible                               | `() => void`             |
| `onChallengeHidden` | Challenge window becomes hidden                                | `() => void`             |
| `onNetworkError`    | Network error occurred                                         | `error: { message: string }` |
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
| `subscribe`  | Subscribes handlers to specific widget events. For example, to track the opening and closing of the challenge window. | `eventName: TCaptchaEvents, callbackFun: Function` |

The component also exposes the `widgetId` state, if you need it for your case.

## Usage Examples

### Regular Captcha

#### JavaScript
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

#### TypeScript
```vue
<script setup lang="ts">
import { YandexSmartCaptcha } from '@gladesinger/vue3-yandex-smartcaptcha'
import type { IYandexSmartCaptcha } from '@gladesinger/vue3-yandex-smartcaptcha/types'

const success = (token: string) => {
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

#### JavaScript
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
      :invisible="true"
      shieldPosition="top-left"
      @onSuccess="success"
      @onTokenExpired="expired"
    />
    <button @click="fireCaptcha">Тест</button>
  </div>
</template>
```

#### TypeScript
```vue
<script setup lang="ts">
import { YandexSmartCaptcha } from '@gladesinger/vue3-yandex-smartcaptcha'
import type { IYandexSmartCaptcha } from '@gladesinger/vue3-yandex-smartcaptcha/types'
import { ref } from 'vue'

const yaCaptcha = ref<IYandexSmartCaptcha | null>(null)

const success = (token: string) => {
  console.log(token)
}

const expired = () => {
  console.log('expired')
}

const fireCaptcha = () => {
  yaCaptcha.value?.execute()
}
</script>

<template>
  <div>
    <YandexSmartCaptcha 
      ref="yaCaptcha"
      siteKey="your_site_key"
      :invisible="true"
      shieldPosition="top-left"
      @onSuccess="success"
      @onTokenExpired="expired"
    />
    <button @click="fireCaptcha">Тест</button>
  </div>
</template>
```

### Full Example with All Features

#### JavaScript
```vue
<script setup>
import { YandexSmartCaptcha } from '@gladesinger/vue3-yandex-smartcaptcha'
import { ref } from 'vue'

const token = ref(null)
const message = ref('')
const yaCaptcha = ref(null)

const callback = (tokenValue) => {
  token.value = tokenValue
}

const success = (tokenValue) => {
  token.value = tokenValue
}

const expired = () => {
  message.value = 'Token expired'
}

const challengeVisible = () => {
  message.value = 'Challenge is visible'
}

const challengeHidden = () => {
  message.value = 'Challenge hidden'
}

const captureError = () => {
  message.value = 'Error encountered'
}

const fireCaptcha = () => {
  yaCaptcha.value.execute()
}

const resetCaptcha = () => {
  yaCaptcha.value.reset()
  token.value = ''
}

const destroyCaptcha = () => {
  yaCaptcha.value.destroy()
}

const getResponse = () => {
  const response = yaCaptcha.value.getResponse()
  message.value = `The last token is ${response}`
}

const subscribeEvents = () => {
  const events = [
    'challenge-hidden',
    'challenge-visible',
    'javascript-error',
    'network-error',
    'success',
    'token-expired'
  ]
  
  events.forEach(event => {
    yaCaptcha.value.subscribe(event, () => alert(`Event: ${event}`))
  })
}
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
    />
    <div>WidgetId: {{ yaCaptcha?.widgetId }}, ContainerId: {{ yaCaptcha?.containerId }}</div>
    <div>Current token: {{ token }}</div>
    <div v-if="message">{{ message }}</div>
    <div class="buttons">
      <button @click="fireCaptcha">Fire captcha</button>
      <button @click="resetCaptcha">Reset</button>
      <button @click="destroyCaptcha">Destroy</button>
      <button @click="getResponse">Get response</button>
      <button @click="subscribeEvents">Subscribe</button>
    </div>
  </div>
</template>

<style scoped>
.buttons {
  display: flex;
  gap: 10px;
  margin-top: 20px;
}
</style>
```

#### TypeScript
```vue
<script setup lang="ts">
import { YandexSmartCaptcha } from '@gladesinger/vue3-yandex-smartcaptcha'
import type { IYandexSmartCaptcha, TCaptchaEvents } from '@gladesinger/vue3-yandex-smartcaptcha/types'
import { ref } from 'vue'

const token = ref<string | null>(null)
const message = ref<string>('')
const yaCaptcha = ref<IYandexSmartCaptcha | null>(null)

const callback = (tokenValue: string) => {
  token.value = tokenValue
}

const success = (tokenValue: string) => {
  token.value = tokenValue
}

const expired = () => {
  message.value = 'Token expired'
}

const challengeVisible = () => {
  message.value = 'Challenge is visible'
}

const challengeHidden = () => {
  message.value = 'Challenge hidden'
}

const captureError = () => {
  message.value = 'Error encountered'
}

const fireCaptcha = () => {
  yaCaptcha.value?.execute()
}

const resetCaptcha = () => {
  yaCaptcha.value?.reset()
  token.value = ''
}

const destroyCaptcha = () => {
  yaCaptcha.value?.destroy()
}

const getResponse = () => {
  const response = yaCaptcha.value?.getResponse()
  message.value = `The last token is ${response}`
}

const subscribeEvents = () => {
  const events: TCaptchaEvents[] = [
    'challenge-hidden',
    'challenge-visible',
    'javascript-error',
    'network-error',
    'success',
    'token-expired'
  ]
  
  events.forEach(event => {
    yaCaptcha.value?.subscribe(event, () => alert(`Event: ${event}`))
  })
}
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
    />
    <div>WidgetId: {{ yaCaptcha?.widgetId }}, ContainerId: {{ yaCaptcha?.containerId }}</div>
    <div>Current token: {{ token }}</div>
    <div v-if="message">{{ message }}</div>
    <div class="buttons">
      <button @click="fireCaptcha">Fire captcha</button>
      <button @click="resetCaptcha">Reset</button>
      <button @click="destroyCaptcha">Destroy</button>
      <button @click="getResponse">Get response</button>
      <button @click="subscribeEvents">Subscribe</button>
    </div>
  </div>
</template>

<style scoped>
.buttons {
  display: flex;
  gap: 10px;
  margin-top: 20px;
}
</style>