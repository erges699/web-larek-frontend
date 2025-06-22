import './scss/styles.scss';
import { ProductsData } from './components/ProductsData';
import { OrderData } from './components/OrderData';
import { EventEmitter, IEvents } from './components/base/events';
import { IApi, IOrder, IProductItem, TContactForm, TPaymentForm } from './types';
import { Api } from './components/base/api';
import { API_URL, CDN_URL, settings } from './utils/constants';
import { AppAPI } from './components/AppApi';
import { CardBasket, CardCatalog, CardPreview } from './components/View/Card';
import { Modal } from './components/View/Modal';
import { CardsCatalog } from './components/View/CardsCatalog';
import { cloneTemplate } from './utils/utils';
import { Basket } from './components/View/Basket';
import { FormOrder } from './components/View/FormOrder';
import { FormContacts } from './components/View/FormContacts';
import { Success } from './components/View/Success';


const events = new EventEmitter();
const baseApi: IApi = new Api(API_URL, settings);
const api = new AppAPI(baseApi, CDN_URL);

events.onAll((event) => {
    console.log(event.eventName, event.data)
})

//Шаблоны
const successTemplate: HTMLTemplateElement = document.querySelector('#success');
const catalogTemplate: HTMLTemplateElement = document.querySelector('#card-catalog');
const productTemplate: HTMLTemplateElement = document.querySelector('#card-preview');
const cardBasketTemplate: HTMLTemplateElement = document.querySelector('#card-basket');
const BasketTemplate: HTMLTemplateElement = document.querySelector('#basket');
const contactsTemplate : HTMLTemplateElement = document.querySelector('#contacts');
const orderTemplate: HTMLTemplateElement = document.querySelector('#order');
const modalTemplate: HTMLTemplateElement = document.querySelector('#modal-container');

//Глобальные контейнеры
const cardsCatalog = new CardsCatalog(document.body, events);
const modal = new Modal(modalTemplate, events);

//Модели данных приложения
const productsData = new ProductsData(events);
const orderData = new OrderData(events);

//Переиспользуемые части интерфейса
const basket = new Basket(cloneTemplate(BasketTemplate), events);
const order = new FormOrder(cloneTemplate(orderTemplate), events);
const contacts = new FormContacts(cloneTemplate(contactsTemplate), events);
const success = new Success(cloneTemplate(successTemplate), events);

//Функции
function getItemCard(data: { card: IProductItem }) {
	const { card } = data;
	const itemCard = productsData.getProduct(card.id);
	itemCard.inBusket = orderData.isInBasket(itemCard.id);
	return itemCard;
}

function cardPreview(data: { card: IProductItem }) {
	const card = getItemCard(data);
	const cardForPreview = new CardPreview(cloneTemplate(productTemplate), events);

	cardForPreview.cardToBusketButtonText = (card.inBusket ? 'Уже в корзине' : 'В корзину');
	cardForPreview.cardToBusketButtonDisable = (card.inBusket ? true : false);

	modal.render({
		content: cardForPreview.render(card),
	});	
}

Promise.all([api.getProductList()])
    .then(([productList]) => {
        productsData.items = productList;
		//console.log(productsData.items);
        events.emit('initialData:loaded');
    })
    .catch((err) => {
		console.error(err);
	});

	
//Вывод карточек на главном экране
events.on('initialData:loaded', () => {
	cardsCatalog.basketCounter = orderData.items.length;
	const cardsArray = productsData.items.map((card) => {
		const cardInstant = new CardCatalog(cloneTemplate(catalogTemplate), events);
		return cardInstant.render(card);
	});
	cardsCatalog.render({ catalog: cardsArray });
});

//Вывод выбранной карточки в модальном окне
events.on('card:preview', (data: { card: IProductItem }) => {
	cardPreview(data);
	modal.open();
});

//Открытие корзины
events.on('basket:open', () => {
	modal.render({
		content: basket.render(),
	});
	modal.open();
});

//Изменения в корзине
events.on('basket:changed', () => {
	cardsCatalog.basketCounter = orderData.countBasketAmount();
	const cardsArray = orderData.items.map((item, index) => {
		const cardInstant = new CardBasket(cloneTemplate(cardBasketTemplate), events);
		return cardInstant.render({
			id: item.id,
			title: item.title, 
			price: item.price,
			busketIndex: index + 1,
		});
	});	
	basket.render({items: cardsArray, total: orderData.countPrices()});	
});

//Добавить в корзину (предпросмотр карточки)
events.on('busket:addCard', (data: { card: IProductItem }) => {
	orderData.addToBasket(getItemCard(data));
	cardsCatalog.basketCounter = orderData.countBasketAmount();
	modal.close();
});

//Удалить из корзины (в корзине)
events.on('busket:deleteCard', (data: { card: IProductItem }) => {
	const { card } = data;
	orderData.removeFromBasket(card.id);
	cardsCatalog.basketCounter = orderData.countBasketAmount();
});

//  Блокировать/разблокировать скролл экрана
events.on('modal: open', () => {
	cardsCatalog.scrollLock = true;
});

//  Блокировать/разблокировать скролл экрана
events.on('modal: close', () => {
	cardsCatalog.scrollLock = false;
});

// Изменилось состояние валидации формы
events.on('contactsFormErrors:change', (errors: Partial<TContactForm>) => {
    const { email, phone } = errors;
	console.log(email, phone);
	contacts.valid = !email && !phone;
	contacts.errors = Object.values({email, phone}).filter(i => !!i).join('; ');
});

// Изменилось состояние валидации формы
events.on('orderFormErrors:change', (errors: Partial<TPaymentForm>) => {
    const { payment, address } = errors;
	console.log(payment, address);
	order.valid = !payment && !address;
	order.errors = Object.values({payment, address}).filter(i => !!i).join('; ');
});


// Изменилось одно из полей contactsForm
events.on(/^contactsForm\..*:change/, (data: { field: keyof TContactForm, value: string }) => {
    orderData.setOrderField(data.field, data.value);
	orderData.orderContactsValidation();
});

// Изменилось одно из полей orderForm
events.on(/^orderForm\..*:change/, (data: { field: keyof TPaymentForm, value: string }) => {
    orderData.setOrderField(data.field, data.value);
	orderData.orderFormValidation();
});

//Изменение корзины (кнопка «Оформить»)
events.on('order:open', () => {
	modal.render({
		content: order.render({
			payment: '',
			address: '',
            valid: false,
            errors: []
        })
	});
	orderData.orderFormValidation();
});

//Изменение формы (кнопка «Далее»)
events.on('orderForm:submit', () => {
	modal.render({
		content: contacts.render({
			email: '',
			phone: '',
            valid: false,
            errors: []
        })
	});
	orderData.orderContactsValidation();
});

//Изменение формы (кнопка «Оплатить»)
events.on('contactsForm:submit', () => {
	const orderArray: IOrder = {
		payment: orderData.order.payment,
		email: orderData.order.email,
		phone: orderData.order.phone,
		address: orderData.order.address,
		total: orderData.total,
		items: orderData.items.map(item => item.id),
	};
	//console.log(orderArray);
	api.createOrder(orderArray)
	.then((result) => {
		console.log(result);
		success.total = result.total;
		modal.render({
			content: success.render({})
		});
		modal.open();
	})
	.catch((err) => {
		console.error('Ошибка при отправке заказа:', err);
	});
});

events.on('success: submit', () => {
	orderData.clearOrder();
	orderData.clearBasket();
	orderData.count
	modal.close();
	cardsCatalog.basketCounter = orderData.countBasketAmount();
});
