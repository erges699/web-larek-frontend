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


const successTemplate: HTMLTemplateElement = 
	document.querySelector('#success');
const contactsTemplate : HTMLTemplateElement = 
	document.querySelector('#contacts');
const orderTemplate: HTMLTemplateElement = 
	document.querySelector('#order');
const basketTemplate: HTMLTemplateElement = 
	document.querySelector('#basket');
const cardTemplate: HTMLTemplateElement = 
    document.querySelector('#card-catalog');
const productTemplate: HTMLTemplateElement = 
    document.querySelector('#card-preview');
const modalTemplate: HTMLTemplateElement = 
    document.querySelector('#modal-container');

const events = new EventEmitter();

const baseApi: IApi = new Api(API_URL, settings);
const api = new AppAPI(baseApi, CDN_URL);

const productsData = new ProductsData(events);
const orderData = new OrderData(events);
const modal = new Modal(modalTemplate, events);
const basket = new Basket(cloneTemplate(basketTemplate), events);
const cardsCatalog = new CardsCatalog(document.body, events);


events.onAll((event) => {
    console.log(event.eventName, event.data)
})

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
		
		//const card = new Card(cloneTemplate(cardTemplate), {
		//	onClick: () => events.emit('card:select', item)
		//});
		return cardInstant.render(card);
	});
	cardsCatalog.render({ catalog: cardsArray });
});

// вывод выбранной карточки в модальном окне
events.on('card:select', (item: IProductItem) => {
	const cardPreview = new Card(cloneTemplate(productTemplate), events);
	modal.render({
		content: cardPreview.render({
			price: item.price,
			category: item.category,
			title: item.title,
			image: item.image,
			description: item.description,
		}),
	});
	modal.open();
});

//Открытие корзины
events.on('basket:open', () => {
	modal.render({
		content: createElement<HTMLElement>('div', {}, [basket.render()]),
	});
	modal.open();
});