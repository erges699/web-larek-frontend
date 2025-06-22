# Проектная работа «Веб-ларёк»

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

```typescript
interface IProductItem {
	id: string;
	description: string;
	image: string;
	title: string;
	category: string;
	price: number | null;
	busketIndex: number;
	inBusket: boolean;
}
```

Метод оплаты

```typescript
type PaymentMethod = 'cash' | 'card'
```

Заказ

```typescript
interface IOrder {
	payment: string;
	email: string;
	phone: string;
	address: string;
	total: number;
	items: string[];
	id?: string;
}
```

Результат покупки

```typescript
export interface IOrderResult {
	id?: string;
	total: number;
}
```

Список товаров на главной странице

```typescript
interface IProductsData {
	items: 	IProductItem[];
	preview: string | null;
	getProduct(productId: string): IProductItem;
}
```

Корзина и заказ

```typescript
interface IOrderData {
	items: 	IProductItem[];
	total: number | null;
	order: TOrder;
	isInBasket(itemId: string): boolean;
	addToBasket(item: IProductItem): void;
	removeFromBasket(productId: string): void;
	clearBasket(): void;
	countPrices(): number; 
	countBasketAmount(): number;
	setOrderField(field: keyof TOrder, value: string): void;
	clearOrder(): void;
	orderContactsValidation(): boolean;
	orderFormValidation(): boolean;
}
```

Заказ

```typescript
export type TOrder = Omit<IOrder, 'id' | 'items' | 'total'>;
```

Форма выбора способа оплаты и ввода адреса доставки

```typescript
type TPaymentForm = Pick<IOrder, 'payment' | 'address'>;
```

Форма ввода адреса эл.почты и номера телефона

```typescript
type TContactForm = Pick<IOrder, 'email' | 'phone'>;
```

Данные для заказа в корзине

```typescript
export type TForm = Pick<IOrder, 'email' | 'phone' | 'payment' | 'address'>;
```

```typescript
type ApiPostMethods = 'POST' | 'PUT' | 'DELETE';
```


