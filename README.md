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
## Данные и типы данных, используемые в приложении

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
	items: string[];
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
	total: number;
	items: string[];
	id: string;
}
```

Список товаров на главной странице

```
interface IProductData {
	total: number;
	items: 	IProductItem[];
	preview: IProductItem | null;
	getProduct(productId: string): IProductItem;
	setProductList(items: IProductItem[]): void;
	setPreview(item: IProductItem): void;
}
```

Корзина и заказ

```
interface IOrderData {
	basket: IBasket;
	order: TOrder;
	isInBasket(item: IProductItem): IProductItem;
	addToBasket(item: IProductItem): void;
	removeFromBasket(item: IProductItem): void;
	clearBasket(): void;
	setOrderPayment(method: PaymentMethod): void;
	clearOrder(): void;
	checkPaymentValidation(data: Record<keyof TPaymentForm, string>): boolean;
	checkContactValidation(data: Record<keyof TContactForm, string>): boolean;
}
```

Заказ

```
export type TOrder = Omit<IOrder, 'id' | 'items' | 'total'>;
```

Результат покупки

```
type TOrderResult = Pick<IOrder, 'id' | 'total'>;
```

Форма выбора способа оплаты и ввода адреса доставки

```
type TPaymentForm = Pick<IOrder, 'payment' | 'address'>;
```

Форма ввода адреса эл.почты и номера телефона

```
type TContactForm = Pick<IOrder, 'email' | 'phone'>;
```

## Архитектура приложения

Код приложения разделён на слои согласно парадигме MVP:
- слой данных: отвечает за хранение и изменения данных;
- слой представления: отвечает за отображение данных на странице;
- презентер: отвечает за связь данных и представления.

### Базовый код

#### Класс `Api`

Базовый класс для отправки и получения запросов.

Конструктор принимает такие аргументы:
1. `baseUrl: string` - базовый адрес сервера
2. `options: RequestInit = {}` - объект с заголовками запросов

Класс имеет такие методы:
- `handleResponse(response: Response): Promise<object>` - для обработки ответов сервера;
- `get(uri: string)`,  `post(uri: string, data: object, method: ApiPostMethods = 'POST')` - для отправки и получения запросов к серверу.

#### Класс `EventEmitter`

Брокер событий. Реализует паттерн "Наблюдатель" и позволяет подписываться на события и уведомлять подписчиков о наступлении события.

Класс имеет такие методы:
- `on`, `off`, `emit` - для подписки на событие, отписки от события, уведомления подписчиков о наступлении события;
- `onAll`, `offAll` - для подписки на все события и сборс всех подписчиков;
- `trigger` - генерирует заданное событие с заданными аргументами, что позволяет передавать его в качестве обработчика события в другие классы.

### Описание данных

#### Класс ProductsData
Класс отвечает за хранение и логику работы с данными товаров.\
Конструктор класса принимает инстант брокера событий.\
В полях класса хранятся следующие данные:
- `total: number` - общее количество товаров (передаётся сервером);
- `items: IProductItem[]` - массив объектов товаров;
- `preview: IProductItem | null` - id товара, выбранного для просмотра в модальном окне;

Класс предоставляет набор методов для взаимодействия с этими данными:

- `getProduct(productId: string): IProductItem` - возвращает id товара;
- `setProductList(items: IProductItem[]): void` - устанавливает список товаров;
- `setPreview(item: IProductItem): void` - устанавливает id товара для просмотра в модальном окне;


#### Класс OrderData
Класс отвечает за хранение и логику работы с данными корзины и заказа.\
Конструктор класса принимает инстант брокера событий.\
В полях класса хранятся следующие данные:
- `basket: IBasket` - корзина;
- `order: TOrder` - заказ;

Класс предоставляет набор методов для взаимодействия с этими данными:

- `getIsInBasket(item: IProductItem): IProductItem` - возвращает id товара из корзины;
- `addToBasket(item: IProductItem): void` - добавляет товар в корзину;
- `removeFromBasket(item: IProductItem): void` - удаляет товар из корзины;
- `clearBasket(): void` - очищает корзину;
- `setOrderPayment(method: PaymentMethod): void` - устанавливает метод оплаты;
- `clearOrder(): void` - очищает заказ;
- `checkPaymentValidation(data: Record<keyof TPaymentForm, string>): boolean` - проверяет данные оплаты (метод оплаты и адрес) на валидность;
- `checkContactValidation(data: Record<keyof TContactForm, string>): boolean` - проверяет на валидность данные контактов;


