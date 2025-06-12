import './scss/styles.scss';
import { ProductsData } from './components/ProductsData';
import { OrderData } from './components/OrderData';
import { EventEmitter, IEvents } from './components/base/events';
import { IApi } from './types';
import { Api } from './components/base/api';
import { API_URL, CDN_URL, settings } from './utils/constants';
import { AppAPI } from './components/AppApi';


const events = new EventEmitter();

const baseApi: IApi = new Api(API_URL, settings);
const api = new AppAPI(baseApi, CDN_URL);

const productsData = new ProductsData(events);
const orderData = new OrderData(events);

events.onAll((event) => {
    console.log(event.eventName, event.data)
})


//productsData.items = testProductsList.items
//console.log(productsData.items);
//console.log(productsData.getProduct("854cef69-976d-4c2a"))
//console.log(orderData.addToBasket(testProductItem02))

//console.log(orderData.countBasketAmount)
//console.log(orderData.countPrices)
//console.log(orderData.removeFromBasket("854cef69-976d-4c2a-a18c-2aa45046c390"))
//console.log(orderData._total)

Promise.all([api.getProductList()])
    .then(([productList]) => {
        productsData.items = productList;
        //console.log(productsData.items);
        //console.log(productsData.getProduct("854cef69-976d-4c2a-a18c-2aa45046c390"));
        events.emit('initialData:loaded');
    })
    .catch((err) => {
		console.error(err);
	});

    //, api.getProduct("1c521d84-c48d-48fa-8cfb-9d911fa515fd")
    //, productItem
//        console.log(productItem);

//console.log(orderData.addToBasket("854cef69-976d-4c2a-a18c-2aa45046c390"))
//console.log(productsData.items);