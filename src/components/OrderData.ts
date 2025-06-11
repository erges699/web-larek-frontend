//import validate from "validate.js";
import { IProductItem, PaymentMethod, TOrder, TContactForm, IOrderData, TFormErrors } from '../types';
import { IEvents } from './base/events';
//import { constraintsContacts } from '../utils/constants';

export class OrderData implements IOrderData {
    protected _items: IProductItem[] = [];
    protected _total: number | null;
	protected _count: number;
	protected _order: TOrder;
	formErrors: TFormErrors;
    protected events: IEvents;

	constructor(events: IEvents) {
		this.events = events;
	}

    get items() {
      return this._items;
    }

    get total() {
      return this._total;
    }

    get count() {
      return this._count;
    }

    get order() {
      return this._order;
    }

    isInBasket(item: IProductItem) {
        return this._items.includes(item);
    }

	addToBasket(item: IProductItem) {
        this._items.push(item);
		this.events.emit('basket:added');
    }

	removeFromBasket(productId: string) {
		this._items = this._items.filter((item) => item.id !== productId);
		this.events.emit('basket:removed',);
    }

	clearBasket() {
		this._items = [];
		this.events.emit('basket:cleared');
    }

    countPrices() {
      this._total = this._items.reduce((sum, item) => sum + (item.price || 0), 0);
      this.events.emit('basket:changed');
    }

    countBasketAmount() {
      this._count = this._items.length;
    }

	setPayment(method: PaymentMethod) {
		this._order.payment = method;
	}

	setOrderField(field: keyof TOrder, value: string) {
		if (field === 'payment') {
			this.setPayment(value as PaymentMethod);
		} else {
			this._order[field] = value;
		}
	}

	clearOrder() {
		this._order = {
			email: '',
			phone: '',
			address: '',
			payment: 'card',
		};
	}

	createOrderToPost() {
		this.events.emit('order:submit', this._order);
    }

	checkFormFieldValidation() {
      const errors: typeof this.formErrors = {
        payment: "",
        address: "",
        email: "",
        phone: ""
      };

      if (!this._order.address) {
        errors.address = 'Некорректный адрес';
      }

      if (!this._order.email) {
        errors.email = 'Некорректный адрес эл.почты';
      }

      if (!this._order.phone) {
        errors.phone = 'Некорректный номер телефона';
      }

      this.formErrors = errors;
      this.events.emit('order:changed', this.formErrors);

      return Object.keys(errors).length === 0;
    }

}