```typescript
interface IApi {
    baseUrl: string;
    get<T>(uri: string): Promise<T>;
    post<T>(uri: string, data: object, method?: ApiPostMethods): Promise<T>;
}
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
1. `baseUrl: string` — базовый адрес сервера
2. `options: RequestInit = {}` — объект с заголовками запросов

Класс имеет такие методы:
- `handleResponse(response: Response): Promise<object>`— для обработки ответов сервера;
- `get(uri: string)`,  `post(uri: string, data: object, method: ApiPostMethods = 'POST')` — для отправки и получения запросов к серверу.

#### Класс `EventEmitter`

Брокер событий. Реализует паттерн «Наблюдатель» и позволяет подписываться на события и уведомлять подписчиков о наступлении события.

Класс имеет такие методы:
- `on`, `off`, `emit` - для подписки на событие, отписки от события, уведомления подписчиков о наступлении события;
- `onAll`, `offAll` - для подписки на все события и сборс всех подписчиков;
- `trigger` - генерирует заданное событие с заданными аргументами, что позволяет передавать его в качестве обработчика события в другие классы.

### Слой данных

#### Класс `ProductsData`
Класс отвечает за хранение и логику работы с данными товаров.\
Конструктор класса принимает инстант брокера событий.\
В полях класса хранятся следующие данные:
- `items: IProductItem[]` — массив объектов товаров;

Класс предоставляет набор методов для взаимодействия с этими данными:

- `getProduct(productId: string): IProductItem` — возвращает id товара;


#### Класс `OrderData`
Класс отвечает за хранение и логику работы с данными корзины и заказа.\
Конструктор класса принимает инстант брокера событий.\
В полях класса хранятся следующие данные:
- `basket: IBasket` — корзина;
- `order: TOrder` — платежная и контактная часть заказа (без id, items, total);

Класс предоставляет набор методов для взаимодействия с этими данными:

- `isInBasket(itemId: string): boolean` — для проверки есть ли товар в корзине;
- `addToBasket(item: IProductItem): void` — добавляет товар в корзину;
- `removeFromBasket(productId: string): void` — удаляет товар из корзины;
- `clearBasket(): void` — очищает корзину;
- `countPrices(): number`; 
- `countBasketAmount(): number`;
- `setOrderField(field: keyof TOrder, value: string): void`— устанавливает поле формы;
- `clearOrder(): void` — очищает заказ;
- `orderContactsValidation(): boolean`— проверяет данные поля формы контактов после ввода на валидность;
- `orderFormValidation(): boolean`— проверяет данные поля формы заказа после ввода на валидность;

### Слой представления
Все классы представления отвечают за отображение внутри контейнера (DOM-элемент) передаваемых в них данных.

#### Класс `Card`
Отвечает за отображение карточки, задавая в карточке данные названия, изображения, описания, цены. Класс используется для отображения карточек на странице сайта. В конструктор класса передается DOM элемент темплейта, что позволяет при необходимости формировать карточки разных вариантов верстки. В классе устанавливаются слушатели на все интерактивные элементы, в результате взаимодействия с которыми пользователя генерируются соответствующие события.\
Поля класса содержат элементы разметки элементов карточки. Конструктор, кроме темплейта принимает экземпляр `EventEmitter` для инициации событий.\
Общий класс, от него наследуются классы:
- CardCatalog
- CardPreview
- CardBasket

Методы:
- геттер `id` возвращает уникальный id карточки;
- сеттеры `id`, `title(value: string)`, `price(value: number | null)`, `category(value: string)`, `image(value: string)`, `inBasket(value: boolean)` —
устанавливают id карточки, заголовок, цену, категорию, изображение, наличие карточки в корзине.

#### Класс `CardCatalog`
Отвечает за отображение списка карточек.
В классе устанавливается слушатель на открытие предпросмотра выбранной карточки.\

#### Класс `CardPreview`
Отвечает за отображение выбранной карточки.
В классе устанавливается слушатель на добавление карточки в корзину.\
Методы:
- сеттеры `description(value: string)`, `price(value: number | null)`, `cardToBusketButtonText(value: string)`, `cardToBusketButtonDisable(value: boolean)`
устанавливают описание карточки, цену (блокируется кнопка добавления в корзину бесценного товара), текст кнопки, блокировку кнопки при наличии товара в корзине.

#### Класс `CardBasket`
Отвечает за отображение корзины.
В классе устанавливается слушатель на удаление карточки из корзины.\
Методы:
- сеттер `busketIndex(value: number)` устанавливает индекс товара в корзине.

#### Класс `CardsCatalog`
Отвечает за отображение блока с карточками на главной странице. Предоставляет сеттеры: 
- `catalog` — для полного обновления содержимого;
- `basketCounter(count: number)` — счетчик корзины;
- `scrollLock(value: boolean)` — блокировка скроллинга при открытом модальном окне.
В конструктор принимает контейнер, в котором размещаются карточки.


#### Класс `Modal`
Реализует модальное окно. Так же предоставляет методы `open` и `close` для управления отображением модального окна. Устанавливает слушатели на клавиатуру, для закрытия модального окна по Esc, на клик в оверлей и кнопку-крестик для закрытия попапа.  
- `constructor(selector: string, events: IEvents)` — Конструктор принимает селектор, по которому в разметке страницы будет идентифицировано модальное окно и экземпляр класса `EventEmitter` для возможности инициации событий.
Конструктор класса принимает инстант брокера событий\

Поля класса
- `modal: HTMLElement` — элемент модального окна
- `events: IEvents` — брокер событий

#### Класс `Success`

Компонент для отображения окна с уведомлением об успешном оформлении заказа.\
Конструктор класса принимает инстант брокера событий, контейнер для содержимого\

Поля класса

- events: IEvents - брокер событий
- successTitle: HTMLElement — элемент для отображения заголовка;
- successDescription: HTMLElement — элемент для отображения суммы списанных средств;
- successButton: HTMLButtonElement — кнопка возврата на главный экран

Методы класса 

- сеттер `total(value: number)` — отображение сообщения о сумме списанных средств


#### Класс `Basket`

Компонент для отображения корзины товаров.\
Конструктор класса принимает инстант брокера событий\

Поля класса 
- `events: IEvents` — брокер событий 
- `items: HTMLElement` — контейнер для списка товаров
- `busketPrice: HTMLElement` — элемент с общей стоимостью
- `busketButton: HTMLButtonElement` — кнопка оформления заказа

Методы класса 
Сеттеры
- `items(items: HTMLElement[])` - отображение корзины
- `total(total: number)` - обновление суммы заказа

#### Класс `FormOrder`

Компонент для формы выбора способа оплаты и ввода адреса доставки.\
Конструктор класса принимает инстант брокера событий.\

Поля класса 
- `events: IEvents` — брокер событий 
- `cashButton: HTMLButtonElement` — кнопка выбора оплаты "Онлайн"
- `cardButton: HTMLButtonElement` — кнопка выбора оплаты "При получении"
- `addressInput: HTMLInputElement` — поле для ввода адреса

Методы класса 

- `payment(method: PaymentMethod)` — установка способа оплаты
- `address(value: string)` — установка адреса доставки

#### Класс `FormContacts`

Компонент для формы ввода контактных данных.\
Конструктор класса принимает инстант брокера событий.\

Поля класса 
- `events: IEvents` — брокер событий 
- `emailInput: HTMLInputElement` — поле для email
- `phoneInput: HTMLInputElement` — поле для телефона

Методы класса 
- `email(value: string)` — установка email
- `phone(value: string)` — установка телефона

### Слой коммуникации

#### Класс `AppApi`
Принимает в конструктор экземпляр класса Api и предоставляет методы реализующие взаимодействие с бэкендом сервиса.

- `getProductList(): Promise<IProductItem[]>` — получает с сервера все карточки
- `getProduct(productId: string): Promise<IProductItem` - получает данные одной карточки
- `createOrder(order: IOrder): Promise<IOrderResult>` — отправляет на сервер данные заказа и получает потдверждение этого заказа

### События, возникающие при взаимодействии пользователя с интерфейсом (генерируются классами, отвечающими за представление)
- `contactsForm:submit` — изменение формы (кнопка «Оплатить»)
- `orderForm:submit` — изменение формы (кнопка «Далее»)
- `order:open` — изменение корзины (кнопка «Оформить»)
- `orderFormErrors:change` — изменилось состояние валидации формы
- `contactsFormErrors:change` — изменилось состояние валидации формы
- `modal: open`, `modal: close` — локировать/разблокировать скролл экрана
- `busket:deleteCard` — удалить из корзины (в корзине)
- `busket:addCard` — добавить в корзину (предпросмотр карточки)
- `basket:changed` — изменения в корзине
- `basket:open` — открытие корзины
- `card:preview` — вывод выбранной карточки в модальном окне
- `initialData:loaded` — вывод карточек на главном экране
