# Проектная работа "Веб-ларёк"

Стек: HTML, SCSS, TS, Webpack

Структура проекта:
- src/ — исходные файлы проекта
- src/components/ — папка с JS компонентами
- src/components/base/ — папка с базовым кодом

Важные файлы:
- src/pages/index.html — HTML-файл главной страницы
- src/types/index.ts — файл с типами
- src/index.ts — точка входа приложения
- src/scss/styles.scss — корневой файл стилей
- src/utils/constants.ts — файл с константами
- src/utils/utils.ts — файл с утилитами

## Установка и запуск
Для установки и запуска проекта необходимо выполнить команды

```
npm install
npm run start
```

или

```
yarn
yarn start
```
## Сборка

```
npm run build
```

или

```
yarn build
```
## Данные и типы данных, используемых в приложении

Продукт

```
interface IProductItem {
  id: string;
  description: string;
  image: string;
  title: string;
  category: string;
  price: number | null;
}
```

Корзина

```
interface IBasket {
	items: Map<string, number>;
	total: number;
}
```

Метод оплаты

```
type PaymentMethod = 'cash' | 'card'
```

Заказ

```
interface IOrder {
	payment: PaymentMethod;
	email: string;
	phone: string;
	address: string;
	items: string[];
	total: number;
}
```

### Класс `Api`

Базовый класс для отправки и получения запросов.

Конструктор принимает такие аргументы:
1. `baseUrl: string` - базовый адрес сервера
2. `options: RequestInit = {}` - объект с заголовками запросов

Класс имеет такие методы:
- `handleResponse(response: Response): Promise<object>` - для обработки ответов сервера;
- `get(uri: string)`,  `post(uri: string, data: object, method: ApiPostMethods = 'POST')` - для отправки и получения запросов к серверу.

### Класс `EventEmitter`

Брокер событий. Реализует паттерн "Наблюдатель" и позволяет подписываться на события и уведомлять подписчиков о наступлении события.

Класс имеет такие методы:
- `on`, `off`, `emit` - для подписки на событие, отписки от события, уведомления подписчиков о наступлении события;
- `onAll`, `offAll` - для подписки на все события и сборс всех подписчиков;
- `trigger` - генерирует заданное событие с заданными аргументами, что позволяет передавать его в качестве обработчика события в другие классы.


## Описание данных

## Класс 

