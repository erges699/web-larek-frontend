import './scss/styles.scss';
import { ProductsData } from './components/ProductsData';
import { OrderData } from './components/OrderData';
import { EventEmitter, IEvents } from './components/base/events';
import { IApi, IProductItem } from './types';
import { Api } from './components/base/api';
import { API_URL, CDN_URL, settings } from './utils/constants';
import { testOrder01, testProductItem01, testProductsList } from './utils/constantsTest';
import { AppAPI } from './components/AppApi';
import { Card } from './components/View/Card';
import { Modal } from './components/View/Modal';
import { CardsCatalog } from './components/View/CardsCatalog';
import { cloneTemplate, createElement } from './utils/utils';
import { Basket } from './components/View/Basket';


const successTemplate: HTMLTemplateElement = document.querySelector('#success');
const cardTemplate: HTMLTemplateElement = document.querySelector('#card-catalog');
const productTemplate: HTMLTemplateElement = document.querySelector('#card-preview');
const cardBasketTemplate: HTMLTemplateElement = document.querySelector('#card-basket');
const BasketTemplate: HTMLTemplateElement = document.querySelector('#basket');
const contactsTemplate : HTMLTemplateElement = document.querySelector('#contacts');
const orderTemplate: HTMLTemplateElement = document.querySelector('#order');

const modalTemplate: HTMLTemplateElement = document.querySelector('#modal-container');

const events = new EventEmitter();

const baseApi: IApi = new Api(API_URL, settings);
const api = new AppAPI(baseApi, CDN_URL);

const productsData = new ProductsData(events);
const orderData = new OrderData(events);
const modal = new Modal(modalTemplate, events);
const basket = new Basket(cloneTemplate(BasketTemplate), events);
const cardsCatalog = new CardsCatalog(document.body, events);


events.onAll((event) => {
    console.log(event.eventName, event.data)
})

function getItemCard(data: { card: IProductItem }) {
	const { card } = data;
	const itemCard = productsData.getProduct(card.id);
	itemCard.inBusket = orderData.isInBasket(itemCard.id);
	return itemCard;
}

function basketPreview() {
	const cardsArray = orderData.items.map((item, index) => {
		const cardInstant = new Card(cloneTemplate(cardBasketTemplate), events);
		return cardInstant.render({
			id: item.id,
			title: item.title, 
			price: item.price,
			busketIndex: index + 1,
		});
	});	
	modal.render({
		content: basket.render({items: cardsArray, total: orderData.countPrices()}),
	});		
}

function cardPreview(data: { card: IProductItem }) {
	const cardPreview = new Card(cloneTemplate(productTemplate), events);
	const item = getItemCard(data);
	console.log(item.inBusket);
	modal.render({
		content: cardPreview.render(item),
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

	
//вывод карточек на главном экране
events.on('initialData:loaded', () => {
	cardsCatalog.basketCounter = orderData.items.length;
	const cardsArray = productsData.items.map((card) => {
		const cardInstant = new Card(cloneTemplate(cardTemplate), events);
		return cardInstant.render({
			id: card.id,
			category: card.category,
			title: card.title,
			image: card.image,
			price: card.price,
		});
	});
	cardsCatalog.render({ catalog: cardsArray });
});

// вывод выбранной карточки в модальном окне
events.on('card:preview', (data: { card: IProductItem }) => {
	cardPreview(data);
	//const { card } = data;
	//const item = productsData.getProduct(card.id);
	//cardPreview(item);
	//item.isInBusket = orderData.isInBasket(item.id);
	//const cardPreview = new Card(cloneTemplate(productTemplate), events);
	//modal.render({
	//	content: cardPreview.render(item),
	//});
	modal.open();
});

//Изменение корзины
events.on('basket:added', () => {
	//basketPreview();
})

//Открытие корзины
events.on('basket:open', () => {
	basketPreview();
	modal.open();
});

//Добавить в корзину (предпросмотр карточки)
events.on('busket:add', (data: { card: IProductItem }) => {
	orderData.addToBasket(getItemCard(data));
	cardsCatalog.basketCounter = orderData.countBasketAmount();
	cardPreview(data);
});

//Удалить из корзины (в корзине)
events.on('busket:delete', (data: { card: IProductItem }) => {
	const { card } = data;
	orderData.removeFromBasket(card.id);
	cardsCatalog.basketCounter = orderData.countBasketAmount();
	basketPreview();
	//modal.close();
});

//  Блокировать/разблокировать скролл экрана
events.on('modal: cardsCatalog.scrollLock', ({ lock }: { lock: boolean }) => {
	cardsCatalog.scrollLock = lock;
});