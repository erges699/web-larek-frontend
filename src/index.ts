import './scss/styles.scss';
import { ProductsData } from './components/ProductsData';
import { OrderData } from './components/OrderData';
import { EventEmitter, IEvents } from './components/base/events';
import { IApi } from './types';
import { Api } from './components/base/api';
import { API_URL, CDN_URL, settings } from './utils/constants';
import { testOrder01, testProductItem01, testProductsList } from './utils/constantsTest';
import { AppAPI } from './components/AppApi';


const events = new EventEmitter();

const baseApi: IApi = new Api(API_URL, settings);
const api = new AppAPI(baseApi, CDN_URL);

const productsData = new ProductsData(events);
const orderData = new OrderData(events);

events.onAll((event) => {
    console.log(event.eventName, event.data)
})


Promise.all([api.getProductList()])
    .then(([productList]) => {
        productsData.items = productList;

        events.emit('initialData:loaded');
    })
    .catch((err) => {
		console.error(err);
	});
