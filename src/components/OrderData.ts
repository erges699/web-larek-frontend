import validate from "validate.js";
import { IProductItem, IBasket, PaymentMethod, IOrder, TOrder, TContactForm } from '../types';
import { IEvents } from './base/events';
import { constraintsContacts } from '../utils/constants';

export class OrderData {
    protected i_tems: IProductItem[];
    basket: IBasket = {
		items: [],
		total: 0,
	};
	order: TOrder = {
		email: '',
		phone: '',
		address: '',
		payment: 'card',
	};
    protected events: IEvents;

	constructor(events: IEvents) {
		this.events = events;
	}

    isInBasket(item: IProductItem) {
        return this.basket.items.includes(item.id);
    }

	addToBasket(item: IProductItem) {
        this.basket.items.push(item.id);
		this.basket.total += item.price;
		this.events.emit('basket:changed');
    }

	removeFromBasket(item: IProductItem) {
		this.basket.items = this.basket.items.filter((id) => id !== item.id);
		this.basket.total -= item.price;
		this.events.emit('basket:changed',);
    }

	clearBasket() {
		this.basket.items = [];
		this.basket.total = 0;
		this.events.emit('basket:changed');
    }

	createOrderToPost() {

    }

	setPayment(method: PaymentMethod) {
		this.order.payment = method;
	}

	setOrderField(field: keyof TOrder, value: string) {
		if (field === 'payment') {
			this.setPayment(value as PaymentMethod);
		} else {
			this.order[field] = value;
		}
	}

	clearOrder() {
		this.order = {
			email: '',
			phone: '',
			address: '',
			payment: 'card',
		};
	}

	checkFormFieldValidation() {

    }

    checkValidation(data: Record<keyof TContactForm, string>) {
        const isValid = !Boolean(validate(data, constraintsContacts ));
        return isValid;
    }
} 